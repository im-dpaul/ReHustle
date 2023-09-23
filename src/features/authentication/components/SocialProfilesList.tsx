import { StyleSheet, View } from "react-native";
import CustomTextInput from "../../../components/textInput/CustomTextInput";
import RemoveButton from "../../../components/buttons/RemoveButton";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../../../../assets/images";
import SocialMediaType from "../../../data/constants/SocialMediaType";
import { useSelector, useDispatch } from 'react-redux';
import { removeSocialProfile } from '../redux/aboutYouSlice';

function SocialProfilesList(): JSX.Element {
    const dispatch = useDispatch();
    const aboutYou = useSelector((state: any) => state.aboutYou);

    const onSelection = (socialMedia: { ID: number; NAME: string; }) => {
        if (aboutYou.socialProfileIDs.includes(socialMedia.ID)) {
            dispatch(removeSocialProfile(socialMedia));
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
            {
                (isActive(SocialMediaType[0].ID))
                    ? <View>
                        <View style={styles.socialLinkAndRemove}>
                            <CustomTextInput
                                onChangeText={(val) => { }}
                                placeholder='https://www.facebook.com/'
                                initialValue='https://www.facebook.com/'
                                prefixIcon={FacebookIcon}
                            />
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
                            <CustomTextInput
                                onChangeText={(val) => { }}
                                placeholder='https://www.instagram.com/'
                                initialValue='https://www.instagram.com/'
                                prefixIcon={InstagramIcon}
                            />
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
                            <CustomTextInput
                                onChangeText={(val) => { }}
                                placeholder='https://twitter.com/'
                                initialValue='https://twitter.com/'
                                prefixIcon={TwitterIcon}
                            />
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
                            <CustomTextInput
                                onChangeText={(val) => { }}
                                placeholder='https://www.linkedin.com/'
                                initialValue='https://www.linkedin.com/'
                                prefixIcon={TwitterIcon}
                            />
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
                            <CustomTextInput
                                onChangeText={(val) => { }}
                                placeholder='https://www.youtube.com/'
                                initialValue='https://www.youtube.com/'
                                prefixIcon={TwitterIcon}
                            />
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
});

export default SocialProfilesList;