import { StyleSheet, Text, View } from "react-native";
import RemoveButton from "../../../components/buttons/RemoveButton";
import { useSelector, useDispatch } from 'react-redux';
import { ProfileState, removeSocialProfile, updateSocialProfile } from "../redux/profileSlice";
import { SocialProfileDataType } from "../../../data/constants/AllSocialProfileType";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";
import TextInputWithIcon from "../../../components/textInput/TextInputWithIcon";
import { AppleMusicIcon, BehanceIcon, DribbleIcon, EmailIcon, FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, ProductHuntIcon, SnapchatIcon, SpotifyIcon, TiktokIcon, TwitterIcon, WebsiteIcon, YoutubeIcon } from "../../../../assets/images";

function SocialProfilesLinksList(): JSX.Element {
    const dispatch = useDispatch();
    const profile: ProfileState = useSelector((state: any) => state.profile);

    const onRemove = (socialMedia: SocialProfileDataType) => {
        if (profile.socialProfileIDs.includes(socialMedia.title)) {
            dispatch(removeSocialProfile(socialMedia.title));
        }
    }

    const getIcon = (key: string) => {
        switch (key) {
            case 'website':
                return <WebsiteIcon style={styles.prefixIconStyle} />
            case 'twitter':
                return <TwitterIcon style={styles.prefixIconStyle} />
            case 'linkedin':
                return <LinkedinIcon style={styles.prefixIconStyle} />
            case 'instagram':
                return <InstagramIcon style={styles.prefixIconStyle} />
            case 'facebook':
                return <FacebookIcon style={styles.prefixIconStyle} />
            case 'twitter':
                return <TwitterIcon style={styles.prefixIconStyle} />
            case 'youtube':
                return <YoutubeIcon style={styles.prefixIconStyle} />
            case 'snapchat':
                return <SnapchatIcon style={styles.prefixIconStyle} />
            case 'spotify':
                return <SpotifyIcon style={styles.prefixIconStyle} />
            case 'applemusic':
                return <AppleMusicIcon style={styles.prefixIconStyle} />
            case 'tiktok':
                return <TiktokIcon style={styles.prefixIconStyle} />
            case 'dribble':
                return <DribbleIcon style={styles.prefixIconStyle} />
            case 'behance':
                return <BehanceIcon style={styles.prefixIconStyle} />
            case 'github':
                return <GithubIcon style={styles.prefixIconStyle} />
            case 'producthunt':
                return <ProductHuntIcon style={styles.prefixIconStyle} />
            case 'email':
                return <EmailIcon style={styles.prefixIconStyle} />
            default:
                return <WebsiteIcon style={styles.prefixIconStyle} />
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
                                <View style={{ flex: 1 }}>
                                    <TextInputWithIcon
                                        placeholder={socialProfile.placeholder}
                                        value={socialProfile.link}
                                        prefixIcon={
                                            <View>
                                                {
                                                    getIcon(socialProfile.title)
                                                }
                                            </View>
                                        }
                                        onChangeText={(url) => onChangeUrl(url, socialProfile)}
                                    />
                                </View>
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
    },
    prefixIconStyle: {
        maxHeight: 28,
        maxWidth: 28
    }
});

export default SocialProfilesLinksList;