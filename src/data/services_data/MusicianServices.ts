import { ServicesDataType } from "../constants/ServiceType";

export const MusicianServices: ServicesDataType[] = [
    {
        "title": "Play a song",
        "description":
            "I will sing a song for you on a video call",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-coffee-banner.jpeg",
        "paymentMode": "paid",
        "service": {
            "scheduleType": "video_call",
            "duration": "15",
            "serviceType": "call"
        },
        "isActive": true,
        "price": {
            "amount": 200,
            "currency": "INR"
        }
    },
    {
        "title": "Electronic Music Workshop",
        "description": "I will show how to produce an electronic music on a Computer",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-coffee.jpeg",
        "paymentMode": "paid",
        "service": {
            "date": "2021-07-05 15:00",
            "duration": "45",
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