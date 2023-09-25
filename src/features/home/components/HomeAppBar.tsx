import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MenuIcon, User } from "../../../../assets/images";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";
import CommonButton from "../../../components/buttons/CommonButton";

function HomeAppBar(props: { title: string, subTitle: string, copyButtonTap?: (() => void), menuButtonTap?: (() => void) }): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Image style={styles.image} source={User} />
            </View>
            <View style={{ width: 8 }}></View>
            <View>
                <Text style={styles.title}>{props.title}</Text>
                <View style={{ height: 4 }}></View>
                <Text style={styles.subTitle}>{props.subTitle}</Text>
            </View>
            <View style={{ marginLeft: 'auto', marginRight: 16, width: 80 }}>
                <CommonButton title="Copy Link" height={32} active={false} onPress={() => { props.copyButtonTap ? props.copyButtonTap() : null }} />
            </View>
            <TouchableOpacity onPress={() => { props.menuButtonTap ? props.menuButtonTap() : null }}>
                <Image style={styles.menuIcon} source={MenuIcon} />
            </TouchableOpacity>

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
    avatar: {
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
    titleRow: {
        flex: 1,
        flexDirection: "row",
    },
    title: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    subTitle: {
        color: AppColors.GRAY2,
        fontFamily: FontFamily.GILROY_REGULAR,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    menuIcon: {
        height: 24,
        width: 24
    }
});

export default HomeAppBar;