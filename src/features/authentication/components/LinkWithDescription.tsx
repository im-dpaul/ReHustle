import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function LinkWithDescription(): JSX.Element {
    return (
        <View>
            <Text style={styles.link}>Links</Text>
            <View style={{ height: 8 }}></View>
            <Text style={styles.description}>Add link to your profile to point potential customers to different online resources — like a website or blogpost.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    link: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    description: {
        color: AppColors.GRAY2,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    }
});

export default LinkWithDescription;