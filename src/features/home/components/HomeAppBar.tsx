import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";
import CommonButton from "../../../components/buttons/CommonButton";
import { useState } from "react";
import StorageDataTypes from "../../../constants/StorageDataTypes";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import { CrossIcon, MenuIconSVG, UserAvatar } from "../../../../assets/images/svg_index";

function HomeAppBar(props: { title: string, appBar: boolean, copyButtonTap?: (() => void), menuButtonTap?: (() => void) }): JSX.Element {

    const [avatar, setAvatar] = useState('');
    const [userName, setUserName] = useState('rehustle.co/');

    LocalStorage.GetData(StorageDataTypes.PROFILE_IMAGE).then((image) => {
        if ((image != null) && (image.length != 0)) {
            setAvatar(image);
        }
    })

    LocalStorage.GetData(StorageDataTypes.USER_NAME).then((userName) => {
        if ((userName != null) && (userName.length != 0)) {
            const uname = `rehustle.co/${userName}`
            setUserName(uname);
        }
    });

    return (
        <View style={styles.container}>
            {
                (avatar.length == 0)
                    ? <UserAvatar style={styles.avatar} />
                    : <Image style={styles.networkImage} source={{ uri: avatar }} />
            }
            <View style={{ width: 8 }}></View>
            <View>
                <Text style={styles.title}>{props.title}</Text>
                <View style={{ height: 4 }}></View>
                <Text style={styles.subTitle}>{userName}</Text>
            </View>
            <View style={{ marginLeft: 'auto', marginRight: 16, width: 80 }}>
                <CommonButton title="Copy Link" height={32} active={false} onPress={() => { props.copyButtonTap ? props.copyButtonTap() : null }} />
            </View>
            <TouchableOpacity onPress={() => { props.menuButtonTap ? props.menuButtonTap() : null }}>
                {
                    props.appBar
                        ? <MenuIconSVG style={styles.menuIcon} />
                        : <CrossIcon style={styles.menuIcon} />
                }
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
        alignItems: "center"
    },
    avatar: {
        height: 40,
        width: 40,
    },
    networkImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
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