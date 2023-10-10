import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CommonDivider from '../../../components/divider/CommonDivider'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import AppColors from '../../../constants/AppColors'
import MenuOptions from '../../../constants/MenuOptions'
import HomeAppBar from '../components/HomeAppBar'
import CommonTextInput from '../../../components/textInput/CommonTextInput'
import FontFamily from '../../../constants/FontFamily'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import RehustleLinkTextInput from '../../../components/textInput/RehustleLinkTextInput'
import { UserActiveIcon } from '../../../../assets/images/svg_index'
import { getCurrentUserData } from '../redux/profileSlice'
import { updateName, updateLink, updateAbout, setSnackbar, setValidation, updateProfile } from '../redux/profileSlice'
import CommonButton from '../../../components/buttons/CommonButton'
import CommonSnackbar, { SnackbarPosition } from '../../../components/snackbar/CommonSnackbar'

const ProfileScreen = (): JSX.Element => {
    const profileStore = useSelector((state: any) => state.profile)
    const dispatch = useDispatch<AppDispatch>()

    console.log("Profile store", profileStore);

    const setName = (name: string) => {
        dispatch(updateName(name))
    }

    const setLink = (link: string) => {
        dispatch(updateLink(link))
    }

    const setAbout = (about: string) => {
        dispatch(updateAbout(about))
    }

    const saveDetails = () => {
        dispatch(setValidation())
    }

    useEffect(() => {
        dispatch(getCurrentUserData())
    }, [])

    useEffect(() => {
        if (profileStore.showSnackbar == true) {
            setTimeout(() => {
                dispatch(setSnackbar(false))
            }, 3000)
        }
    }, [profileStore.showSnackbar])

    useEffect(() => {
        if (profileStore.validated == true) {
            dispatch(updateProfile())
        }
    }, [profileStore.validated])

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <View style={{ height: 74 }}>
                <HomeAppBar
                    title={MenuOptions.PROFILE} />
                <CommonDivider />
            </View>
            <View style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
                {
                    (profileStore.loadingScreen)
                        ? <View style={styles.loadingScreen}>
                            <ActivityIndicator size={48} color={AppColors.PRIMARY_COLOR} />
                        </View>
                        : <ScrollView>
                            <View style={styles.main}>
                                <Text style={[styles.title, { fontSize: 14, color: AppColors.GRAY1 }]}>Profile Information</Text>
                                <View style={{ height: 8 }}></View>
                                <Text style={[styles.title, { color: AppColors.GRAY4 }]}>Let your audience know more about you. Add a brief description about yourself and social links which would be visible on your profile page</Text>
                                <View style={{ height: 16 }}></View>
                                <Text style={styles.title}>Name</Text>
                                <View style={{ height: 8 }}></View>
                                <CommonTextInput
                                    value={profileStore.name}
                                    placeholder='Enter your Full Name'
                                    errorText={profileStore.error.nameError}
                                    onChangeText={(name) => { setName(name) }}
                                />
                                <View style={{ height: 16 }}></View>
                                <Text style={styles.title}>Public Link</Text>
                                <View style={{ height: 8 }}></View>
                                <RehustleLinkTextInput
                                    value={profileStore.link}
                                    errorText={profileStore.error.linkError}
                                    onChangeText={(link) => { setLink(link) }}
                                />
                                <View style={{ height: 16 }}></View>
                                <Text style={styles.title}>About</Text>
                                <View style={{ height: 8 }}></View>
                                <CommonTextInput
                                    value={profileStore.about}
                                    placeholder='Let your audience know about you in brief'
                                    // errorText={profileStore.error.accountNoError}
                                    onChangeText={(about) => { setAbout(about) }}
                                />
                                <View style={{ height: 24 }}></View>
                                <Text style={[styles.title, { fontSize: 14, color: AppColors.GRAY1 }]}>Appearance</Text>
                                <View style={{ height: 8 }}></View>
                                <Text style={[styles.title, { color: AppColors.GRAY4 }]}>Choose how your page looks and feels. Get started with a preset below, or pick everything from scratch.</Text>
                                <View style={{ height: 16 }}></View>
                                <View style={styles.card}>
                                    {
                                        ((profileStore.bannerImage == "") || (profileStore.bannerImage == null) || (profileStore.bannerImage == undefined))
                                            ? <View style={styles.cover}></View>
                                            : <Image style={styles.imageContainer} source={{ uri: profileStore.bannerImage }} />
                                    }
                                    <View style={styles.topContainer}>
                                        <View style={styles.profileBox}>
                                            {
                                                ((profileStore.profileImage != "") && (profileStore.profileImage != null))
                                                    ? <Image style={styles.profile} source={{ uri: profileStore.profileImage }} />
                                                    : <View style={styles.profile}>
                                                        <View style={{ borderRadius: 16, flex: 1, justifyContent: 'flex-end' }}>
                                                            <UserActiveIcon style={{ minHeight: 80, minWidth: 80, alignSelf: 'center', }} />
                                                        </View>
                                                    </View>
                                            }
                                        </View>
                                        <View style={{ height: 12 }}></View>

                                    </View>
                                </View>
                                <View style={{ height: 24 }}></View>
                            </View>
                        </ScrollView>
                }
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        {
                            profileStore.buttonLoading
                                ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                : <CommonButton title='Save changes' onPress={saveDetails} />
                        }
                    </View>
                </View>
                <CommonSnackbar
                    message='Updated Successfully!'
                    position={SnackbarPosition.TOP}
                    visible={profileStore.showSnackbar}
                />
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    main: {
        margin: 24,
    },
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        color: AppColors.GRAY2,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    card: {
        backgroundColor: AppColors.WHITE,
        height: 326,
        borderRadius: 16,
        shadowColor: AppColors.MODAL_BG,
        shadowRadius: 20,
        elevation: 2
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
        backgroundColor: AppColors.WHITE
    },
    profile: {
        height: 112,
        width: 112,
        backgroundColor: AppColors.GRAY6,
        borderRadius: 16,
    },
})