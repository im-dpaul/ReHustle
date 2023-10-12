import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function ProfileLinkTitleDescription(): JSX.Element {
    return (
        <View>
            <Text style={styles.link}>Links</Text>
            <View style={{ height: 8 }}></View>
            <Text style={styles.description}>Add external links of your content (Website, Blog, Articles etc) which you want to highlight on your profile.</Text>
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
        color: AppColors.GRAY3,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    }
});

export default ProfileLinkTitleDescription;