import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";
import CommonChip from "../../../components/chip/CommonChip";
import { useSelector, useDispatch } from 'react-redux';
import AllSocialProfileType, { SocialProfileDataType } from "../../../data/constants/AllSocialProfileType";
import { ProfileState, addSocialProfile, removeSocialProfile } from "../redux/profileSlice";

function SocialProfileLinks(): JSX.Element {
    const dispatch = useDispatch();
    const profile: ProfileState = useSelector((state: any) => state.profile);

    const onSelection = (socialMedia: SocialProfileDataType) => {
        if (profile.socialProfileIDs.includes(socialMedia.title)) {
            // dispatch(removeSocialProfile(socialMedia.ID));
        }
        else {
            dispatch(addSocialProfile(socialMedia));
        }
    }

    const isActive = (title: string) => {
        let active = false;
        if (profile.socialProfileIDs.includes(title)) {
            active = true
        }
        return active;
    }

    return (
        <View>
            <Text style={styles.addSocialProfile}>Add Social profile links</Text>
            <View style={{ height: 16 }}></View>
            <View style={styles.socialMediaList}>
                {
                    AllSocialProfileType.map((socialMedia) =>
                        <CommonChip
                            key={socialMedia.title}
                            name={socialMedia.placeholder}
                            id={socialMedia.title}
                            active={isActive(socialMedia.title)}
                            onPress={() => onSelection(socialMedia)}
                        />
                    )
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    addSocialProfile: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    socialMediaList: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});

export default SocialProfileLinks;