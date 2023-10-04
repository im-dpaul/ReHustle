import { ActivityIndicator, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar';
import AppColors from '../../../constants/AppColors';
import CommonDivider from '../../../components/divider/CommonDivider';
import HomeAppBar from '../components/HomeAppBar';
import NoServicesPresent from '../components/NoServicesPresent';
import CommonButton from '../../../components/buttons/CommonButton';
import FontFamily from '../../../constants/FontFamily';
import LocalStorage from '../../../data/local_storage/LocalStorage';
import StorageDataTypes from '../../../constants/StorageDataTypes';
import { RootStackParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '../../../app/store';
import { getAllServices, showAddServiceModal, setRefresh } from '../redux/servicesSlice';
import ServicesList from '../components/ServicesList';
import AddServiceModal from '../components/AddServiceModal';
import { useNavigation } from '@react-navigation/native';

type ServicesProps = NativeStackScreenProps<RootStackParamList, 'Services'>;

const ServicesScreen = ({ navigation, route }: ServicesProps) => {
    const servicesReducer = useSelector((state: any) => state.services);
    const dispatch = useDispatch<AppDispatch>();
    // const nav = useNavigation();

    const routeData = route.params;

    console.log('Services store', servicesReducer);

    const modalVisibility = (val: boolean) => {
        dispatch(showAddServiceModal(val));
    }

    const menuButtonTap = async () => {
        navigation.replace('SignIn', { 'fromHome': true });
        await LocalStorage.DeleteData(StorageDataTypes.TOKEN);
        await LocalStorage.DeleteData(StorageDataTypes.ID);
        await LocalStorage.DeleteData(StorageDataTypes.NAME);
        await LocalStorage.DeleteData(StorageDataTypes.EMAIL);
        await LocalStorage.DeleteData(StorageDataTypes.PROFILE_IMAGE);
        await LocalStorage.DeleteData(StorageDataTypes.SETUP_STAGE);
    }

    // useEffect(() => {
    //     const unsubscribe = nav.addListener('focus', () => {
    //         console.log('First screen is in focus');
    //     });

    //     return unsubscribe;
    // }, [nav]);

    useEffect(() => {
        if (routeData != undefined) {
            if (routeData.refresh == true) {
                dispatch(getAllServices());
                dispatch(getAllServices());
            }
        }
    }, [routeData])

    useEffect(() => {
        dispatch(getAllServices());
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <View style={{ height: 74 }}>
                <HomeAppBar title='Services' menuButtonTap={() => menuButtonTap()} />
                <CommonDivider />
            </View>
            <View style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
                <ScrollView >
                    <View style={styles.mainBody}>
                        <View style={styles.servicesRow}>
                            <Text style={styles.servicesText}>Services</Text>
                            <View style={{ width: 126 }}>
                                <CommonButton title='Add Service' height={32} onPress={() => { modalVisibility(true) }} />
                            </View>
                        </View>
                        <View style={{ marginVertical: 24 }}>
                            {
                                servicesReducer.screenLoading
                                    ? <View style={{ height: 600, justifyContent: 'center' }}>
                                        <ActivityIndicator size={48} color={AppColors.PRIMARY_COLOR} />
                                    </View>
                                    : servicesReducer.servicesData.length
                                        ? <ServicesList />
                                        : <View >
                                            <View style={{ height: 150 }}></View>
                                            <NoServicesPresent />
                                        </View>
                            }
                        </View>
                        <AddServiceModal navigation={navigation} route={route} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainBody: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        flex: 1,
        backgroundColor: AppColors.WHITE
    },
    servicesText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    servicesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default ServicesScreen;
