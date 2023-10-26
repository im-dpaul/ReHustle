import { StyleSheet, View } from 'react-native'
import React from 'react'
import { CalenderHalf, StarHalf } from '../../../../assets/images'

const EventBannerImage = (): React.JSX.Element => {
    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <CalenderHalf style={{ maxHeight: 134, maxWidth: 216 }} />
                <StarHalf style={{ maxHeight: 42, maxWidth: 66, position: 'absolute' }} />
            </View>
        </View>
    )
}

export default EventBannerImage

const styles = StyleSheet.create({})