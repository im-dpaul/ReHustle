import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonDivider from '../../../components/divider/CommonDivider'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import AppColors from '../../../constants/AppColors'
import MenuOptions from '../../../constants/MenuOptions'
import HomeAppBar from '../components/HomeAppBar'

const SettingsScreen = (): JSX.Element => {

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <View style={{ height: 74 }}>
                <HomeAppBar
                    title={MenuOptions.SETTINGS} />
                <CommonDivider />
            </View>
            <View style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>

            </View>
        </SafeAreaView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({})