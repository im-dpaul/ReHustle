import { StyleSheet, View } from "react-native";
import CustomTextInput from "../../../components/textInput/CustomTextInput";
import RemoveButton from "../../../components/buttons/RemoveButton";
import { useSelector, useDispatch } from 'react-redux';
import { addCustomLink, removeCustomLink } from '../redux/aboutYouSlice';
import CommonButton from "../../../components/buttons/CommonButton";

function AddCustomLinkList(): JSX.Element {
    const dispatch = useDispatch();
    const aboutYou = useSelector((state: any) => state.aboutYou);

    const addLinkTitle = (id: number, title: string) => {
    }
    const addLinkUrl = (id: number, url: string) => {
    }

    const onRemoveLink = (link: { ID: any; LINK_TITLE: string; LINK_URL: string; }) => {
        dispatch(removeCustomLink(link));
    }

    const onAddLink = () => {
        dispatch(addCustomLink(""));
    }

    return (
        <View>
            {
                aboutYou.customLinks.length
                    ? aboutYou.customLinks.map((link: { ID: any, LINK_TITLE: string, LINK_URL: string, }) =>
                        <View key={link.ID}>
                            <View style={styles.customLink}>
                                <View style={{ flex: 1 }}>
                                    <CustomTextInput
                                        onChangeText={(title) => { addLinkTitle(link.ID, title) }}
                                        placeholder='Link Title'
                                    />
                                    <View style={{ height: 8 }}></View>
                                    <CustomTextInput
                                        onChangeText={(url) => { addLinkUrl(link.ID, url) }}
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
            <View style={{ height: 8 }}></View>
            <CommonButton title='+ Add Link' height={40} active={false} onPress={onAddLink} />
        </View>
    )
};

const styles = StyleSheet.create({
    customLink: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default AddCustomLinkList;