import { ScrollView, StyleSheet, View } from "react-native";
import CommonStatusBar from "../../components/layouts/CommonStatusBar";
import HeaderStepper from "./components/HeaderStepper";
import CommonDivider from "../../components/divider/CommonDivider";
import CommonButton from "../../components/buttons/CommonButton";
import AppColors from "../../constants/AppColors";
import TemplateWithDescription from "./components/TemplateWithDescription";
import AddServicesManually from "./components/AddServicesManually";

function AddServicesScreen(): JSX.Element {
    const onContinueTap = () => { }

    const skipBtnTap = () => { }

    const onAddService = () => { }

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
});

export default AddServicesScreen;