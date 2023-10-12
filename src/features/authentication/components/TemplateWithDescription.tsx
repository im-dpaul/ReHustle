import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function TemplateWithDescription() {
    return (
        <View>
            <Text style={styles.title}>Start with templates</Text>
            <View style={{ height: 8 }}></View>
            <Text style={styles.description}>Services or Products allow you to make money using Rehustle. Add services and share link to start earning money.</Text>
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
        color: AppColors.GRAY3,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default TemplateWithDescription;