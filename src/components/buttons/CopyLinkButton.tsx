import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppColors from "../../constants/AppColors";
import FontFamily from "../../constants/FontFamily";
import { LinkIcon } from "../../../assets/images";

function CopyLinkButton(props: { onCopyLink: (() => void) }): JSX.Element {
    return (
        <View>
            <TouchableOpacity onPress={() => props.onCopyLink()}>
                <View style={styles.copyLinkBtn}>
                    <LinkIcon style={styles.linkIcon} />
                    <View style={{ width: 8 }}></View>
                    <Text style={styles.copyLinkText}>Copy Link</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    copyLinkBtn: {
        flexDirection: 'row',
        borderRadius: 4,
        borderColor: AppColors.PRIMARY_COLOR,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 8,
        alignItems: 'center'
    },
    linkIcon: {
        maxHeight: 24,
        maxWidth: 24
    },
    copyLinkText: {
        color: AppColors.PRIMARY_COLOR,
        fontFamily: FontFamily.GILROY_SEMIBOLD,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400'
    },
});

export default CopyLinkButton;