import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppColors from '../../../constants/AppColors'
import FontFamily from '../../../constants/FontFamily'
import CommonDivider from '../../../components/divider/CommonDivider'
import CommonButton from '../../../components/buttons/CommonButton'
import { CalendarIcon, ClockIcon, EditIcon, HalfCalender, HalfStar, MoreIcon, PriceGroup, TrashIcon, VideoIcon } from '../../../../assets/images'

const ServiceCard = (props: { title: string, description: string, bannerImage: string, serviceType: string, duration: string, date: string, price: string, onHidePage: (() => void), onEditService: (() => void), onDeleteService: (() => void), onMoreTap: (() => void) }) => {
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                {
                    (props.bannerImage == '')
                        ? <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto' }}>
                            <Image style={{ height: 134, width: 216 }} source={HalfCalender} />
                            <Image style={{ height: 42, width: 66, position: 'absolute' }} source={HalfStar} />
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
                            <Image style={styles.imageIcon} source={VideoIcon} />
                            <View style={{ width: 8 }}></View>
                            <Text style={styles.iconText}>{props.serviceType}</Text>
                        </View>
                        <View style={{ height: 16 }}></View>
                        <View style={styles.iconAndText}>
                            <Image style={styles.imageIcon} source={ClockIcon} />
                            <View style={{ width: 8 }}></View>
                            <Text style={styles.iconText}>{props.duration}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.iconAndText}>
                            <Image style={styles.imageIcon} source={PriceGroup} />
                            <View style={{ width: 8 }}></View>
                            <Text style={styles.iconText}>{props.price}</Text>
                        </View>
                        <View style={{ height: 16 }}></View>
                        <View style={styles.iconAndText}>
                            <Image style={styles.imageIcon} source={CalendarIcon} />
                            <View style={{ width: 8 }}></View>
                            <Text style={styles.iconText}>{props.date}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <CommonDivider />
            <View style={styles.editServiceRow}>
                <View style={{ width: 120 }}>
                    <CommonButton title='Hide from page' active={false} height={32} onPress={props.onHidePage} />
                </View>
                <View style={{ marginLeft: 'auto' }}></View>
                <TouchableOpacity onPress={() => { props.onEditService() }}>
                    <Image style={styles.imageIcon} source={EditIcon} />
                </TouchableOpacity>
                <View style={{ width: 12 }}></View>
                <TouchableOpacity onPress={() => { props.onDeleteService() }}>
                    <Image style={styles.imageIcon} source={TrashIcon} />
                </TouchableOpacity>
                <View style={{ width: 12 }}></View>
                <TouchableOpacity onPress={() => { props.onMoreTap() }}>
                    <Image style={styles.imageIcon} source={MoreIcon} />
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
        shadowColor: AppColors.GRAY2
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
        color: AppColors.GRAY2,
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
        height: 20,
        width: 20,
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