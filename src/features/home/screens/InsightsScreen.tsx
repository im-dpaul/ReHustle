import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CommonDivider from '../../../components/divider/CommonDivider'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import AppColors from '../../../constants/AppColors'
import MenuOptions from '../../../constants/MenuOptions'
import HomeAppBar from '../components/HomeAppBar'
import { AppDispatch } from '../../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { getInsightsData } from './../redux/insightsSlice'
import FontFamily from '../../../constants/FontFamily'
import ItemTile from '../components/ItemTile'

const InsightsScreen = (): JSX.Element => {
    const insightsStore = useSelector((state: any) => state.insights);
    const dispatch = useDispatch<AppDispatch>()

    // console.log('Insights store: ', insightsStore);

    useEffect(() => {
        dispatch(getInsightsData())
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
                {
                    insightsStore.loading
                        ? <View style={styles.loadingScreen}>
                            <ActivityIndicator size={48} color={AppColors.PRIMARY_COLOR} />
                        </View>
                        : <ScrollView>
                            <View style={styles.main}>
                                <Text style={styles.heading}>Stats</Text>
                                <View style={{ height: 16 }}></View>
                                <View style={styles.itemsRow}>
                                    <View style={styles.itemCard}>
                                        <View style={styles.itemBox}>
                                            <Text style={styles.itemValueText}>{insightsStore.profileViews}</Text>
                                            <Text style={styles.itemTitleText}>Profile Views</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: 16 }}></View>
                                    <View style={styles.itemCard}>
                                        <View style={styles.itemBox}>
                                            <Text style={styles.itemValueText}>0</Text>
                                            <Text style={styles.itemTitleText}>Active Services</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: 16 }}></View>
                                    <View style={styles.itemCard}>
                                        <View style={styles.itemBox}>
                                            <Text style={styles.itemValueText}>0</Text>
                                            <Text style={styles.itemTitleText}>Sales</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ height: 16 }}></View>
                                <View style={styles.itemsRow}>
                                    <View style={styles.itemCard}>
                                        <View style={styles.itemBox}>
                                            <Text style={[styles.itemValueText, { color: AppColors.GREEN2 }]}>₹{insightsStore.weeklySales}</Text>
                                            <Text style={styles.itemTitleText}>This Week</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: 16 }}></View>
                                    <View style={styles.itemCard}>
                                        <View style={styles.itemBox}>
                                            <Text style={[styles.itemValueText, { color: AppColors.GREEN2 }]}>₹{insightsStore.monthlySales}</Text>
                                            <Text style={styles.itemTitleText}>This Month</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: 16 }}></View>
                                    <View style={styles.itemCard}>
                                        <View style={styles.itemBox}>
                                            <Text style={[styles.itemValueText, { color: AppColors.GREEN2 }]}>₹0</Text>
                                            <Text style={styles.itemTitleText}>All Time</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ height: 24 }}></View>
                                {
                                    insightsStore.productWiseSales.length != 0
                                        ? <View>
                                            <Text style={styles.heading}>Services</Text>
                                            <View style={{ height: 16 }}></View>
                                            <FlatList
                                                data={insightsStore.productWiseSales}
                                                scrollEnabled={false}
                                                style={styles.servicesCard}
                                                renderItem={
                                                    (product) =>
                                                        <ItemTile product={product.item} />
                                                }
                                                ItemSeparatorComponent={
                                                    () =>
                                                        <View>
                                                            <CommonDivider
                                                                backgroundColor={AppColors.GRAY4}
                                                            />
                                                        </View>
                                                }
                                            />
                                        </View>
                                        : null
                                }
                                <View style={{ height: 16 }}></View>
                            </View>
                        </ScrollView>

                }
            </View>
        </SafeAreaView>
    )
}

export default InsightsScreen

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    main: {
        margin: 24
    },
    heading: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    itemsRow: {
        flexDirection: 'row'
    },
    itemCard: {
        borderColor: AppColors.GRAY4,
        borderWidth: 1,
        borderRadius: 8,
        height: 100,
        flex: 1,
    },
    itemBox: {
        margin: 16,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    itemTitleText: {
        color: AppColors.GRAY2,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center'
    },
    itemValueText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center'
    },
    servicesCard: {
        borderColor: AppColors.GRAY4,
        borderWidth: 1,
        borderRadius: 8
    },
})