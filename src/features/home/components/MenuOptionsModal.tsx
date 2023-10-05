import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HomeAppBar from './HomeAppBar'
import AppColors from '../../../constants/AppColors'
import IconWithTitleDescription from '../../../components/text/IconWithTitleDescription'
import CommonDivider from '../../../components/divider/CommonDivider'
import FontFamily from '../../../constants/FontFamily'
import { LogoutIcon, SlidersIcon, UserIcon, GridIcon, HelpCircleIcon, PreviewIcon, PriceIcon, SettingsIcon, PreviewActiveIcon, SlidersActiveIcon, UserActiveIcon, GridActiveIcon, SettingsActiveIcon } from '../../../../assets/images/svg_index'
import StorageDataTypes from '../../../constants/StorageDataTypes'
import LocalStorage from '../../../data/local_storage/LocalStorage'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'
import MenuOptions from '../../../constants/MenuOptions'

const MenuOptionsModal = (props: { title: string, visible: boolean, menuButtonTap: (() => void) }): JSX.Element => {
    const Navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const onMenuSelection = (option: string) => {
        if (props.title == option) {
            props.menuButtonTap()
        }
        else {
            console.log('Val', option);
        }
    }

    const onLogout = async () => {
        props.menuButtonTap()
        if (Navigation.canGoBack()) {
            Navigation.popToTop();
        }
        Navigation.replace('SignIn', { 'fromHome': true });

        await LocalStorage.DeleteData(StorageDataTypes.TOKEN);
        await LocalStorage.DeleteData(StorageDataTypes.ID);
        await LocalStorage.DeleteData(StorageDataTypes.NAME);
        await LocalStorage.DeleteData(StorageDataTypes.EMAIL);
        await LocalStorage.DeleteData(StorageDataTypes.PROFILE_IMAGE);
        await LocalStorage.DeleteData(StorageDataTypes.SETUP_STAGE);
    }

    return (
        <View>
            <Modal
                transparent visible={props.visible}
                onRequestClose={() => { props.menuButtonTap ? props.menuButtonTap() : null }}
                animationType='fade'>
                <View style={styles.main}>
                    <View style={styles.container}>
                        <View style={styles.appBar}>
                            <HomeAppBar
                                appBar={false}
                                title={props.title}
                                menuButtonTap={() => { props.menuButtonTap ? props.menuButtonTap() : null }}
                            />
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
                                    description='Edit Password'
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
                            <TouchableOpacity onPress={() => { onLogout() }}>
                                <View style={styles.logoutButton}>
                                    <LogoutIcon style={styles.logoutIcon} />
                                    <View style={{ width: 8 }}></View>
                                    <Text style={styles.logoutText}>Log Out</Text>
                                </View>
                            </TouchableOpacity>
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
    }
})