import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RadioButton } from '../../../assets/images'
import { AppColors } from '../../constants'

type CommonRadioButtonProps = {
    selected: boolean
}

const CommonRadioButton = (props: CommonRadioButtonProps): React.JSX.Element => {
    return (
        <View>
            {
                props.selected
                    ? <RadioButton style={styles.selectedButton} />
                    : <View style={styles.unselectedButton}></View>
            }
        </View>
    )
}

export default CommonRadioButton

const styles = StyleSheet.create({
    selectedButton: {
        maxHeight: 20,
        maxWidth: 20,
    },
    unselectedButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: AppColors.GRAY1
    }
})