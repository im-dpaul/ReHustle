import { ScrollView, StyleSheet, View } from "react-native";
import CommonStatusBar from "../../components/layouts/CommonStatusBar";
import HeaderStepper from "./components/HeaderStepper";
import CommonDivider from "../../components/divider/CommonDivider";
import CommonButton from "../../components/buttons/CommonButton";
import AppColors from "../../constants/AppColors";
import TemplateWithDescription from "./components/TemplateWithDescription";
import AddServicesManually from "./components/AddServicesManually";
import ServiceType from "../../data/constants/ServiceType";
import CommonChip from "../../components/chip/CommonChip";
import { useDispatch, useSelector } from "react-redux";
import { addService, removeService } from "../authentication/redux/addServicesSlice";

function AddServicesScreen(): JSX.Element {

    const servicesReducer = useSelector((state: any) => state.addServices);

    const dispatch = useDispatch();

    const onContinueTap = () => { }

    const skipBtnTap = () => { }

    const onAddService = () => { }

    const onServiceSelection = (service: { ID: number; ROLE: string; }) => {
        if (servicesReducer.servicesId.includes(service.ID)) {
            dispatch(removeService(service));
        }
        else {
            dispatch(addService(service));
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

    return (
        <View style={{ flex: 1 }}>
            <CommonStatusBar />
            <View style={{ flex: 1 }}>
                <View style={{ height: 72 }}>
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
                    </View>
                </ScrollView>
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        <CommonButton title='Continue' onPress={onContinueTap} />
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