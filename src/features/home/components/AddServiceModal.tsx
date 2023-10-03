import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppColors from '../../../constants/AppColors'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { showAddServiceModal } from '../redux/servicesSlice'
import FontFamily from '../../../constants/FontFamily'
import { ChatIcon, ClockIcon, CloseIcon, EventIcon, SmartphoneIcon } from '../../../../assets/images'
import CommonDivider from '../../../components/divider/CommonDivider'
import IconWithTitleDescription from '../../../components/text/IconWithTitleDescription'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import { RootStackParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ServicesProps = NativeStackScreenProps<RootStackParamList, 'Services'>;

const AddServiceModal = ({ navigation }: ServicesProps) => {
    const servicesReducer = useSelector((state: any) => state.services);
    const dispatch = useDispatch<AppDispatch>();

    const modalVisibility = (val: boolean) => {
        dispatch(showAddServiceModal(val));
    }

    const addEventService = () => {
        modalVisibility(false)
        navigation.push('CreateEventService')
    }
    const addSellProductService = () => { }
    const addSellTimeService = () => { }
    const addChatService = () => { }

    return (
        <View>
            <Modal
                transparent visible={servicesReducer.showAddServiceModal}
                onRequestClose={() => { modalVisibility(false) }}
                animationType='fade'
            >
                <CommonStatusBar backgroundColor={AppColors.MODAL_BG} />
                <View style={styles.modalBody}>
                    <View style={styles.modalContainer}>
                        <View style={styles.titleRow}>
                            <Text style={styles.addServiceText}>Add Service</Text>
                            <TouchableOpacity onPress={() => { modalVisibility(false) }}>
                                <Image style={{ height: 24, width: 24 }} source={CloseIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <CommonDivider />
                        </View>
                        <View style={styles.serviceType}>
                            <Pressable onPress={() => addEventService()}>
                                <IconWithTitleDescription
                                    title='Organise a Webinar or Event'
                                    description='Best for Webinars, Discussions, Virtual events and Social events'
                                    icon={EventIcon}
                                />
                            </Pressable>
                            <View style={{ height: 18 }}></View>
                            <Pressable onPress={() => addSellProductService()} >
                                <IconWithTitleDescription
                                    title='Sell a product'
                                    description='Ebooks, Downloadable Content and Digital files'
                                    icon={SmartphoneIcon}
                                />
                            </Pressable>
                            <View style={{ height: 18 }}></View>
                            <Pressable onPress={() => addSellTimeService()}>
                                <IconWithTitleDescription
                                    title='Sell your time'
                                    description='Best for consulting, coaching, mentoring, tutorials'
                                    icon={ClockIcon}
                                />
                            </Pressable>
                            <View style={{ height: 18 }}></View>
                            <Pressable onPress={() => addChatService()}>
                                <IconWithTitleDescription
                                    title='Chat services'
                                    description='Best for Guidance, Casual services, Community payments, Support services'
                                    icon={ChatIcon}
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
    }
})