import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors, FontFamily } from '../../../constants'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { CreateEventServiceState, addPlatforms, removePlatforms, setPlatformValue } from '../redux/createEventServiceSlice'
import TextInputWithIcon from '../../../components/textInput/TextInputWithIcon'
import { MessagingServicePlatforms, MessagingServicePlatformType } from '../../../data'
import CommonChip from '../../../components/chip/CommonChip'
import RemoveButton from '../../../components/buttons/RemoveButton'
import { EmailIcon, WebsiteIcon, WhatsappIcon } from '../../../../assets/images'

const AddMessagingDetails = (): React.JSX.Element => {
    const createEventServiceR: CreateEventServiceState = useSelector((state: any) => state.createEventService)
    const dispatch = useDispatch<AppDispatch>()

    const onPlatformSelection = (messagingService: MessagingServicePlatformType) => {
        if (createEventServiceR.platformIdsList.includes(messagingService.title)) {
            // dispatch(removePlatforms(messagingService.title))
        } else {
            dispatch(addPlatforms(messagingService))
        }
    }

    const onRemovePlatform = (messagingService: MessagingServicePlatformType) => {
        dispatch(removePlatforms(messagingService.title))
    }

    const onChangePlatformValue = (value: string, messagingService: MessagingServicePlatformType) => {
        let platform = {};
        platform = {
            name: messagingService.name,
            title: messagingService.title,
            placeholder: messagingService.placeholder,
            link: value
        };
        dispatch(setPlatformValue(platform));
    }

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'sms':
                return <WebsiteIcon style={styles.prefixIconStyle} />
            case 'email':
                return <EmailIcon style={styles.prefixIconStyle} />
            case 'messenger':
                return <WebsiteIcon style={styles.prefixIconStyle} />
            case 'whatsapp':
                return <WhatsappIcon style={styles.prefixIconStyle} />
            case 'signal':
                return <WebsiteIcon style={styles.prefixIconStyle} />
            case 'telegram':
                return <WebsiteIcon style={styles.prefixIconStyle} />
            default:
                return <WebsiteIcon style={styles.prefixIconStyle} />
        }
    }

    const isActive = (title: string) => {
        if (createEventServiceR.platformIdsList.includes(title)) {
            return true
        }
        return false
    }

    const getErrorText = (title: string) => {
        switch (title) {
            case 'sms':
                return createEventServiceR.error.platformLinkError.sms
            case 'email':
                return createEventServiceR.error.platformLinkError.email
            case 'messenger':
                return createEventServiceR.error.platformLinkError.messenger
            case 'whatsapp':
                return createEventServiceR.error.platformLinkError.whatsapp
            case 'signal':
                return createEventServiceR.error.platformLinkError.signal
            case 'telegram':
                return createEventServiceR.error.platformLinkError.telegram
            case 'other':
                return createEventServiceR.error.platformLinkError.other
            default:
                return ''
        }
    }

    return (
        <View>
            <Text style={styles.title}>Platform</Text>
            <View style={{ height: 8 }}></View>
            <View style={styles.platformList}>
                {
                    MessagingServicePlatforms.map((messagingService: MessagingServicePlatformType) =>
                        <View key={messagingService.title}>
                            <CommonChip
                                name={messagingService.name}
                                active={isActive(messagingService.title)}
                                onPress={() => { onPlatformSelection(messagingService) }}
                            />
                        </View>)
                }
            </View>
            {
                (createEventServiceR.platformList.length > 0)
                    ? <View>
                        <View style={{ height: 16 }}></View>
                        <Text style={styles.title}>Links</Text>
                    </View>
                    : null
            }
            <View style={{ height: 8 }}></View>
            {
                createEventServiceR.platformList.map((platform: MessagingServicePlatformType) =>
                    <View key={platform.title}>
                        <TextInputWithIcon
                            placeholder={platform.placeholder}
                            value={platform.link}
                            errorText={getErrorText(platform.title)}
                            onChangeText={(value) => onChangePlatformValue(value, platform)}
                            prefixIcon={
                                <View>
                                    {
                                        getPlatformIcon(platform.title)
                                    }
                                </View>
                            }
                            suffixIcon={<RemoveButton onPress={() => { onRemovePlatform(platform) }} />}
                        />
                        <View style={{ height: 8 }}></View>
                    </View>)
            }
            {
                (createEventServiceR.error.platformLinksError != '')
                    ? <View style={{ marginTop: 4, marginBottom: 4 }}>
                        <Text style={styles.error}>{createEventServiceR.error.platformLinksError}</Text>
                    </View>
                    : null
            }
            <Text style={styles.description}>When someone pays for the offer, your links will be shared with them.</Text>
        </View>
    )
}

export default AddMessagingDetails

const styles = StyleSheet.create({
    title: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    description: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    platformList: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    prefixIconStyle: {
        maxHeight: 28,
        maxWidth: 28
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    },
})