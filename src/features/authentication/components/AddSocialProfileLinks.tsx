import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";
import SocialMediaItemName from "./SocialMediaItemName";
import SocialMediaType from "../../../data/constants/SocialMediaType";
import { useState } from "react";

function AddSocialProfile(props: { onValueSelected: (selectedValues: number[]) => void }): JSX.Element {
    let selectedSocialMedia: number[] = [];
    const [socialMediaId, setSocialMediaId] = useState<number[]>([]);
    const [socialMedia, setSocialMedia] = useState<number[]>([]);

    const onSelection = (id: number) => {
        // const allIds = socialMediaId;
        // if (allIds.includes(id)) {
        //     let ids = socialMediaId;
        //     let newids: number[] = [];
        //     ids.forEach((i) => {
        //         if (i != id) {
        //             newids.push(i);
        //         }
        //     })
        // }
        // else {
        //     let ids = socialMediaId;
        //     ids.push(id);
        //     // setSocialMediaId(ids)
        // }
        if (selectedSocialMedia.length == 0) {
            selectedSocialMedia.push(id);
        }
        else if (selectedSocialMedia.includes(id)) {
            selectedSocialMedia = selectedSocialMedia.filter((old) => old != id);
        }
        else {
            selectedSocialMedia.push(id);
        }
        props.onValueSelected(selectedSocialMedia);
    }

    return (
        <View>
            <Text style={styles.addSocialProfile}>Add Social profile links</Text>
            <View style={{ height: 16 }}></View>
            <View style={styles.socialMediaList}>
                {
                    SocialMediaType.map((socialMedia) =>
                        <SocialMediaItemName
                            key={socialMedia.ID}
                            name={socialMedia.NAME}
                            id={socialMedia.ID}
                            onPress={(id) => { onSelection(id) }}
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