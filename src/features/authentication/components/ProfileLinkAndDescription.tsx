import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function ProfileLinkAndDescription(props: { linkUrl: string }): JSX.Element {
    return (
        <View style={{ alignItems: "center" }}>
            <Text style={styles.linkUrl}>{props.linkUrl}</Text>
            <View style={{ height: 16 }}></View>
            <Text style={styles.linkDescription}>Your profile link is live now. Share the link and start getting paid for your services.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    linkUrl: {
        color: AppColors.PRIMARY_COLOR,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    linkDescription: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: "center"
    },
});

export default ProfileLinkAndDescription;