import { ServicesDataType } from "../constants/ServiceType";

export const PodcasterServices: ServicesDataType[] = [
    {
        "title": "1-1 Virtual Coffee",
        "description": "Choose a slot in my calendar and Ask me anything",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-coffee.jpeg",
        "paymentMode": "paid",
        "service": {
            "date": "2021-07-05 15:00",
            "duration": "15",
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
        "title": "Getting started with Podcast",
        "description": "Workshop on how to get started with your own Podcasts in just 2 hours",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-call-banner.jpeg",
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
    },
    {
        "title": "Podcasts for Publishers",
        "description": "1 hour podcast for publishers who want to start their own podcast",
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
    }
]