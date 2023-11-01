import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppColors, FileType, FontFamily } from '../../../constants'
import CommonDivider from '../../../components/divider/CommonDivider'
import { CommonRadioButton } from '../../../components'
import TextInputWithIcon from '../../../components/textInput/TextInputWithIcon'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { CreateServiceState, setFileType, setExternalFileUrl, uploadFile } from '../redux/createServiceSlice'
import { AddFile } from '../../../../assets/images'
import CommonButton from '../../../components/buttons/CommonButton'

const AddProductDetails = (): React.JSX.Element => {
    const createServiceR: CreateServiceState = useSelector((state: any) => state.createService)
    const dispatch = useDispatch<AppDispatch>();

    const onChangeFileType = (fileType: string) => {
        if (fileType != createServiceR.fileType) {
            dispatch(setFileType(fileType))
        }
    }

    const onChangeExternalFileUrl = (url: string) => {
        dispatch(setExternalFileUrl(url))
    }

    const onFileUploadButtonClick = () => {
        dispatch(uploadFile())
    }

    return (
        <View>
            <Text style={styles.title}>Upload File or External Hosted File</Text>
            <View style={{ height: 8 }}></View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => onChangeFileType(FileType.INTERNAL)}>
                    <View style={styles.buttonRow}>
                        <Text style={[styles.title, { fontSize: 14 }]}>Upload File</Text>
                        <CommonRadioButton selected={createServiceR.fileType == FileType.INTERNAL} />
                    </View>
                </TouchableOpacity>
                <CommonDivider />
                <TouchableOpacity onPress={() => onChangeFileType(FileType.EXTERNAL)}>
                    <View style={styles.buttonRow}>
                        <Text style={[styles.title, { fontSize: 14 }]}>External Hosted file</Text>
                        <CommonRadioButton selected={createServiceR.fileType == FileType.EXTERNAL} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ height: 24 }}></View>
            {
                createServiceR.fileType == FileType.INTERNAL
                    ? <View>
                        <View style={styles.uploadFileContainer}>
                            <View style={{ paddingHorizontal: 16, paddingVertical: 24, alignItems: 'center' }}>
                                <AddFile />
                                <View style={{ height: 16 }}></View>
                                <Text style={[styles.title, { fontSize: 18 }]}>Upload single file or a Zip file</Text>
                                <View style={{ height: 8 }}></View>
                                <Text style={styles.description}>Drag a file into the box or choose from your file picker. If you're selling multiple files please combine them into a .zip file.</Text>
                                <View style={{ height: 16 }}></View>
                                <View style={{ width: 110 }}>
                                    <CommonButton
                                        height={32}
                                        title='Choose File'
                                        onPress={() => { onFileUploadButtonClick() }}
                                    />
                                </View>
                            </View>
                            {
                                createServiceR.uploadFileLoading
                                    ? <View style={styles.uploadFileLoading}>
                                        <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                    </View>
                                    : null
                            }
                        </View>
                        {
                            (createServiceR.uploadFileUrl != '')
                                ? <View style={{ marginTop: 4, flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                    <Text style={styles.title}>Digital File : </Text>
                                    <Text
                                        style={[styles.title, { color: AppColors.GRAY3 }]}
                                        selectable={true}
                                        selectionColor={AppColors.GRAY5}>
                                        {createServiceR.uploadFileUrl}
                                    </Text>
                                </View>
                                : null
                        }
                        {
                            ((createServiceR.error.uploadFileUrlError.length ?? 0) != 0)
                                ? <View style={{ marginTop: 4 }}>
                                    <Text style={styles.error}>{createServiceR.error.uploadFileUrlError}</Text>
                                </View>
                                : null
                        }
                    </View>
                    : <View>
                        <Text style={styles.title}>External File Link</Text>
                        <View style={{ height: 8 }}></View>
                        <TextInputWithIcon
                            placeholder=''
                            errorText={createServiceR.error.externalFileUrlError}
                            value={createServiceR.externalFileUrl}
                            onChangeText={(url) => { onChangeExternalFileUrl(url) }}
                        />
                    </View>
            }
        </View>
    )
}

export default AddProductDetails

const styles = StyleSheet.create({
    title: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    description: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center'
    },
    container: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: AppColors.GRAY6,
    },
    buttonRow: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    uploadFileContainer: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: AppColors.GRAY6,
    },
    uploadFileLoading: {
        borderRadius: 4,
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: AppColors.GRAY7,
        width: '100%',
        opacity: 0.65,
        height: '100%',
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    }
})