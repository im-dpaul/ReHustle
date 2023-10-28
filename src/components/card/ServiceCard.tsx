import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Moment from 'moment';
import CommonButton from '../buttons/CommonButton';
import CommonDivider from '../divider/CommonDivider';
import { AttachmentClip, CalenderIcon, ChatIcon, ClockIcon, EditIcon, MoreIcon, PriceIcon, TrashIcon, VideoIcon } from '../../../assets/images';
import { ServiceBannerImage } from '..';
import { AddServiceType, AppColors, FontFamily } from '../../constants';

interface ServiceCardProps {
    title: string,
    description: string,
    bannerImage: string,
    serviceType: string,
    duration: string,
    date: string | undefined,
    price: string,
    active: boolean,
    onHidePage: (() => void),
    onEditService: (() => void),
    onDeleteService: (() => void),
    onMoreTap: (() => void)
}

const ServiceCard = (props: ServiceCardProps): React.JSX.Element => {
    let service = '';
    if (props.serviceType == AddServiceType.EVENT) {
        service = 'Event'
    } else if (props.serviceType == AddServiceType.CALL) {
        service = 'Video Call'
    } else if (props.serviceType == AddServiceType.DIGITAL_PRODUCT) {
        service = 'Digital Product'
    } else if (props.serviceType == AddServiceType.CHAT) {
        service = 'Chat Service'
    }

    let date = ''
    if ((props.date ?? '') != '') {
        date = Moment(props.date).format('MMM Do, yyyy');
    }
    else {
        date = 'You choose'
    }

    let activeText = 'Hide from page'
    if (props.active != true) {
        activeText = 'Show on profile'
    }

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                {
                    (props.bannerImage == '')
                        ? <ServiceBannerImage serviceType={props.serviceType} />
                        : <Image style={styles.imageContainer} source={{ uri: props.bannerImage }} />
                }
            </View>
            <View style={styles.details}>
                <Text style={styles.titleText}>{props.title}</Text>
                <View style={{ height: 8 }}></View>
                <Text style={styles.descriptionText}>{props.description}</Text>
                <View style={{ height: 16 }}></View>
                <View style={styles.iconAndTextRow}>
                    <View>
                        <View style={styles.iconAndText}>
                            {
                                (props.serviceType == AddServiceType.CHAT)
                                    ? <ChatIcon style={styles.imageIcon} />
                                    : (props.serviceType == AddServiceType.DIGITAL_PRODUCT)
                                        ? <AttachmentClip style={styles.imageIcon} />
                                        : <VideoIcon style={styles.imageIcon} />
                            }
                            <View style={{ width: 8 }}></View>
                            <Text style={styles.iconText}>{service}</Text>
                        </View>
                        {
                            (props.serviceType == AddServiceType.EVENT || props.serviceType == AddServiceType.CALL)
                                ? <View>
                                    <View style={{ height: 16 }}></View>
                                    <View style={styles.iconAndText}>
                                        <ClockIcon style={styles.imageIcon} />
                                        <View style={{ width: 8 }}></View>
                                        <Text style={styles.iconText}>{props.duration} minutes</Text>
                                    </View>
                                </View>
                                : null
                        }
                    </View>
                    <View>
                        <View style={styles.iconAndText}>
                            <PriceIcon style={styles.imageIcon} />
                            <View style={{ width: 8 }}></View>
                            <Text style={styles.iconText}>₹ {props.price}</Text>
                        </View>
                        {
                            (props.serviceType == AddServiceType.EVENT || props.serviceType == AddServiceType.CALL)
                                ? <View>
                                    <View style={{ height: 16 }}></View>
                                    <View style={styles.iconAndText}>
                                        <CalenderIcon style={styles.imageIcon} />
                                        <View style={{ width: 8 }}></View>
                                        <Text style={styles.iconText}>{date}</Text>
                                    </View>
                                </View>
                                : null
                        }

                    </View>
                </View>
            </View>
            <CommonDivider />
            <View style={styles.editServiceRow}>
                <View style={{ width: 120 }}>
                    <CommonButton title={activeText} active={false} height={32} onPress={props.onHidePage} />
                </View>
                <View style={{ marginLeft: 'auto' }}></View>
                <TouchableOpacity onPress={() => { props.onEditService() }}>
                    <EditIcon style={styles.imageIcon} />
                </TouchableOpacity>
                <View style={{ width: 12 }}></View>
                <TouchableOpacity onPress={() => { props.onDeleteService() }}>
                    <TrashIcon style={styles.imageIcon} />
                </TouchableOpacity>
                {/* <View style={{ width: 12 }}></View>
                <TouchableOpacity onPress={() => { props.onMoreTap() }}>
                    <MoreIcon style={styles.imageIcon} />
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default ServiceCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: AppColors.WHITE,
        borderRadius: 16,
        elevation: 6,
        shadowColor: AppColors.GRAY3
    },
    imageContainer: {
        backgroundColor: AppColors.SECONDARY_COLOR,
        height: 178,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    details: {
        marginHorizontal: 24,
        marginTop: 24,
        marginBottom: 16,
    },
    titleText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    descriptionText: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    editServiceRow: {
        marginVertical: 16,
        marginHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageIcon: {
        maxHeight: 20,
        maxWidth: 20,
    },
    iconAndTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconAndText: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 130,
    },
    iconText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    }
})