import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CommonDivider from '../../../components/divider/CommonDivider'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import AppColors from '../../../constants/AppColors'
import MenuOptions from '../../../constants/MenuOptions'
import HomeAppBar from '../components/HomeAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { getCurrentUserData } from './../redux/profileSlice'
import FontFamily from '../../../constants/FontFamily'
import { UserActiveIcon } from '../../../../assets/images'

const PreviewScreen = (): JSX.Element => {
    const profileStore = useSelector((state: any) => state.profile)
    const dispatch = useDispatch<AppDispatch>()

    // console.log("ProfileStore ", profileStore);

    useEffect(() => {
        dispatch(getCurrentUserData())
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <View style={{ height: 74 }}>
                <HomeAppBar
                    title={MenuOptions.PREVIEW} />
                <CommonDivider />
            </View>
            <View style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
                {
                    (profileStore.loading || (profileStore.data == null))
                        ? <View style={styles.loadingScreen}>
                            <ActivityIndicator size={48} color={AppColors.PRIMARY_COLOR} />
                        </View>
                        : <View style={styles.main}>
                            <View style={styles.card}>
                                {
                                    ((profileStore.bannerImage == "") || (profileStore.bannerImage == null))
                                        ? <View style={styles.cover}></View>
                                        : <Image style={styles.imageContainer} source={{ uri: profileStore.bannerImage }} />
                                }
                                <View style={styles.topContainer}>
                                    <View style={styles.profileBox}>
                                        {
                                            ((profileStore.data.profileImage != "") && (profileStore.data.profileImage != null))
                                                ? <Image style={styles.profile} source={{ uri: profileStore.data.profileImage }} />
                                                : <View style={styles.profile}>
                                                    <View style={{ borderRadius: 16, flex: 1, justifyContent: 'flex-end' }}>
                                                        <UserActiveIcon style={{ minHeight: 80, minWidth: 80, alignSelf: 'center', }} />
                                                    </View>
                                                </View>
                                        }
                                    </View>
                                    <View style={{ height: 12 }}></View>
                                    <Text style={styles.name}>{profileStore.data.name}</Text>
                                    <View style={{ height: 4 }}></View>
                                    <Text style={styles.userName}>rehustle.co/{profileStore.data.userName}</Text>
                                </View>
                            </View>
                        </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default PreviewScreen

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    main: {
        margin: 24
    },
    card: {
        backgroundColor: AppColors.WHITE,
        height: 356,
        borderRadius: 16,
        shadowColor: AppColors.MODAL_BG,
        shadowRadius: 8,
        elevation: 2,
        shadowOpacity: 0.2, 
        // zIndex:999, 
    },
    cover: {
        height: 206,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: AppColors.GRAY6
    },
    imageContainer: {
        height: 206,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    topContainer: {
        position: 'absolute',
        top: 145,
        alignItems: 'center',
        alignSelf: 'center'
    },
    profileBox: {
        elevation: 6,
        padding: 8,
        borderRadius: 16,
        backgroundColor: AppColors.WHITE,
        shadowOffset: { width: 6, height: 6 },  
        shadowRadius: 8,
        shadowColor: AppColors.MODAL_BG,  
        shadowOpacity: 0.4, 
        // zIndex:999, 
    },
    profile: {
        height: 112,
        width: 112,
        backgroundColor: AppColors.GRAY6,
        borderRadius: 16,
    },
    name: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    userName: {
        color: AppColors.PRIMARY_COLOR,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    }
})