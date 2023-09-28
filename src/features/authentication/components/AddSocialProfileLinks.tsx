import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";
import SocialMediaType from "../../../data/constants/SocialMediaType";
import CommonChip from "../../../components/chip/CommonChip";
import { useSelector, useDispatch } from 'react-redux';
import { addSocialProfile, removeSocialProfile } from '../redux/aboutYouSlice';

function AddSocialProfile(): JSX.Element {
    const dispatch = useDispatch();
    const aboutYou = useSelector((state: any) => state.aboutYou);

    const onSelection = (socialMedia: { ID: number; title: string; link: string }) => {
        if (aboutYou.socialProfileIDs.includes(socialMedia.ID)) {
            dispatch(removeSocialProfile(socialMedia));
        }
        else {
            dispatch(addSocialProfile(socialMedia));
        }
    }

    const isActive = (id: number) => {
        let active = false;
        aboutYou.socialProfileIDs.forEach((e: number) => {
            if (e == id) {
                active = true;
            }
        });
        return active;
    }

    return (
        <View>
            <Text style={styles.addSocialProfile}>Add Social profile links</Text>
            <View style={{ height: 16 }}></View>
            <View style={styles.socialMediaList}>
                {
                    SocialMediaType.map((socialMedia) =>
                        <CommonChip
                            key={socialMedia.ID}
                            name={socialMedia.title}
                            id={socialMedia.ID}
                            active={isActive(socialMedia.ID)}
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
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    socialMediaList: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});

export default AddSocialProfile;