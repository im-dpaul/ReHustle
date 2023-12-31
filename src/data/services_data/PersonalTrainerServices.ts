import { ServicesDataType } from "../constants/ServiceType";

export const PersonalTrainerServices: ServicesDataType[] = [
    {
        "title": "Virtual Training",
        "description": "30 min training on any of the chosen workout and tips to master it",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-coffee.jpeg",
        "paymentMode": "paid",
        "service": {
            "date": "2021-07-05 15:00",
            "duration": "30",
            "serviceType": "event",
            "url": "https://zoom.us/j/dummmy"
        },
        "isActive": true,
        "price": {
            "amount": 300,
            "currency": "INR"
        }
    },
    {
        "title": "Diet Planning",
        "description": "Personal Diet plan to reduce or increase weight",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-call-banner.jpeg",
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
    }
]