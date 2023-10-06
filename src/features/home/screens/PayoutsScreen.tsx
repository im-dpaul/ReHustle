import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonDivider from '../../../components/divider/CommonDivider'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import AppColors from '../../../constants/AppColors'
import MenuOptions from '../../../constants/MenuOptions'
import HomeAppBar from '../components/HomeAppBar'
import FontFamily from '../../../constants/FontFamily'

const PayoutsScreen = (): JSX.Element => {
    const data = [1, 2, 3, 4, 5, 6]

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <View style={{ height: 74 }}>
                <HomeAppBar
                    title={MenuOptions.PAYOUTS} />
                <CommonDivider />
            </View>
            <View style={styles.container}>
                <View style={{ width: 70, height: 14, borderRadius: 8, backgroundColor: AppColors.GRAY7 }}></View>
                <View style={{ height: 12 }}></View>
                <View style={{ width: 328, height: 12, borderRadius: 8, backgroundColor: AppColors.GRAY7 }}></View>
                <View style={{ height: 4 }}></View>
                <View style={{ width: 272, height: 12, borderRadius: 8, backgroundColor: AppColors.GRAY7 }}></View>
                <View style={{ height: 30 }}></View>
                <View style={styles.main}>
                    <FlatList
                        data={data}
                        numColumns={3}
                        renderItem={(item) =>
                            <View key={item.item} style={styles.box}></View>
                        }
                        ItemSeparatorComponent={() => <View style={{ width: 16, height: 16 }}></View>}
                    />
                    <View style={styles.textBox}>
                        <Text style={styles.text}>Coming</Text>
                        <Text style={styles.text}>soon</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PayoutsScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.WHITE,
        flex: 1,
        marginVertical: 24,
        marginLeft: 24,
        marginRight: 8
    },
    main: {
        justifyContent: 'center',
    },
    box: {
        borderRadius: 4,
        height: 100,
        flex: 1,
        marginRight: 16,
        backgroundColor: AppColors.GRAY8,
    },
    textBox: {
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center'
    },
    text: {
        color: AppColors.GRAY5,
        fontFamily: FontFamily.NUNITO_REGULAR,
        fontSize: 36,
        fontStyle: 'normal',
        fontWeight: '900',
    },
})