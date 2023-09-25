import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar';
import AppColors from '../../../constants/AppColors';
import CommonDivider from '../../../components/divider/CommonDivider';
import HomeAppBar from '../components/HomeAppBar';
import NoServicesPresent from '../components/NoServicesPresent';
import CommonButton from '../../../components/buttons/CommonButton';
import FontFamily from '../../../constants/FontFamily';

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <View style={{ height: 74 }}>
                <HomeAppBar title='Services' subTitle='rehustle.co/imarc36' />
                <CommonDivider />
            </View>
            <View style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
                <ScrollView >
                    <View style={styles.mainBody}>
                        <View style={styles.servicesRow}>
                            <Text style={styles.servicesText}>Services</Text>
                            <View style={{ width: 126 }}>
                                <CommonButton title='Add Service' height={32} onPress={() => { }} />

                            </View>
                        </View>
                        <View style={{ height: 160 }}></View>
                        <NoServicesPresent />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainBody: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        flex: 1,
        backgroundColor: AppColors.WHITE
    },
    servicesText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    servicesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default HomeScreen;
