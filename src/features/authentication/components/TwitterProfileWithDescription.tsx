import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function TwitterProfileWithDescription() {
    return (
        <View>
            <Text style={styles.title}>Start with your twitter profile</Text>
            <View style={{ height: 8 }}></View>
            <Text style={styles.description}>Use Basic information from your Twitter to instantly build your page.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    description: {
        color: AppColors.GRAY2,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default TwitterProfileWithDescription;