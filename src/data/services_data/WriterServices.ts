import { ServicesDataType } from "../constants/ServiceType";

export const WriterServices: ServicesDataType[] = [
    {
        "title": "Virtual Coffeee",
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
            "amount": 100,
            "currency": "INR"
        }
    },
    {
        "title": "Free Workshop",
        "description": "A workshop on how to get started with Creative writing and its various styles",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-coffee.jpeg",
        "paymentMode": "free",
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
        "title": "Creative Writing Workshop",
        "description": "A workshop on how to get started with Creative writing and its various styles",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-call-banner.jpeg",
        "paymentMode": "paid",
        "service": {
            "date": "2021-07-05 15:00",
            "duration": "45",
            "serviceType": "event",
            "url": "https://zoom.us/j/dummmy"
        },
        "isActive": true,
        "price": {
            "amount": 500,
            "currency": "INR"
        }
    }
]