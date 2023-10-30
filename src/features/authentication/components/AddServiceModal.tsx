import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { AddServicesState, showAddServiceModal } from '../redux/addServicesSlice'
import CommonDivider from '../../../components/divider/CommonDivider'
import IconWithTitleDescription from '../../../components/text/IconWithTitleDescription'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import { RootStackParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EventIcon, TimeIcon, ChatIcon, CrossIcon, DocumentIcon } from '../../../../assets/images'
import { AddServiceType, AppColors, FontFamily } from '../../../constants'

type ServicesProps = NativeStackScreenProps<RootStackParamList, 'AddServices'>

const AddServiceModal = ({ navigation }: ServicesProps) => {
    const addServices: AddServicesState = useSelector((state: any) => state.addServices);
    const dispatch = useDispatch<AppDispatch>();

    const modalVisibility = (val: boolean) => {
        dispatch(showAddServiceModal(val));
    }

    const addEventService = () => {
        modalVisibility(false)
        navigation.push('CreateEventService', { serviceType: AddServiceType.EVENT, stack: 'AddService' })
    }
    const addSellProductService = () => {
        modalVisibility(false)
        navigation.push('CreateEventService', { serviceType: AddServiceType.DIGITAL_PRODUCT, stack: 'AddService' })
    }
    const addSellTimeService = () => {
        modalVisibility(false)
        navigation.push('CreateEventService', { serviceType: AddServiceType.CALL, stack: 'AddService' })
    }
    const addChatService = () => {
        modalVisibility(false)
        navigation.push('CreateEventService', { serviceType: AddServiceType.CHAT, stack: 'AddService' })
    }

    return (
        <View>
            <Modal
                transparent visible={addServices.showAddServiceModal}
                onRequestClose={() => { modalVisibility(false) }}
                animationType='fade'
            >
                <CommonStatusBar backgroundColor={AppColors.MODAL_BG} />
                <View style={styles.modalBody}>
                    <View style={styles.modalContainer}>
                        <View style={styles.titleRow}>
                            <Text style={styles.addServiceText}>Add Service</Text>
                            <TouchableOpacity onPress={() => { modalVisibility(false) }}>
                                <CrossIcon style={{ height: 24, width: 24 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <CommonDivider />
                        </View>
                        <View style={styles.serviceType}>
                            <Pressable onPress={() => addEventService()}>
                                <IconWithTitleDescription
                                    imageIcon={
                                        <EventIcon style={styles.iconStyle} />
                                    }
                                    title='Organise a Webinar or Event'
                                    description='Best for Webinars, Discussions, Virtual events and Social events'
                                />
                            </Pressable>
                            <View style={{ height: 18 }}></View>
                            <Pressable onPress={() => addSellProductService()} >
                                <IconWithTitleDescription
                                    title='Sell a product'
                                    description='Ebooks, Downloadable Content and Digital files'
                                    imageIcon={
                                        <DocumentIcon style={styles.iconStyle} />
                                    }
                                />
                            </Pressable>
                            <View style={{ height: 18 }}></View>
                            <Pressable onPress={() => addSellTimeService()}>
                                <IconWithTitleDescription
                                    title='Sell your time'
                                    description='Best for consulting, coaching, mentoring, tutorials'
                                    imageIcon={
                                        <TimeIcon style={styles.iconStyle} />
                                    }
                                />
                            </Pressable>
                            <View style={{ height: 18 }}></View>
                            <Pressable onPress={() => addChatService()}>
                                <IconWithTitleDescription
                                    title='Chat services'
                                    description='Best for Guidance, Casual services, Community payments, Support services'
                                    imageIcon={
                                        <ChatIcon style={styles.iconStyle} />
                                    }
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AddServiceModal

const styles = StyleSheet.create({
    modalBody: {
        backgroundColor: AppColors.MODAL_BG,
        flex: 1,
        justifyContent: 'center'
    },
    modalContainer: {
        width: 330,
        backgroundColor: AppColors.WHITE,
        borderRadius: 16,
        paddingVertical: 24,
        alignSelf: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    addServiceText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    serviceType: {
        marginLeft: 20,
        marginRight: 35
    },
    iconStyle: {
        maxHeight: 24,
        maxWidth: 24,
    }
})