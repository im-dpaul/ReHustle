import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ServiceCard from './ServiceCard'
import { useSelector } from 'react-redux';

const ServicesList = () => {
    const servicesReducer = useSelector((state: any) => state.addServices);

    const onHidePage = () => { }
    const onEditService = () => { }
    const onDeleteService = () => { }
    const onMoreTap = () => { }

    return (
        <View style={styles.list}>
            <FlatList
                data={servicesReducer.servicesData}
                scrollEnabled={false}
                renderItem={
                    (item) =>
                        <View style={{ marginBottom: 20, paddingHorizontal: 2 }}>
                            <ServiceCard
                                title={item.item.title}
                                description={item.item.description}
                                bannerImage={item.item.bannerImage}
                                serviceType={item.item.service.serviceType}
                                duration={item.item.service.duration}
                                date={item.item.service.date}
                                price={item.item.price.amount}
                                onHidePage={() => { onHidePage() }}
                                onEditService={() => { onEditService() }}
                                onDeleteService={() => { onDeleteService() }}
                                onMoreTap={() => { onMoreTap() }}
                            />
                        </View>
                }
                ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
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