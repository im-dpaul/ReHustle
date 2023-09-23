import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import CommonButton from '../../components/buttons/CommonButton';
import CommonStatusBar from '../../components/layouts/CommonStatusBar';
import CommonDivider from '../../components/divider/CommonDivider';
import HeaderStepper from './components/HeaderStepper';
import AppColors from '../../constants/AppColors';
import AddSocialProfile from './components/AddSocialProfileLinks';
import NameInput from './components/NameInput';
import LinkWithDescription from './components/LinkWithDescription';
import RemoveButton from '../../components/buttons/RemoveButton';
import CustomTextInput from '../../components/textInput/CustomTextInput';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../../../assets/images';
import SocialMediaType from '../../data/constants/SocialMediaType';

function AboutYouScreen(): JSX.Element {
    let selectedSocialMedia: number[] = [];
    let selectedSocialMediaIds: number[] = [];
    const [linkCount, setLinkCount] = useState(1);
    const [socialMediaId, setSocialMediaId] = useState<number[]>([]);
    const [linkObjList, setLinkObjList] = useState<{ TITLE: string; URL: string; }[]>([{ TITLE: "", URL: "" }]);

    let linkObj = { TITLE: "", URL: "", }
    let linkObjLis: { TITLE: string; URL: string; }[] = []

    const onChangeNameField = (value: string) => { }

    const onContinueTap = () => { }

    const onValueSelected = (selectedSocials: number[]) => {
        selectedSocialMedia = selectedSocials;
        console.log("all main page value", selectedSocialMedia.join('-'));
        // setSocialMediaId(selectedSocialMedia);
    }

    // useEffect(() => {
    //     selectedSocialMediaIds = selectedSocialMedia;
    // }, [selectedSocialMedia]);

    const onAddLink = () => {
        linkObjLis.push(linkObj);
        setLinkObjList(linkObjLis);
    }

    const addLinkTitle = (index: number, title: string) => {
        linkObjLis[index].TITLE = title;
        setLinkObjList(linkObjLis);
    }
    const addLinkUrl = (index: number, url: string) => {
        linkObjLis[index].URL = url;
        setLinkObjList(linkObjLis);
    }

    const onRemoveLink = (index: number) => {
        linkObjLis.splice(index, 1);
        setLinkObjList(linkObjLis);
    }

    const onRemove = (id: number) => { }

    const skipBtnTap = () => {

    }

    return (
        <View style={{ flex: 1 }}>
            <CommonStatusBar />
            <View style={{ flex: 1 }}>
                <View style={{ height: 72 }}>
                    <HeaderStepper title='About you' step={2} skipButton={true} skipBtnTap={skipBtnTap} />
                    <CommonDivider />
                </View>
                <ScrollView>
                    <View style={[styles.mainBody,]}>
                        <NameInput onNameChange={((value) => onChangeNameField(value))} />
                        <View style={{ height: 24 }}></View>
                        <AddSocialProfile onValueSelected={onValueSelected} />
                        <View style={{ height: 16 }}></View>
                        {
                            (true || selectedSocialMediaIds.includes(SocialMediaType[0].ID))
                                ? <View>
                                    <View style={styles.socialLinkAndRemove}>
                                        <CustomTextInput
                                            onChangeText={(val) => { }}
                                            placeholder='https://www.facebook.com/'
                                            initialValue='https://www.facebook.com/'
                                            prefixIcon={FacebookIcon}
                                        />
                                        <View style={{ width: 14 }}></View>
                                        <RemoveButton onPress={() => onRemove(SocialMediaType[0].ID)} />
                                    </View>
                                    <View style={{ height: 8 }}></View>
                                </View>
                                : null
                        }
                        {
                            (true || selectedSocialMediaIds.includes(SocialMediaType[1].ID))
                                ? <View>
                                    <View style={styles.socialLinkAndRemove}>
                                        <CustomTextInput
                                            onChangeText={(val) => { }}
                                            placeholder='https://www.instagram.com/'
                                            initialValue='https://www.instagram.com/'
                                            prefixIcon={InstagramIcon}
                                        />
                                        <View style={{ width: 14 }}></View>
                                        <RemoveButton onPress={() => onRemove(SocialMediaType[1].ID)} />
                                    </View>
                                    <View style={{ height: 8 }}></View>
                                </View>
                                : null
                        }
                        {
                            (true || selectedSocialMediaIds.includes(SocialMediaType[2].ID))
                                ? <View>
                                    <View style={styles.socialLinkAndRemove}>
                                        <CustomTextInput
                                            onChangeText={(val) => { }}
                                            placeholder='https://twitter.com/'
                                            initialValue='https://twitter.com/'
                                            prefixIcon={TwitterIcon}
                                        />
                                        <View style={{ width: 14 }}></View>
                                        <RemoveButton onPress={() => onRemove(SocialMediaType[2].ID)} />
                                    </View>
                                    <View style={{ height: 8 }}></View>
                                </View>
                                : null
                        }
                        {
                            (true || selectedSocialMediaIds.includes(SocialMediaType[3].ID))
                                ? <View>
                                    <View style={styles.socialLinkAndRemove}>
                                        <CustomTextInput
                                            onChangeText={(val) => { }}
                                            placeholder='https://www.linkedin.com/'
                                            initialValue='https://www.linkedin.com/'
                                            prefixIcon={TwitterIcon}
                                        />
                                        <View style={{ width: 14 }}></View>
                                        <RemoveButton onPress={() => onRemove(SocialMediaType[3].ID)} />
                                    </View>
                                    <View style={{ height: 8 }}></View>
                                </View>
                                : null
                        }
                        {
                            (true || selectedSocialMediaIds.includes(SocialMediaType[4].ID))
                                ? <View>
                                    <View style={styles.socialLinkAndRemove}>
                                        <CustomTextInput
                                            onChangeText={(val) => { }}
                                            placeholder='https://www.youtube.com/'
                                            initialValue='https://www.youtube.com/'
                                            prefixIcon={TwitterIcon}
                                        />
                                        <View style={{ width: 14 }}></View>
                                        <RemoveButton onPress={() => onRemove(SocialMediaType[4].ID)} />
                                    </View>
                                    <View style={{ height: 8 }}></View>
                                </View>
                                : null
                        }

                        <View style={{ height: 24 }}></View>
                        <LinkWithDescription />
                        <View style={{ height: 24 }}></View>
                        {
                            linkObjList.length
                                ? linkObjList.map((item) => <View style={styles.customLink}>
                                    <View style={{ flex: 1 }}>
                                        <CustomTextInput
                                            onChangeText={(val) => { addLinkTitle(1, val) }}
                                            placeholder='Link Title'
                                        />
                                        <View style={{ height: 8 }}></View>
                                        <CustomTextInput
                                            onChangeText={(val) => { addLinkUrl(1, val) }}
                                            placeholder='https://'
                                        />
                                    </View>
                                    <View style={{ width: 14 }}></View>
                                    <RemoveButton onPress={() => onRemoveLink(1)} />
                                </View>)
                                : null
                        }
                        <View style={styles.customLink}>
                            <View style={{ flex: 1 }}>
                                <CustomTextInput
                                    onChangeText={(val) => { addLinkTitle(1, val) }}
                                    placeholder='Link Title'
                                />
                                <View style={{ height: 8 }}></View>
                                <CustomTextInput
                                    onChangeText={(val) => { addLinkUrl(1, val) }}
                                    placeholder='https://'
                                />
                            </View>
                            <View style={{ width: 14 }}></View>
                            <RemoveButton onPress={() => onRemoveLink(1)} />
                        </View>
                        <View style={{ height: 24 }}></View>
                        <CommonButton title='+ Add Link' height={40} active={false} onPress={onAddLink} />

                    </View>
                </ScrollView>
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        <CommonButton title='Continue' onPress={onContinueTap} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainBody: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        flex: 1,
        color: AppColors.WHITE
    },
    socialLinkAndRemove: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    customLink: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default AboutYouScreen;
