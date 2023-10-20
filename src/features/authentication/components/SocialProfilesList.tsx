import { StyleSheet, Text, View } from "react-native";
import RemoveButton from "../../../components/buttons/RemoveButton";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "../../../../assets/images";
import SocialMediaType from "../../../data/constants/SocialMediaType";
import { useSelector, useDispatch } from 'react-redux';
import { removeSocialProfile, updateSocialProfile, AboutYouState } from '../redux/aboutYouSlice';
import TextInputWithIcon from "../../../components/textInput/TextInputWithIcon";
import { SocialMediaDataType } from "../../../data/constants/SocialMediaType";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function SocialProfilesList(): JSX.Element {
    const dispatch = useDispatch();
    const aboutYou: AboutYouState = useSelector((state: any) => state.aboutYou);

    const onSelection = (socialMedia: SocialMediaDataType) => {
        if (aboutYou.socialProfileIDs.includes(socialMedia.id)) {
            dispatch(removeSocialProfile(socialMedia));
        }
    }

    const onChangeUrl = (value: string, socialMedia: SocialMediaDataType) => {
        let socialUrl = {};
        socialUrl = {
            id: socialMedia.id,
            title: socialMedia.title,
            link: value
        };
        dispatch(updateSocialProfile(socialUrl));
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

    const linkUrl = (id: number) => {
        let url = ''
        aboutYou.socialProfiles.forEach((element: { id: number; title: string; link: string; }) => {
            if (element.id == id) {
                url = element.link;
            }
        });
        return url;
    }

    return (
        <View>
            {
                (isActive(SocialMediaType[0].id))
                    ? <View>
                        <View style={styles.socialLinkAndRemove}>
                            <View style={{ flex: 1 }}>
                                <TextInputWithIcon
                                    placeholder='https://www.facebook.com/'
                                    value={linkUrl(SocialMediaType[0].id)}
                                    prefixIcon={
                                        <View>
                                            <FacebookIcon style={styles.prefixIconStyle} />
                                        </View>
                                    }
                                    onChangeText={(fbUrl) => onChangeUrl(fbUrl, SocialMediaType[0])}
                                />
                            </View>
                            <View style={{ width: 14 }}></View>
                            <RemoveButton onPress={() => onSelection(SocialMediaType[0])} />
                        </View>
                        <View style={{ height: 8 }}></View>
                    </View>
                    : null
            }
            {
                (isActive(SocialMediaType[1].id))
                    ? <View>
                        <View style={styles.socialLinkAndRemove}>
                            <View style={{ flex: 1 }}>
                                <TextInputWithIcon
                                    placeholder='https://www.instagram.com/'
                                    value={linkUrl(SocialMediaType[1].id)}
                                    prefixIcon={
                                        <View>
                                            <InstagramIcon style={styles.prefixIconStyle} />
                                        </View>
                                    }
                                    onChangeText={(insta) => onChangeUrl(insta, SocialMediaType[1])}
                                />
                            </View>
                            <View style={{ width: 14 }}></View>
                            <RemoveButton onPress={() => onSelection(SocialMediaType[1])} />
                        </View>
                        <View style={{ height: 8 }}></View>
                    </View>
                    : null
            }
            {
                (isActive(SocialMediaType[2].id))
                    ? <View>
                        <View style={styles.socialLinkAndRemove}>
                            <View style={{ flex: 1 }}>
                                <TextInputWithIcon
                                    placeholder='https://twitter.com/'
                                    value={linkUrl(SocialMediaType[2].id)}
                                    prefixIcon={
                                        <View>
                                            <TwitterIcon style={styles.prefixIconStyle} />
                                        </View>
                                    }
                                    onChangeText={(insta) => onChangeUrl(insta, SocialMediaType[2])}
                                />
                            </View>
                            <View style={{ width: 14 }}></View>
                            <RemoveButton onPress={() => onSelection(SocialMediaType[2])} />
                        </View>
                        <View style={{ height: 8 }}></View>
                    </View>
                    : null
            }
            {
                (isActive(SocialMediaType[3].id))
                    ? <View>
                        <View style={styles.socialLinkAndRemove}>
                            <View style={{ flex: 1 }}>
                                <TextInputWithIcon
                                    placeholder='https://www.linkedin.com/'
                                    value={linkUrl(SocialMediaType[3].id)}
                                    prefixIcon={
                                        <View>
                                            <LinkedinIcon style={styles.prefixIconStyle} />
                                        </View>
                                    }
                                    onChangeText={(insta) => onChangeUrl(insta, SocialMediaType[3])}
                                />
                            </View>
                            <View style={{ width: 14 }}></View>
                            <RemoveButton onPress={() => onSelection(SocialMediaType[3])} />
                        </View>
                        <View style={{ height: 8 }}></View>
                    </View>
                    : null
            }
            {
                (isActive(SocialMediaType[4].id))
                    ? <View>
                        <View style={styles.socialLinkAndRemove}>
                            <View style={{ flex: 1 }}>
                                <TextInputWithIcon
                                    placeholder='https://www.youtube.com/'
                                    value={linkUrl(SocialMediaType[4].id)}
                                    prefixIcon={
                                        <View>
                                            <YoutubeIcon style={styles.prefixIconStyle} />
                                        </View>
                                    }
                                    onChangeText={(insta) => onChangeUrl(insta, SocialMediaType[4])}
                                />
                            </View>
                            <View style={{ width: 14 }}></View>
                            <RemoveButton onPress={() => onSelection(SocialMediaType[4])} />
                        </View>
                        <View style={{ height: 8 }}></View>
                    </View>
                    : null
            }
            {
                (aboutYou.error.profileLinkEmptyError != '')
                    ? <View style={{ marginTop: 4 }}>
                        <Text style={styles.error}>{aboutYou.error.profileLinkEmptyError}</Text>
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
    prefixIconStyle: {
        maxHeight: 28,
        maxWidth: 28
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    },
});

export default SocialProfilesList;