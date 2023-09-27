import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { User } from "../../../../assets/images";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";
import { useState } from "react";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageDataTypes from "../../../constants/StorageDataTypes";

function HeaderStepper(props: { title: string, step: number, textSuffixImage?: ImageSourcePropType, skipButton?: boolean, skipBtnTap?: (() => void) }): JSX.Element {

    const [img, setImage] = useState('');

    LocalStorage.GetData(StorageDataTypes.PROFILE_IMAGE).then((image) => {
        if ((image != null) && (image.length != 0)) {
            setImage(image);
        }
    })

    return (
        <View style={styles.container}>
            {
                (img.length == 0)
                    ? <View style={styles.icon}>
                        <Image style={styles.image} source={User} />
                    </View>
                    : <Image style={styles.networkImage} source={{ uri: img }} />
            }
            <View style={{ width: 8 }}></View>
            <View>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{props.title}</Text>
                    <View style={{ width: 10 }}></View>
                    {
                        props.textSuffixImage
                            ? <Image style={styles.image} source={props.textSuffixImage} />
                            : null
                    }
                </View>
                <View style={{ height: 10 }}></View>

                <View style={styles.stepper}>
                    <View style={[styles.progress, { width: (224 * (props.step)) / 4, }]}></View>
                </View>
            </View>
            {
                props.skipButton
                    ? <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => { props.skipBtnTap ? props.skipBtnTap() : null }}>
                        <View style={styles.skipButton}>
                            <Text style={styles.skipText}>Skip</Text>
                        </View>
                    </TouchableOpacity>
                    : null
            }
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
    icon: {
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
    stepper: {
        width: 225,
        height: 4,
        backgroundColor: AppColors.GRAY6,
        borderRadius: 2,
    },
    progress: {
        height: 4,
        backgroundColor: AppColors.GREEN2,
        borderRadius: 2
    },
    skipButton: {
        borderRadius: 4,
        width: 48,
        height: 32,
        backgroundColor: AppColors.GRAY6,
        alignItems: "center",
        justifyContent: "center"
    },
    skipText: {
        color: AppColors.GRAY2,
        fontFamily: FontFamily.GILROY_SEMIBOLD,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    }
});

export default HeaderStepper;