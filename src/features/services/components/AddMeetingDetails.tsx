import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import TimeDurationTextInput from '../../../components/textInput/TimeDurationTextInput'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { CreateEventServiceState, setMeetingDuration, setScheduleType, setCalendlyUrl, setEmail, setVideoCallUrl } from '../redux/createEventServiceSlice'
import { AppColors, FontFamily, ScheduleType } from '../../../constants'
import { CommonRadioButton } from '../../../components'
import CommonDivider from '../../../components/divider/CommonDivider'
import TextInputWithIcon from '../../../components/textInput/TextInputWithIcon'

const AddMeetingDetails = () => {
    const createEventServiceR: CreateEventServiceState = useSelector((state: any) => state.createEventService)
    const dispatch = useDispatch<AppDispatch>();

    const onChangeScheduleType = (scheduleType: string) => {
        if (scheduleType != createEventServiceR.scheduleType) {
            dispatch(setScheduleType(scheduleType))
        }
    }

    const onEmailChange = (email: string) => {
        dispatch(setEmail(email))
    }

    const onVideoCallUrlChange = (url: string) => {
        dispatch(setVideoCallUrl(url))
    }

    const onCalendlyUrlChange = (url: string) => {
        dispatch(setCalendlyUrl(url))
    }

    const onDurationChange = (duration: string) => {
        dispatch(setMeetingDuration(duration))
    }

    return (
        <View>
            <Text style={styles.title}>Scheduling</Text>
            <View style={{ height: 8 }}></View>
            <View style={styles.container}>
                <Pressable onPress={() => onChangeScheduleType(ScheduleType.EMAIL)}>
                    <View style={styles.buttonRow}>
                        <View>
                            <Text style={[styles.title, { fontSize: 14 }]}>Manual</Text>
                            <View style={{ height: 4 }}></View>
                            <Text style={styles.description}>Organise a date and time over email after payment</Text>
                        </View>
                        <CommonRadioButton selected={createEventServiceR.scheduleType == ScheduleType.EMAIL} />
                    </View>
                </Pressable>
                <CommonDivider />
                <Pressable onPress={() => onChangeScheduleType(ScheduleType.VIDEO_CALL)}>
                    <View style={styles.buttonRow}>
                        <View>
                            <Text style={[styles.title, { fontSize: 14 }]}>Video Link Manual/Automatic</Text>
                            <View style={{ height: 4 }}></View>
                            <Text style={styles.description}>Provide video call link after payment</Text>
                        </View>
                        <CommonRadioButton selected={createEventServiceR.scheduleType == ScheduleType.VIDEO_CALL} />
                    </View>
                </Pressable>
                <CommonDivider />
                <Pressable onPress={() => onChangeScheduleType(ScheduleType.CALENDLY)}>
                    <View style={styles.buttonRow}>
                        <View style={{ width: 300 }}>
                            <Text style={[styles.title, { fontSize: 14 }]}>Automatic</Text>
                            <View style={{ height: 4 }}></View>
                            <Text style={styles.description}>Use Calendly or any other calendar manager to let people book annnn availability slot</Text>
                        </View>
                        <CommonRadioButton selected={createEventServiceR.scheduleType == ScheduleType.CALENDLY} />
                    </View>
                </Pressable>
            </View>
            <View style={{ height: 24 }}></View>
            {
                createEventServiceR.scheduleType == ScheduleType.EMAIL
                    ? <View>
                        <Text style={styles.title}>Email address</Text>
                        <View style={{ height: 8 }}></View>
                        <TextInputWithIcon
                            placeholder='name@example.com'
                            value={createEventServiceR.email}
                            errorText={createEventServiceR.error.emailError}
                            onChangeText={(email) => { onEmailChange(email) }}
                        />
                        <View style={{ height: 8 }}></View>
                        <Text style={styles.description}>We’ll send a scheduling email to this address when someone pays.</Text>
                    </View>
                    : createEventServiceR.scheduleType == ScheduleType.VIDEO_CALL
                        ? <View>
                            <Text style={styles.title}>Video link</Text>
                            <View style={{ height: 8 }}></View>
                            <TextInputWithIcon
                                placeholder='Enter the Video Call link'
                                value={createEventServiceR.videoCallUrl}
                                errorText={createEventServiceR.error.videoCallUrlError}
                                onChangeText={(url) => { onVideoCallUrlChange(url) }}
                            />
                            <View style={{ height: 8 }}></View>
                            <Text style={styles.description}>Zoom , Google Meet helps you with video calls without the back-and-forth communication.</Text>
                        </View>
                        : createEventServiceR.scheduleType == ScheduleType.CALENDLY
                            ? <View>
                                <Text style={styles.title}>Calendly link</Text>
                                <View style={{ height: 8 }}></View>
                                <TextInputWithIcon
                                    placeholder='https://calendly.com/yourname/60min'
                                    value={createEventServiceR.calendlyUrl}
                                    errorText={createEventServiceR.error.calendlyUrlError}
                                    onChangeText={(url) => { onCalendlyUrlChange(url) }}
                                />
                                <View style={{ height: 8 }}></View>
                                <Text style={styles.description}>Calendly helps you schedule meetings without the back-and-forth emails.</Text>
                            </View>
                            : null
            }
            <View style={{ height: 24 }}></View>
            <Text style={styles.title}>Duration</Text>
            <View style={{ height: 8 }}></View>
            <TimeDurationTextInput
                placeholder=''
                errorText={createEventServiceR.error.meetingDuration}
                value={createEventServiceR.meetingDuration}
                onChangeText={(duration) => onDurationChange(duration)}
            />
        </View>
    )
}

export default AddMeetingDetails

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
    container: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: AppColors.GRAY6,
    },
    buttonRow: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})