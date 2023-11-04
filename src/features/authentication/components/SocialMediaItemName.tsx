import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";
import { useState } from "react";

function SocialMediaItemName(props: { name: string, id: number, onPress: ((id: number) => void) }): JSX.Element {

    const [active, setActive] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => { setActive(!active), props.onPress(props.id) }}>
                <View style={[styles.socialMediaContainer, active ? { backgroundColor: AppColors.PRIMARY_COLOR } : {}]}>
                    <Text style={[styles.socialMediaName, active ? { color: AppColors.WHITE } : {}]}>
                        {props.name}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    socialMediaContainer: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        borderColor: AppColors.PRIMARY_COLOR,
        borderWidth: 2,
        marginRight: 8,
        marginBottom: 8
    },
    socialMediaName: {
        color: AppColors.PRIMARY_COLOR,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
    }
});

export default SocialMediaItemName;