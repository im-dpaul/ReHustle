export type SocialMediaDataType = {
    id: number,
    title: string,
    link: string,
}

const SocialMediaType: SocialMediaDataType[] = [
    {
        id: 1,
        title: 'Facebook',
        link: 'https://www.facebook.com/'
    },
    {
        id: 2,
        title: 'Instagram',
        link: 'https://www.instagram.com/'
    },
    {
        id: 3,
        title: 'Twitter',
        link: 'https://twitter.com/'
    },
    {
        id: 4,
        title: 'LinkedIn',
        link: 'https://www.linkedin.com/'
    },
    {
        id: 5,
        title: 'Youtube',
        link: 'https://www.youtube.com/'
    },
];

export default SocialMediaType;