import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar';
import AppColors from '../../../constants/AppColors';
import CommonDivider from '../../../components/divider/CommonDivider';
import HomeAppBar from '../components/HomeAppBar';
import NoServicesPresent from '../components/NoServicesPresent';
import CommonButton from '../../../components/buttons/CommonButton';
import FontFamily from '../../../constants/FontFamily';
import { RootStackParamList } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '../../../app/store';
import { getAllServices, showAddServiceModal, setRefresh, showMenuModal } from '../redux/servicesSlice';
import ServicesList from '../components/ServicesList';
import AddServiceModal from '../components/AddServiceModal';
import { useNavigation } from '@react-navigation/native';
import MenuOptionsModal from '../components/MenuOptionsModal';
import MenuOptions from '../../../constants/MenuOptions';

type ServicesProps = NativeStackScreenProps<RootStackParamList, 'Services'>;

const ServicesScreen = ({ navigation, route }: ServicesProps) => {
    const servicesReducer = useSelector((state: any) => state.services);
    const dispatch = useDispatch<AppDispatch>();
    // const nav = useNavigation();

    const routeData = route.params;

    // console.log('Services store', servicesReducer);

    const modalVisibility = (val: boolean) => {
        dispatch(showAddServiceModal(val));
    }

    const refreshControl = () => {
        dispatch(setRefresh(true))
        dispatch(getAllServices());
    }

    const menuButtonTap = (value: boolean) => {
        dispatch(showMenuModal(value));
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
                <HomeAppBar
                    title={MenuOptions.SERVICES}
                    appBar={true}
                    menuButtonTap={() => menuButtonTap(true)} />
                <CommonDivider />
            </View>
            <View style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={servicesReducer.refresh}
                            onRefresh={refreshControl}
                            colors={[AppColors.PRIMARY_COLOR]}
                        />
                    }>
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
                        <MenuOptionsModal
                            title={MenuOptions.SERVICES}
                            visible={servicesReducer.showMenuModal}
                            menuButtonTap={() => menuButtonTap(false)}
                        />
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
