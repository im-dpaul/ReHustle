import { StyleSheet, View } from 'react-native'
import React from 'react'
import { BannerChat, BannerEvent, BannerProduct, BannerTime } from '../../../assets/images'
import { AddServiceType } from '../../constants'

const ServiceBannerImage = (props: { serviceType: string }): React.JSX.Element => {
    return (
        <View style={{ alignItems: 'center' }}>
            {
                props.serviceType == AddServiceType.EVENT
                    ? <BannerEvent />
                    : props.serviceType == AddServiceType.DIGITAL_PRODUCT
                        ? <BannerProduct />
                        : props.serviceType == AddServiceType.CALL
                            ? <BannerTime />
                            : <BannerChat />
            }
        </View>
    )
}

export default ServiceBannerImage

const styles = StyleSheet.create({})