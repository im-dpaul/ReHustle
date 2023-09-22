import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../constants/AppColors";
import FontFamily from "../../constants/FontFamily";

function ReHustleTitle(): JSX.Element {
    return (
        <View>
            <Text style={styles.titleText}>
                ReHustle
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
        color: AppColors.PRIMARY_COLOR,
        fontFamily: FontFamily.GILROY_BLACK,
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default ReHustleTitle;