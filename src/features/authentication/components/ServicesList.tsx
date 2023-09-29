import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ServiceCard from './ServiceCard'

const ServicesList = () => {
    const onHidePage = () => { }
    const onEditService = () => { }
    const onDeleteService = () => { }
    const onMoreTap = () => { }

    return (
        <View style={styles.list}>
            <ServiceCard
                title='Sell your time'
                description='Write an amazing description in this dedicated card section. Each word counts.'
                bannerImage='https://rehustle-images.s3.amazonaws.com/images/virtual-call-banner.jpeg'
                serviceType='Video call'
                duration='30 min'
                date='You choose'
                price='₹2000'
                onHidePage={() => { onHidePage() }}
                onEditService={() => { onEditService() }}
                onDeleteService={() => { onDeleteService() }}
                onMoreTap={() => { onMoreTap() }}
            />
        </View>
    )
}

export default ServicesList

const styles = StyleSheet.create({
    list: {
        width: '100%',
    }
})