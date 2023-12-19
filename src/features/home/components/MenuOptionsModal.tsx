import { Image, Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppColors from '../../../constants/AppColors'
import IconWithTitleDescription from '../../../components/text/IconWithTitleDescription'
import CommonDivider from '../../../components/divider/CommonDivider'
import FontFamily from '../../../constants/FontFamily'
import { LogoutIcon, SlidersIcon, UserIcon, GridIcon, HelpCircleIcon, PreviewIcon, PriceIcon, SettingsIcon, PreviewActiveIcon, SlidersActiveIcon, UserActiveIcon, GridActiveIcon, SettingsActiveIcon, CrossIcon, UserAvatar } from '../../../../assets/images'
import StorageKeys from '../../../constants/StorageKeys'
import LocalStorage from '../../../data/local_storage/LocalStorage'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'
import MenuOptions from '../../../constants/MenuOptions'
import CommonButton from '../../../components/buttons/CommonButton'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { MoELogout } from '../../../utils'

const MenuOptionsModal = (props: {
    title: string,
    userName: string,
    avatar: string,
    visible: boolean,
    closeButtonTap: (() => void),
    copyButtonTap: (() => void)
}): JSX.Element => {

    const insets = useSafeAreaInsets();

    const Navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const onMenuSelection = (option: string) => {
        if (props.title == option) {
            props.closeButtonTap()
        }
        else {
            if (option == MenuOptions.PREVIEW) {
                props.closeButtonTap()
                if (Navigation.canGoBack()) {
                    Navigation.popToTop();
                }
                setTimeout(() => { 
                    Navigation.replace('Preview');
                }, 500)
            }
            else if (option == MenuOptions.INSIGHTS) {
                props.closeButtonTap()
                if (Navigation.canGoBack()) {
                    Navigation.popToTop();
                }
                setTimeout(() => { 
                    Navigation.replace('Insights');
                }, 500)
            }
            else if (option == MenuOptions.PROFILE) {
                props.closeButtonTap()
                if (Navigation.canGoBack()) {
                    Navigation.popToTop();
                }
                setTimeout(() => { 
                    Navigation.replace('Profile');
                }, 500)
            }
            else if (option == MenuOptions.SERVICES) {
                props.closeButtonTap()
                if (Navigation.canGoBack()) {
                    Navigation.popToTop();
                }
                setTimeout(() => { 
                Navigation.replace('Services');
                }, 500)
            }
            else if (option == MenuOptions.PAYOUTS) {
                props.closeButtonTap()
                if (Navigation.canGoBack()) {
                    Navigation.popToTop();
                }
                setTimeout(() => {  
                Navigation.replace('Payouts');
                }, 500)
            }
            else if (option == MenuOptions.SETTINGS) {
                props.closeButtonTap()
                if (Navigation.canGoBack()) {
                    Navigation.popToTop();
                }
                setTimeout(() => {  
                Navigation.replace('Settings');
                }, 500)
            }
            else if (option == MenuOptions.HELP) {
                Linking.openURL('mailto:hello@rehustle.co').then((value) => { }).catch((err) => { })
            }
        }
    }

    const onLogout = async () => {
        props.closeButtonTap()
        if (Navigation.canGoBack()) {
            Navigation.popToTop();
        }
        setTimeout(() => {
            Navigation.replace('SignIn', { 'fromHome': true });
        }, 500) 

        MoELogout();
        await LocalStorage.DeleteData(StorageKeys.TOKEN);
        await LocalStorage.DeleteData(StorageKeys.ID);
        await LocalStorage.DeleteData(StorageKeys.NAME);
        await LocalStorage.DeleteData(StorageKeys.EMAIL);
        await LocalStorage.DeleteData(StorageKeys.PROFILE_IMAGE);
        await LocalStorage.DeleteData(StorageKeys.SETUP_STAGE);
    }

    return (
        <View>
            <Modal
                transparent visible={props.visible}
                onRequestClose={() => { props.closeButtonTap() }}
                animationType='fade'>
                <View style={styles.main}>
                    <View style={styles.container}>
                        <View style={{height: insets.top}}></View>
                        <View style={styles.appBar}>
                            <View style={styles.appBarContainer}>
                                {
                                    (props.avatar.length == 0)
                                        ? <UserAvatar style={styles.avatar} />
                                        : <Image style={styles.networkImage} source={{ uri: props.avatar }} />
                                }
                                <View style={{ width: 8 }}></View>
                                <View>
                                    <Text style={styles.title}>{props.title}</Text>
                                    <View style={{ height: 4 }}></View>
                                    <Text style={styles.subTitle}>{props.userName}</Text>
                                </View>
                                <View style={{ marginLeft: 'auto', marginRight: 16, width: 80 }}>
                                    <CommonButton title="Copy Link" height={32} active={false} onPress={() => props.copyButtonTap()} />
                                </View>
                                <Pressable onPress={() => { props.closeButtonTap ? props.closeButtonTap() : null }}>
                                    <CrossIcon style={styles.iconStyle} />
                                </Pressable>
                            </View>
                        </View>
                        <CommonDivider />
                        <View style={styles.menuBox}>
                            <Pressable onPress={() => onMenuSelection(MenuOptions.PREVIEW)}>
                                <IconWithTitleDescription
                                    imageIcon={
                                        props.title == MenuOptions.PREVIEW
                                            ? <PreviewActiveIcon style={styles.iconStyle} />
                                            : <PreviewIcon style={styles.iconStyle} />
                                    }
                                    title={MenuOptions.PREVIEW}
                                    active={props.title == MenuOptions.PREVIEW ? true : false}
                                    description='Check your public profile view'
                                />
                            </Pressable>
                            <View style={{ height: 24 }}></View>
                            <Pressable onPress={() => onMenuSelection(MenuOptions.INSIGHTS)} >
                                <IconWithTitleDescription
                                    imageIcon={
                                        props.title == MenuOptions.INSIGHTS
                                            ? <SlidersActiveIcon style={styles.iconStyle} />
                                            : <SlidersIcon style={styles.iconStyle} />
                                    }
                                    title={MenuOptions.INSIGHTS}
                                    active={props.title == MenuOptions.INSIGHTS ? true : false}
                                    description='Page views, clicks and sales'
                                />
                            </Pressable>
                            <View style={{ height: 24 }}></View>
                            <Pressable onPress={() => onMenuSelection(MenuOptions.PROFILE)}>
                                <IconWithTitleDescription
                                    imageIcon={
                                        props.title == MenuOptions.PROFILE
                                            ? <UserActiveIcon style={styles.iconStyle} />
                                            : <UserIcon style={styles.iconStyle} />
                                    }
                                    title={MenuOptions.PROFILE}
                                    active={props.title == MenuOptions.PROFILE ? true : false}
                                    description='Your personal information and social links'
                                />
                            </Pressable>
                            <View style={{ height: 24 }}></View>
                            <Pressable onPress={() => onMenuSelection(MenuOptions.SERVICES)}>
                                <IconWithTitleDescription
                                    imageIcon={
                                        props.title == MenuOptions.SERVICES
                                            ? <GridActiveIcon style={styles.iconStyle} />
                                            : <GridIcon style={styles.iconStyle} />
                                    }
                                    title={MenuOptions.SERVICES}
                                    active={props.title == MenuOptions.SERVICES ? true : false}
                                    description='View and manage the services you offer'
                                />
                            </Pressable>
                            <View style={{ height: 24 }}></View>
                            <Pressable onPress={() => onMenuSelection(MenuOptions.PAYOUTS)}>
                                <IconWithTitleDescription
                                    imageIcon={
                                        props.title == MenuOptions.PAYOUTS
                                            ? <PriceIcon style={styles.iconStyle} />
                                            : <PriceIcon style={styles.iconStyle} />
                                    }
                                    title={MenuOptions.PAYOUTS}
                                    active={props.title == MenuOptions.PAYOUTS ? true : false}
                                    description='View your payouts and sales'
                                />
                            </Pressable>
                            <View style={{ height: 24 }}></View>
                            <Pressable onPress={() => onMenuSelection(MenuOptions.SETTINGS)}>
                                <IconWithTitleDescription
                                    imageIcon={
                                        props.title == MenuOptions.SETTINGS
                                            ? <SettingsActiveIcon style={styles.iconStyle} />
                                            : <SettingsIcon style={styles.iconStyle} />
                                    }
                                    title={MenuOptions.SETTINGS}
                                    active={props.title == MenuOptions.SETTINGS ? true : false}
                                    description='Update Bank account details'
                                />
                            </Pressable>
                            <View style={{ height: 24 }}></View>
                            <Pressable onPress={() => onMenuSelection(MenuOptions.HELP)}>
                                <IconWithTitleDescription
                                    imageIcon={
                                        <HelpCircleIcon style={styles.iconStyle} />
                                    }
                                    title={MenuOptions.HELP}
                                    active={props.title == MenuOptions.HELP ? true : false}
                                    description='Share feedback or contact us for support'
                                />
                            </Pressable>
                        </View>
                        <View style={{ marginHorizontal: 24 }}>
                            <CommonDivider />
                        </View>
                        <View style={styles.logoutBox}>
                            <Pressable onPress={() => { onLogout() }}>
                                <View style={styles.logoutButton}>
                                    <LogoutIcon style={styles.logoutIcon} />
                                    <View style={{ width: 8 }}></View>
                                    <Text style={styles.logoutText}>Log Out</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default MenuOptionsModal

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: AppColors.MODAL_BG,
    },
    container: {
        backgroundColor: AppColors.WHITE,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    appBar: {
        height: 72
    },
    menuBox: {
        margin: 24,
    },
    logoutBox: {
        marginVertical: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutIcon: {
        height: 12,
        width: 12,
    },
    logoutText: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    iconStyle: {
        height: 24,
        width: 24,
    },
    appBarContainer: {
        paddingHorizontal: 24,
        paddingVertical: 18,
        flex: 1,
        flexDirection: 'row',
        alignItems: "center"
    },
    avatar: {
        height: 40,
        width: 40,
    },
    networkImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    titleRow: {
        flex: 1,
        flexDirection: "row",
    },
    title: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    subTitle: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.GILROY_REGULAR,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
})