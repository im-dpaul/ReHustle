import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateService, deleteService, AddServicesState } from '../redux/addServicesSlice';
import { AppDispatch } from '../../../app/store';
import ServiceCard from '../../../components/card/ServiceCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { ServiceModel } from '../../../data';

type AddServicesProps = NativeStackScreenProps<RootStackParamList, 'AddServices'>;

const ServicesList = ({ navigation }: AddServicesProps) => {
    const addServicesR: AddServicesState = useSelector((state: any) => state.addServices);
    const dispatch = useDispatch<AppDispatch>();

    const onHidePage = (service: ServiceModel) => {
        let updatedService: ServiceModel = {
            _id: service._id,
            bannerImage: service.bannerImage,
            description: service.description,
            isActive: !service.isActive,
            paymentMode: service.paymentMode,
            price: service.price,
            service: service.service,
            title: service.title,
        };
        dispatch(updateService(updatedService));
    }

    const onEditService = (service: ServiceModel) => {
        navigation.push('CreateService', { serviceType: service.service.serviceType, stack: 'AddService', serviceData: service })
    }

    const onDeleteService = (id: string | undefined) => {
        if (id != undefined) {
            dispatch(deleteService(id));
        }
    }

    const onMoreTap = () => { }

    return (
        <View style={styles.list}>
            <FlatList
                data={addServicesR.servicesData}
                scrollEnabled={false}
                renderItem={
                    (item) =>
                        <View style={{ marginBottom: 20, paddingHorizontal: 2, marginTop: 4 }}>
                            <ServiceCard
                                title={item.item.title}
                                description={item.item.description}
                                bannerImage={item.item.bannerImage}
                                serviceType={item.item.service.serviceType}
                                duration={item.item.service.duration ?? ""}
                                date={item.item.service.date}
                                price={`${item.item.price.amount}`}
                                active={item.item.isActive}
                                onHidePage={() => { onHidePage(item.item) }}
                                onEditService={() => { onEditService(item.item) }}
                                onDeleteService={() => { onDeleteService(item.item._id) }}
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