import { Image, StyleSheet, Text, View } from "react-native";
import { User } from "../../../../assets/images";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function HeaderStepper(props: { title: string, step: number }): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Image style={styles.image} source={User} />
            </View>
            <View style={{ width: 8 }}></View>
            <View>
                <Text style={styles.title}>{props.title}</Text>
                <View style={{ height: 10 }}></View>
                <View style={styles.stepper}>
                    <View style={[styles.progress, { width: (225 * (props.step)) / 5, }]}></View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 18,
        flex: 1,
        flexDirection: 'row',
    },
    icon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: AppColors.PRIMARY_COLOR,
        padding: 10,
    },
    image: {
        height: 20,
        width: 20,
    },
    title: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    stepper: {
        width: 225,
        height: 4,
        backgroundColor: AppColors.GRAY6,
        borderRadius: 2,
    },
    progress: {
        height: 4,
        backgroundColor: AppColors.GREEN2,
        borderRadius: 2
    },
});

export default HeaderStepper;