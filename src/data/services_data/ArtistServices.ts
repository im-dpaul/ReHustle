import { ServicesDataType } from "../constants/ServiceType";

export const ArtistServices: ServicesDataType[] = [
    {
        "title": "Virtual Coffee",
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
            "amount": 500,
            "currency": "INR"
        }
    },
    {
        "title": "Arts Workshop",
        "description": "Contemporary Visual Arts Writing and Criticism with examples from different cultures",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-coffee-banner.jpeg",
        "paymentMode": "paid",
        "service": {
            "date": "2021-07-05 15:00",
            "duration": "60",
            "serviceType": "event",
            "url": "https://zoom.us/j/dummmy"
        },
        "isActive": true,
        "price": {
            "amount": 300,
            "currency": "INR"
        }
    }
]
