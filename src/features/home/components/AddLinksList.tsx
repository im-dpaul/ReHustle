import { StyleSheet, Text, View } from "react-native";
import RemoveButton from "../../../components/buttons/RemoveButton";
import { useSelector, useDispatch } from 'react-redux';
import CommonButton from "../../../components/buttons/CommonButton";
import TextInputWithIcon from "../../../components/textInput/TextInputWithIcon";
import { ProfileState, CustomProfileType, addCustomProfile, removeCustomProfile, updateCustomProfile } from "../redux/profileSlice";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function AddLinksList(): JSX.Element {
    const dispatch = useDispatch();
    const profile: ProfileState = useSelector((state: any) => state.profile);

    const updateProfileTitle = (profile: CustomProfileType, title: string) => {
        let customProfile = {
            id: profile.id,
            title: title,
            url: profile.url
        };
        dispatch(updateCustomProfile(customProfile));
    }

    const updateProfileUrl = (profile: CustomProfileType, url: string) => {
        let customProfile = {
            id: profile.id,
            title: profile.title,
            url: url
        };
        dispatch(updateCustomProfile(customProfile));
    }

    const onRemoveProfile = (profile: CustomProfileType) => {
        dispatch(removeCustomProfile(profile));
    }

    const onAddProfile = () => {
        dispatch(addCustomProfile());
    }

    return (
        <View>
            {
                profile.customProfiles.length
                    ? profile.customProfiles.map((customProfile: CustomProfileType) =>
                        <View key={customProfile.id}>
                            <View style={styles.customLink}>
                                <View style={{ flex: 1 }}>
                                    <TextInputWithIcon
                                        value={customProfile.title}
                                        onChangeText={(title) => { updateProfileTitle(customProfile, title) }}
                                        placeholder='Link Title'
                                    />
                                    <View style={{ height: 8 }}></View>
                                    <TextInputWithIcon
                                        value={customProfile.url}
                                        onChangeText={(url) => { updateProfileUrl(customProfile, url) }}
                                        placeholder='https://'
                                    />
                                </View>
                                <View style={{ width: 14 }}></View>
                                <RemoveButton onPress={() => onRemoveProfile(customProfile)} />
                            </View>
                            <View style={{ height: 16 }}></View>
                        </View>
                    )
                    : null
            }
            <View style={{ height: 8 }}></View>
            <CommonButton title='+ Add Link' height={40} active={false} onPress={onAddProfile} />
            {
                (profile.error.customLinkEmptyError != '')
                    ? <View style={{ marginTop: 4 }}>
                        <Text style={styles.error}>{profile.error.customLinkEmptyError}</Text>
                    </View>
                    : null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    customLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    },
});

export default AddLinksList;