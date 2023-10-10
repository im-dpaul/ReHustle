import { StyleSheet, Text, View } from "react-native";
import CustomTextInput from "../../../components/textInput/CustomTextInput";
import RemoveButton from "../../../components/buttons/RemoveButton";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../../../../assets/images";
import { useSelector, useDispatch } from 'react-redux';
import { ProfileState, removeSocialProfile, updateSocialProfile } from "../redux/profileSlice";
import AllSocialProfileType, { SocialProfileDataType } from "../../../data/constants/AllSocialProfileType";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function SocialProfilesLinksList(): JSX.Element {
    const dispatch = useDispatch();
    const profile: ProfileState = useSelector((state: any) => state.profile);

    const onRemove = (socialMedia: SocialProfileDataType) => {
        if (profile.socialProfileIDs.includes(socialMedia.title)) {
            dispatch(removeSocialProfile(socialMedia.title));
        }
    }

    const onChangeUrl = (value: string, socialMedia: SocialProfileDataType) => {
        let socialUrl = {};
        socialUrl = {
            title: socialMedia.title,
            link: value,
            placeholder: socialMedia.placeholder,
        };
        dispatch(updateSocialProfile(socialUrl));
    }

    return (
        <View>
            {
                profile.socialProfiles.map((socialProfile) =>
                    <View key={socialProfile.title}>
                        <View>
                            <View style={styles.socialLinkAndRemove}>
                                <CustomTextInput
                                    onChangeText={(url) => onChangeUrl(url, socialProfile)}
                                    placeholder={socialProfile.placeholder}
                                    initialValue={socialProfile.link}
                                    prefixIcon={FacebookIcon}
                                />
                                <View style={{ width: 14 }}></View>
                                <RemoveButton onPress={() => onRemove(socialProfile)} />
                            </View>
                            <View style={{ height: 8 }}></View>
                        </View>
                    </View>
                )
            }
            {
                (profile.error.profileLinkEmptyError != '')
                    ? <View style={{ marginTop: 4 }}>
                        <Text style={styles.error}>{profile.error.profileLinkEmptyError}</Text>
                    </View>
                    : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    socialLinkAndRemove: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    }
});

export default SocialProfilesLinksList;