import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HomeAppBar from './HomeAppBar'
import AppColors from '../../../constants/AppColors'
import { EventIcon, SmartphoneIcon, ClockIcon, ChatIcon } from '../../../../assets/images'
import IconWithTitleDescription from '../../../components/text/IconWithTitleDescription'
import CommonDivider from '../../../components/divider/CommonDivider'
import FontFamily from '../../../constants/FontFamily'
import { LogoutIcon, SlidersIcon, UserIcon, GridIcon, HelpCircleIcon, PreviewIcon } from '../../../../assets/images/svg_index'
import StorageDataTypes from '../../../constants/StorageDataTypes'
import LocalStorage from '../../../data/local_storage/LocalStorage'
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'

const MenuOptionsModal = (props: { title: string, visible: boolean, menuButtonTap: (() => void) }): JSX.Element => {
    const Navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const addEventService = () => { }
    const addSellProductService = () => { }
    const addSellTimeService = () => { }
    const addChatService = () => { }

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
                            <Pressable onPress={() => addEventService()}>
                                <IconWithTitleDescription
                                    imageIcon={
                                        <PreviewIcon style={styles.iconStyle} />
                                    }
                                    title='Preview'
                                    description='Check your public profile view'
                                    icon={EventIcon}
                                />
                            </Pressable>
                            <View style={{ height: 24 }}></View>
                            <Pressable onPress={() => addSellProductService()} >
                                <IconWithTitleDescription
                                    imageIcon={
                                        <SlidersIcon style={styles.iconStyle} />
                                    }
                                    title='Insights'
                                    description='Page views, clicks and sales'
                                    icon={SmartphoneIcon}
                                />
                            </Pressable>
                            <View style={{ height: 24 }}></View>
                            <Pressable onPress={() => addSellTimeService()}>
                                <IconWithTitleDescription
                                    imageIcon={
                                        <UserIcon style={styles.iconStyle} />
                                    }
                                    title='Profile'
                                    description='Your personal information and social links'
                                    icon={ClockIcon}
                                />
                            </Pressable>
                            <View style={{ height: 24 }}></View>
                            <Pressable onPress={() => addChatService()}>
                                <IconWithTitleDescription
                                    imageIcon={
                                        <GridIcon style={styles.iconStyle} />
                                    }
                                    title='Services'
                                    description='View and manage the services you offer'
                                    icon={ChatIcon}
                                />
                            </Pressable>
                            <View style={{ height: 24 }}></View>
                            <Pressable onPress={() => addChatService()}>
                                <IconWithTitleDescription
                                    imageIcon={
                                        <HelpCircleIcon style={styles.iconStyle} />
                                    }
                                    title='Help'
                                    description='Share feedback or contact us for support'
                                    icon={ChatIcon}
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