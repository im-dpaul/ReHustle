import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addService, removeService, skipServices, addNewServices, getAllServices, clearData } from "../../authentication/redux/addServicesSlice";
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

type AddServicesProps = NativeStackScreenProps<RootStackParamList, 'AddServices'>;

function AddServicesScreen({ navigation }: AddServicesProps): JSX.Element {

    const servicesReducer = useSelector((state: any) => state.addServices);

    console.log('Service store', servicesReducer);

    const dispatch = useDispatch<AppDispatch>();

    const onContinueTap = () => { }

    const skipBtnTap = () => {
        dispatch(skipServices());
    }

    const onAddService = () => { }

    const onServiceSelection = (service: { ID: number; ROLE: string; }) => {
        if (servicesReducer.servicesId.includes(service.ID)) {
            // dispatch(removeService(service));
        }
        else {
            dispatch(addService(service));
            ServiceType.ServiceType[service.ID - 1].SERVICES.forEach(async (service, index) => {
                await dispatch(addNewServices(service));
            })
        }
    }

    const isActive = (id: number) => {
        let value = false;
        servicesReducer.servicesId.forEach((element: number) => {
            if (element == id) {
                value = true;
            }
        });
        return value;
    }

    useEffect(() => {
        if (servicesReducer.data != null) {
            if (servicesReducer.data._id != "") {
                navigation.replace('FinishAccountCreation');
                dispatch(clearData({}));
            }
        }
    }, [servicesReducer.data])

    useEffect(() => {
        dispatch(getAllServices());
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
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
                                        onPress={(id) => { onServiceSelection(service) }}
                                    />
                                )
                            }
                        </View>
                        <View style={{ height: 24 }}></View>
                        <AddServicesManually />
                        <View style={{ height: 24 }}></View>
                        <View style={{ width: '100%' }}>
                            <CommonButton title='+ Add Service' height={40} active={false} onPress={onAddService} />
                        </View>
                        <View style={{ height: 24 }}></View>
                        {
                            servicesReducer.screenLoading
                                ? <View style={{ height: 120, alignItems: "center", justifyContent: "center" }}>
                                    <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                </View>
                                : null
                        }
                        <ServicesList />
                    </View>
                </ScrollView>
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        {
                            servicesReducer.loading
                                ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                : <CommonButton title='Continue' onPress={skipBtnTap} />
                        }
                    </View>
                </View>
            </View>
        </View>
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