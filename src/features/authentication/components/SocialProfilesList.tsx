import { StyleSheet, View } from "react-native";
import RemoveButton from "../../../components/buttons/RemoveButton";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "../../../../assets/images";
import SocialMediaType from "../../../data/constants/SocialMediaType";
import { useSelector, useDispatch } from 'react-redux';
import { removeSocialProfile, updateSocialProfile } from '../redux/aboutYouSlice';
import TextInputWithIcon from "../../../components/textInput/TextInputWithIcon";

function SocialProfilesList(): JSX.Element {
    const dispatch = useDispatch();
    const aboutYou = useSelector((state: any) => state.aboutYou);

    const onSelection = (socialMedia: { ID: number; title: string; link: string; }) => {
        if (aboutYou.socialProfileIDs.includes(socialMedia.ID)) {
            dispatch(removeSocialProfile(socialMedia));
        }
    }

    const onChangeUrl = (value: string, socialMedia: { ID: number; title: string; link: string; }) => {
        let socialUrl = {};
        socialUrl = {
            ID: socialMedia.ID,
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
        aboutYou.socialProfiles.forEach((element: { ID: number; title: string; link: string; }) => {
            if (element.ID == id) {
                url = element.link;
            }
        });
        return url;
    }

    return (
        <View>
            {
                (isActive(SocialMediaType[0].ID))
                    ? <View>
                        <View style={styles.socialLinkAndRemove}>
                            <View style={{ flex: 1 }}>
                                <TextInputWithIcon
                                    placeholder='https://www.facebook.com/'
                                    value={linkUrl(SocialMediaType[0].ID)}
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
                (isActive(SocialMediaType[1].ID))
                    ? <View>
                        <View style={styles.socialLinkAndRemove}>
                            <View style={{ flex: 1 }}>
                                <TextInputWithIcon
                                    placeholder='https://www.instagram.com/'
                                    value={linkUrl(SocialMediaType[1].ID)}
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
                (isActive(SocialMediaType[2].ID))
                    ? <View>
                        <View style={styles.socialLinkAndRemove}>
                            <View style={{ flex: 1 }}>
                                <TextInputWithIcon
                                    placeholder='https://twitter.com/'
                                    value={linkUrl(SocialMediaType[2].ID)}
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
                (isActive(SocialMediaType[3].ID))
                    ? <View>
                        <View style={styles.socialLinkAndRemove}>
                            <View style={{ flex: 1 }}>
                                <TextInputWithIcon
                                    placeholder='https://www.linkedin.com/'
                                    value={linkUrl(SocialMediaType[3].ID)}
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
                (isActive(SocialMediaType[4].ID))
                    ? <View>
                        <View style={styles.socialLinkAndRemove}>
                            <View style={{ flex: 1 }}>
                                <TextInputWithIcon
                                    placeholder='https://www.youtube.com/'
                                    value={linkUrl(SocialMediaType[4].ID)}
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
    }
});

export default SocialProfilesList;