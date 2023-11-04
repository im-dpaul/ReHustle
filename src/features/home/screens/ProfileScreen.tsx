import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { EditPen, UserActiveIcon } from '../../../../assets/images'
import { updateName, updateLink, updateAbout, setSnackbar, setValidation, updateProfile, ProfileState, changeImage, getCurrentUserData } from '../redux/profileSlice'
import CommonButton from '../../../components/buttons/CommonButton'
import CommonSnackbar, { SnackbarPosition } from '../../../components/snackbar/CommonSnackbar'
import SocialProfileLinks from '../components/SocialProfileLinks'
import SocialProfilesLinksList from '../components/SocialProfilesLinksList'
import ProfileLinkTitleDescription from '../components/ProfileLinkTitleDescription'
import AddLinksList from '../components/AddLinksList'
import { ChangeCoverButton } from '../components'

const ProfileScreen = (): JSX.Element => {
    const profileStore: ProfileState = useSelector((state: any) => state.profile)
    const dispatch = useDispatch<AppDispatch>()

    // console.log("Profile store", profileStore);

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

    const onChangeProfilePhoto = () => {
        dispatch(changeImage('profilePhoto'))
    }

    const onChangeBannerImage = () => {
        dispatch(changeImage('banner'))
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
                    (profileStore.loading)
                        ? <View style={styles.loadingScreen}>
                            <ActivityIndicator size={48} color={AppColors.PRIMARY_COLOR} />
                        </View>
                        : <ScrollView>
                            <View style={styles.main}>
                                <Text style={[styles.title, { fontSize: 14, color: AppColors.GRAY1 }]}>Profile Information</Text>
                                <View style={{ height: 8 }}></View>
                                <Text style={[styles.title, { color: AppColors.GRAY3 }]}>Let your audience know more about you. Add a brief description about yourself and social links which would be visible on your profile page</Text>
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
                                    errorText={profileStore.error.descriptionError}
                                    onChangeText={(about) => { setAbout(about) }}
                                />
                                <View style={{ height: 16 }}></View>
                                <SocialProfileLinks />
                                <View style={{ height: 8 }}></View>
                                <SocialProfilesLinksList />
                                <View style={{ height: 16 }}></View>
                                <ProfileLinkTitleDescription />
                                <View style={{ height: 8 }}></View>
                                <AddLinksList />
                                <View style={{ height: 24 }}></View>
                                <Text style={[styles.title, { fontSize: 14, color: AppColors.GRAY1 }]}>Appearance</Text>
                                <View style={{ height: 8 }}></View>
                                <Text style={[styles.title, { color: AppColors.GRAY3 }]}>Choose how your page looks and feels. Get started with a preset below, or pick everything from scratch.</Text>
                                <View style={{ height: 24 }}></View>
                                <View style={styles.card}>
                                    {
                                        (profileStore.bannerImage == "")
                                            ? <View style={styles.cover}></View>
                                            : <Image style={styles.imageContainer} source={{ uri: profileStore.bannerImage }} />
                                    }
                                    {
                                        profileStore.bannerImageLoading
                                            ? <View style={styles.coverLoading}>
                                                <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                            </View>
                                            : null
                                    }
                                    <View style={styles.uploadButton}>
                                        <ChangeCoverButton onPress={() => { onChangeBannerImage() }} />
                                    </View>
                                    <View style={styles.topContainer}>
                                        <View style={styles.profileBox}>
                                            {
                                                (profileStore.profileImage != "")
                                                    ? <Image style={styles.profile} source={{ uri: profileStore.profileImage }} />
                                                    : <View style={styles.profile}>
                                                        <View style={{ borderRadius: 16, flex: 1, justifyContent: 'flex-end' }}>
                                                            <UserActiveIcon style={{ minHeight: 80, minWidth: 80, alignSelf: 'center', }} />
                                                        </View>
                                                    </View>
                                            }
                                            {
                                                profileStore.profileImageLoading
                                                    ? <View style={styles.profileLoading}>
                                                        <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                                    </View>
                                                    : null
                                            }
                                        </View>
                                        <View style={styles.profileEdit}>
                                            <TouchableOpacity onPress={onChangeProfilePhoto}>
                                                <EditPen />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                {
                                    (profileStore.error.imageError != '')
                                        ? <View style={{ marginTop: 4 }}>
                                            <Text style={styles.error}>{profileStore.error.imageError}</Text>
                                        </View>
                                        : null
                                }
                                <View style={{ height: 24 }}></View>
                            </View>
                        </ScrollView>
                }
                {
                    !(profileStore.loading)
                        ? <View>
                            <CommonDivider />
                            <View style={{ margin: 24 }}>
                                {
                                    profileStore.buttonLoading
                                        ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                        : <CommonButton title='Save changes' onPress={saveDetails} />
                                }
                            </View>
                        </View>
                        : null
                }
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
        color: AppColors.GRAY1,
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
        backgroundColor: AppColors.GRAY5
    },
    coverLoading: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        position: 'absolute',
        backgroundColor: AppColors.GRAY6,
        width: '100%',
        height: 206,
        justifyContent: 'center',
        opacity: 0.75,
        alignSelf: 'center',
    },
    imageContainer: {
        height: 206,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    uploadButton: {
        position: 'absolute',
        top: 16,
        right: 16
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
    profileEdit: {
        position: 'absolute',
        bottom: 16,
        right: 16
    },
    profile: {
        height: 112,
        width: 112,
        backgroundColor: AppColors.GRAY6,
        borderRadius: 16,
    },
    profileLoading: {
        top: 8,
        padding: 8,
        borderRadius: 16,
        position: 'absolute',
        backgroundColor: AppColors.GRAY6,
        width: '100%',
        justifyContent: 'center',
        opacity: 0.5,
        height: '100%',
        alignSelf: 'center',
    }
})