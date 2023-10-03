import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ArrowLeft } from '../../../../assets/images'
import CommonButton from '../../../components/buttons/CommonButton'
import AppColors from '../../../constants/AppColors'
import FontFamily from '../../../constants/FontFamily'

const CreateServiceAppBar = (props: { title: string, onCreate: () => void, onBackPress: () => void }) => {

    return (
        <View>
            <View style={styles.header}>
                <Pressable onPress={() => props.onBackPress()}>
                    <Image style={styles.backButton} source={ArrowLeft} />
                </Pressable>
                <View style={{ width: 16 }}></View>
                <Text style={styles.headerTitleText}>{props.title}</Text>
                <View style={{ marginLeft: 'auto' }}></View>
                <View style={{ width: 94 }}>
                    <CommonButton title='Create Now' height={32} onPress={() => props.onCreate()} />
                </View>
            </View>
        </View>
    )
}

export default CreateServiceAppBar

const styles = StyleSheet.create({
    header: {
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        height: 24,
        width: 24
    },
    headerTitleText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 18,
        fontWeight: '400',
        fontStyle: 'normal'
    }
})