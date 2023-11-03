export type MessagingServicePlatformType = {
    name?: string,
    placeholder?: string,
    title: string,
    link: string,
}

export const MessagingServicePlatforms: MessagingServicePlatformType[] = [
    {
        name: 'SMS',
        title: "sms",
        placeholder: '+1 (650) 123-4567',
        link: "",
    },
    {
        name: 'Email',
        title: "email",
        placeholder: 'Email address',
        link: "",
    },
    {
        name: 'Messenger',
        title: "messenger",
        placeholder: 'm.me/username',
        link: "",
    },
    {
        name: 'WhatsApp',
        title: "whatsapp",
        placeholder: 'chat.whatsapp/code',
        link: "",
    },
    {
        name: 'Signal',
        title: "signal",
        placeholder: 'signal.group/code',
        link: "",
    },
    {
        name: 'Telegram',
        title: "telegram",
        placeholder: 't.me/',
        link: "",
    },
    {
        name: 'Other',
        title: "others",
        placeholder: 'Other',
        link: "",
    },
];