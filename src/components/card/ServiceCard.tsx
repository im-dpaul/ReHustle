import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Moment from 'moment';
import AppColors from '../../constants/AppColors';
import FontFamily from '../../constants/FontFamily';
import CommonButton from '../buttons/CommonButton';
import CommonDivider from '../divider/CommonDivider';
import { CalenderHalf, CalenderIcon, ClockIcon, EditIcon, MoreIcon, PriceIcon, StarHalf, TrashIcon, VideoIcon } from '../../../assets/images';

interface ServiceCardProps {
    title: string,
    description: string,
    bannerImage: string,
    serviceType: string,
    duration: string,
    date: string,
    price: string,
    active: boolean,
    onHidePage: (() => void),
    onEditService: (() => void),
    onDeleteService: (() => void),
    onMoreTap: (() => void)
}

const ServiceCard = (props: ServiceCardProps) => {
    let service = '';
    if (props.serviceType == 'call') {
        service = 'Video Call'
    }
    else {
        service = 'Event'
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
                        ? <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto' }}>
                            <CalenderHalf style={{ maxHeight: 134, maxWidth: 216 }} />
                            <StarHalf style={{ maxHeight: 42, maxWidth: 66, position: 'absolute' }} />
                        </View>
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
                            <VideoIcon style={styles.imageIcon} />
                            <View style={{ width: 8 }}></View>
                            <Text style={styles.iconText}>{service}</Text>
                        </View>
                        <View style={{ height: 16 }}></View>
                        <View style={styles.iconAndText}>
                            <ClockIcon style={styles.imageIcon} />
                            <View style={{ width: 8 }}></View>
                            <Text style={styles.iconText}>{props.duration} minutes</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.iconAndText}>
                            <PriceIcon style={styles.imageIcon} />
                            <View style={{ width: 8 }}></View>
                            <Text style={styles.iconText}>₹ {props.price}</Text>
                        </View>
                        <View style={{ height: 16 }}></View>
                        <View style={styles.iconAndText}>
                            <CalenderIcon style={styles.imageIcon} />
                            <View style={{ width: 8 }}></View>
                            <Text style={styles.iconText}>{date}</Text>
                        </View>
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
                <View style={{ width: 12 }}></View>
                <TouchableOpacity onPress={() => { props.onMoreTap() }}>
                    <MoreIcon style={styles.imageIcon} />
                </TouchableOpacity>
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