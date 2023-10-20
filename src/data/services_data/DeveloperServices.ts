import { ServicesDataType } from "../constants/ServiceType";

export const DeveloperServices: ServicesDataType[] = [
    {
        "title": "Code Review",
        "description": "30 min session to review your code live and resolve bugs",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-coffee.jpeg",
        "paymentMode": "paid",
        "service": {
            "scheduleType": "video_call",
            "duration": "45",
            "serviceType": "call"
        },
        "isActive": true,
        "price": {
            "amount": 300,
            "currency": "INR"
        }
    },
    {
        "title": "Mentoring Session on JS",
        "description": "1-on-1 Mentoring session where you can ask me anything related to JS",
        "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-coffee-banner.jpeg",
        "paymentMode": "paid",
        "service": {
            "scheduleType": "video_call",
            "duration": "60",
            "serviceType": "call"
        },
        "isActive": true,
        "price": {
            "amount": 300,
            "currency": "INR"
        }
    },
    {
        "title": "Pair Programming Session",
        "description": "Pick 1 or 2 problems and solve on the live call via programming",
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