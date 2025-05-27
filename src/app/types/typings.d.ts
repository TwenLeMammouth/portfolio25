import type { IconType } from 'react-icons';

interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string;
}

interface Image {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
}

export type Data = {
    pageInfo: PageInfo;
    experiences: Experience[];
    skills: Skill[];
    projects: Project[];
    socials: Social[];
    locations: Location[];
    trips: Trip[];
  } | null;

export interface PageInfo extends SanityBody {
    _type: "pageInfo";
    address: string;
    backgroundInformation: text;
    email: string;
    role: string;
    heroImageUrl: string;
    name: string;
    phoneNumber: string;
    profilePicUrl: string;
    cvfrUrl: string;
    cvenUrl: string;
}

export interface Skill extends SanityBody {
    _type: "skill";
    imageUrl: string;
    progress: number;
    title: string;
}

export interface Location extends SanityBody {
    _type: "location";
    city: string;
    country: string;
    lat: number;
    isNorthHemisphere: boolean;
    long: number;
    isEastSide: boolean;
}

export interface Experience extends SanityBody {
    _type: "experience";
    company: string;
    companyImageUrl: string;
    dateStarted: date;
    dateEnded: date;
    isCurrentlyWorkingHere: boolean;
    jobTitle: string;
    experienceSummary: string;
    points: string[];
    technologies: Skill[];
    location: Location;
}

export interface Project extends SanityBody {
    title: string;
    _type: "project";
    imageUrl: string;
    linkToBuild: string;
    summary: string;
    technologies: Skill[];
}

export interface Social extends SanityBody {
    _type: "social";
    title: string;
    link: string;
}

export interface Trip extends SanityBody {
    _type: "trip";
    title: string;
    from: Location;
    to: Location;
}

export interface Achievement extends SanityBody {
    _type: "achievement";
    title: string;
    description: string;
    context?: string;
    date?: string; // ISO date string
    notionLink?: string;
    tags?: string[];
    type: string;
    illustrationUrl?: string;
}

export interface Lesson extends SanityBody {
    _type: "lesson";
    context: string;
    error: string;
    lesson: string;
    fix: string;
    tags: string[];
    date: string; // Format ISO
}

export interface SoftSkill extends SanityBody {
    _type: "softSkill";
    title: string;
    description: string;
    level: number;
    icon: string; // On utilisera une string (ex: 'FaEye') pour faire le mapping côté front
    order: number;
}