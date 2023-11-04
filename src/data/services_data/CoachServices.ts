import { ServicesDataType } from "../constants/ServiceType";

export const CoachServices: ServicesDataType[] = [
    {
        "title": "1 - 1 Virtual Coffee",
        "description": "Choose a slot in my calendar and Ask me anything",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-coffee.jpeg",
        "paymentMode": "paid",
        "service": {
            "scheduleType": "video_call",
            "duration": "30",
            "serviceType": "call"
        },
        "isActive": true,
        "price": {
            "amount": 300,
            "currency": "INR"
        }
    },
    {
        "title": "Idea Brainstorm",
        "description": "Pick a time from my slots to brainstorm ideas",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-call-banner.jpeg",
        "paymentMode": "free",
        "service": {
            "scheduleType": "video_call",
            "duration": "30",
            "serviceType": "call"
        },
        "isActive": true,
        "price": {
            "amount": 0,
            "currency": "INR"
        }
    }
]