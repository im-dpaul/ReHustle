import { ArtistServices } from "../services_data/ArtistServices";
import { CoachServices } from "../services_data/CoachServices";
import { DesignerServices } from "../services_data/DesignerServices";
import { DeveloperServices } from "../services_data/DeveloperServices";
import { InfluencerServices } from "../services_data/InfluencerServices";
import { MarketerServices } from "../services_data/MarketerServices";
import { MusicianServices } from "../services_data/MusicianServices";
import { OtherServices } from "../services_data/OtherServices";
import { PersonalTrainerServices } from "../services_data/PersonalTrainerServices";
import { PodcasterServices } from "../services_data/PodcasterServices";
import { TeacherServices } from "../services_data/TeacherServices";
import { WriterServices } from "../services_data/WriterServices";

const ServiceType = [
    {
        ID: 1,
        ROLE: 'Artist',
        SERVICES: ArtistServices,
    },
    {
        ID: 2,
        ROLE: 'Musician',
        SERVICES: MusicianServices,
    },
    {
        ID: 3,
        ROLE: 'Writer',
        SERVICES: WriterServices
    },
    {
        ID: 4,
        ROLE: 'Podcaster',
        SERVICES: PodcasterServices
    },
    {
        ID: 5,
        ROLE: 'Developer',
        SERVICES: DeveloperServices
    },
    {
        ID: 6,
        ROLE: 'Designer',
        SERVICES: DesignerServices
    },
    {
        ID: 7,
        ROLE: 'Coach',
        SERVICES: CoachServices
    },
    {
        ID: 8,
        ROLE: 'Influencer',
        SERVICES: InfluencerServices
    },
    {
        ID: 9,
        ROLE: 'Marketer',
        SERVICES: MarketerServices
    },
    {
        ID: 10,
        ROLE: 'Personal Trainer',
        SERVICES: PersonalTrainerServices
    },
    {
        ID: 11,
        ROLE: 'Teacher',
        SERVICES: TeacherServices
    },
    {
        ID: 12,
        ROLE: 'Other',
        SERVICES: OtherServices
    }
];

export default { ServiceType };