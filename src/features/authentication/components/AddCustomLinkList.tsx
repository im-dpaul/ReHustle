import { StyleSheet, Text, View } from "react-native";
import RemoveButton from "../../../components/buttons/RemoveButton";
import { useSelector, useDispatch } from 'react-redux';
import { addCustomLink, removeCustomLink, updateCustomLink, AboutYouState, CustomProfileType } from '../redux/aboutYouSlice';
import CommonButton from "../../../components/buttons/CommonButton";
import TextInputWithIcon from "../../../components/textInput/TextInputWithIcon";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function AddCustomLinkList(): JSX.Element {
    const dispatch = useDispatch();
    const aboutYou: AboutYouState = useSelector((state: any) => state.aboutYou);

    const addLinkTitle = (link: CustomProfileType, title: string) => {
        let customUrl = {
            id: link.id,
            title: title,
            url: link.url
        };
        dispatch(updateCustomLink(customUrl));
    }

    const addLinkUrl = (link: CustomProfileType, url: string) => {
        let customUrl = {
            id: link.id,
            title: link.title,
            url: url
        };
        dispatch(updateCustomLink(customUrl));
    }

    const onRemoveLink = (link: CustomProfileType) => {
        dispatch(removeCustomLink(link));
    }

    const onAddLink = () => {
        dispatch(addCustomLink());
    }

    return (
        <View>
            {
                aboutYou.customLinks.length
                    ? aboutYou.customLinks.map((link: CustomProfileType) =>
                        <View key={link.id}>
                            <View style={styles.customLink}>
                                <View style={{ flex: 1 }}>
                                    <TextInputWithIcon
                                        value={link.title}
                                        onChangeText={(title) => { addLinkTitle(link, title) }}
                                        placeholder='Link Title'
                                    />
                                    <View style={{ height: 8 }}></View>
                                    <TextInputWithIcon
                                        value={link.url}
                                        onChangeText={(url) => { addLinkUrl(link, url) }}
                                        placeholder='https://'
                                    />
                                </View>
                                <View style={{ width: 14 }}></View>
                                <RemoveButton onPress={() => onRemoveLink(link)} />
                            </View>
                            <View style={{ height: 16 }}></View>
                        </View>
                    )
                    : null
            }
            {
                (aboutYou.error.customLinkEmptyError != '')
                    ? <View style={{ marginTop: 4 }}>
                        <Text style={styles.error}>{aboutYou.error.customLinkEmptyError}</Text>
                    </View>
                    : null
            }
            <View style={{ height: 8 }}></View>
            <CommonButton title='+ Add Link' height={40} active={false} onPress={onAddLink} />
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

export default AddCustomLinkList;