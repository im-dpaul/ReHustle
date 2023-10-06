import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CommonDivider from '../../../components/divider/CommonDivider'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import AppColors from '../../../constants/AppColors'
import MenuOptions from '../../../constants/MenuOptions'
import HomeAppBar from '../components/HomeAppBar'
import { AppDispatch, useAppDispatch } from '../../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { } from './../redux/insightsSlice'

const InsightsScreen = (): JSX.Element => {
    const insightsStore = useSelector((state: any) => state.insights);
    const dispatch = useDispatch<AppDispatch>()

    console.log('Insights store: ', insightsStore);

    useEffect(() => {

    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <View style={{ height: 74 }}>
                <HomeAppBar
                    title={MenuOptions.INSIGHTS} />
                <CommonDivider />
            </View>
            <View style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>

            </View>
        </SafeAreaView>
    )
}

export default InsightsScreen

const styles = StyleSheet.create({})