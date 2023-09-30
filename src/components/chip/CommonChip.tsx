import { Pressable, StyleSheet, Text, View } from "react-native";
import AppColors from "../../constants/AppColors";
import FontFamily from "../../constants/FontFamily";

function CommonChip(props: { name: string, active?: boolean, id?: number, onPress?: ((id: number) => void) }): JSX.Element {

    return (
        <View>
            <Pressable onPress={() => { props.onPress ? props.onPress(props.id ? props.id : 0) : null }}>
                <View style={[styles.container, props.active ? { backgroundColor: AppColors.PRIMARY_COLOR } : {}]}>
                    <Text style={[styles.title, props.active ? { color: AppColors.WHITE } : {}]}>
                        {props.name}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        borderColor: AppColors.PRIMARY_COLOR,
        borderWidth: 2,
        marginRight: 8,
        marginBottom: 8
    },
    title: {
        color: AppColors.PRIMARY_COLOR,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
    }
});

export default CommonChip;