import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addService, skipServices, addNewServices, getAllServices, clearData, AddServicesState, showAddServiceModal } from "../../authentication/redux/addServicesSlice";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../App";
import CommonStatusBar from "../../../components/layouts/CommonStatusBar";
import HeaderStepper from "../components/HeaderStepper";
import CommonDivider from "../../../components/divider/CommonDivider";
import AppColors from "../../../constants/AppColors";
import TemplateWithDescription from "../components/TemplateWithDescription";
import ServiceType from "../../../data/constants/ServiceType";
import CommonChip from "../../../components/chip/CommonChip";
import AddServicesManually from "../components/AddServicesManually";
import CommonButton from "../../../components/buttons/CommonButton";
import { AppDispatch } from "../../../app/store";
import { useEffect } from "react";
import ServicesList from "../components/ServicesList";
import { AddServiceModal } from "../components";

type AddServicesProps = NativeStackScreenProps<RootStackParamList, 'AddServices'>;

function AddServicesScreen({ navigation, route }: AddServicesProps): JSX.Element {

    const routeData = route.params;

    const addServicesR: AddServicesState = useSelector((state: any) => state.addServices);

    // console.log('Service store', addServicesR);

    const dispatch = useDispatch<AppDispatch>();

    const modalVisibility = (val: boolean) => {
        dispatch(showAddServiceModal(val));
    }

    const onContinueTap = () => { }

    const skipBtnTap = () => {
        dispatch(skipServices());
    }

    const onServiceSelection = (id: number) => {
        if (addServicesR.servicesTypeId.includes(id)) {
            // dispatch(removeService(id));
        }
        else {
            dispatch(addService(id));
            ServiceType.ServiceType[id - 1].SERVICES.forEach(
                async (service, index) => {
                    await dispatch(addNewServices(service));
                })
        }
    }

    const isActive = (id: number) => {
        let value = false;
        if (addServicesR.servicesTypeId.includes(id)) {
            value = true;
        }
        return value;
    }

    useEffect(() => {
        if (addServicesR.data != null) {
            navigation.replace('FinishAccountCreation');
            dispatch(clearData());
        }
    }, [addServicesR.data])

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
        <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <CommonStatusBar />
            <View style={{ flex: 1 }}>
                <View style={{ height: 74 }}>
                    <HeaderStepper title='Add services' step={3} skipButton={true} skipBtnTap={() => skipBtnTap()} />
                    <CommonDivider />
                </View>
                <ScrollView >
                    <View style={styles.mainBody}>
                        <TemplateWithDescription />
                        <View style={{ height: 24 }}></View>
                        <View style={styles.servicesListRow}>
                            {
                                ServiceType.ServiceType.map((service) =>
                                    <CommonChip
                                        key={service.ID}
                                        name={service.ROLE}
                                        active={isActive(service.ID)}
                                        onPress={(id) => { onServiceSelection(service.ID) }}
                                    />
                                )
                            }
                        </View>
                        <View style={{ height: 24 }}></View>
                        <AddServicesManually />
                        <View style={{ height: 24 }}></View>
                        <View style={{ width: '100%' }}>
                            <CommonButton title='+ Add Service' height={40} active={false} onPress={() => { modalVisibility(true) }} />
                        </View>
                        <View style={{ height: 24 }}></View>
                        {
                            addServicesR.screenLoading
                                ? <View style={{ height: 120, alignItems: "center", justifyContent: "center" }}>
                                    <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                </View>
                                : null
                        }
                        <ServicesList navigation={navigation} route={route} />
                    </View>
                    <AddServiceModal navigation={navigation} route={route} />
                </ScrollView>
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        {
                            addServicesR.loading
                                ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                : <CommonButton title='Continue' onPress={skipBtnTap} />
                        }
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    mainBody: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        color: AppColors.WHITE,
        flex: 1,
        alignItems: 'center',
    },
    servicesListRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});

export default AddServicesScreen;