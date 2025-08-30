import type { AboutSection, Achievement, CurrentActivity, TimelineItem } from "../types/about";

export const aboutSections: AboutSection[] = [
    { id: "profile", title: "Profile" },
    { id: "now", title: "Now" },
    { id: "achievements", title: "Achievements" },
    { id: "timeline", title: "Timeline" },
];

export const profileData = {
    name: "John Doe",
    title: "Product Designer & Creative Developer",
    image: "https://i.pinimg.com/736x/52/93/5e/52935e8bc7560e59b983058b9baedc6c.jpg",
    skills: ["UI/UX Design", "Frontend Development", "Design Systems"],
    bio: [
        "Hi, I'm a passionate product designer with over 5 years of experience creating digital experiences that users love. I specialize in user-centered design, design systems, and bridging the gap between design and development.",
        "When I'm not designing, you can find me exploring new design trends, contributing to open-source projects, or sharing knowledge with the design community.",
    ],
};

export const currentWork: CurrentActivity[] = [
    { color: "green", activity: "Leading design for a fintech startup's mobile app redesign" },
    { color: "blue", activity: "Building a comprehensive design system for B2B products" },
    { color: "purple", activity: "Mentoring junior designers in the community" },
];

export const currentLearning: CurrentActivity[] = [
    { color: "orange", activity: "Exploring AI-powered design tools and workflows" },
    { color: "pink", activity: "Learning advanced React and TypeScript" },
    { color: "teal", activity: "Writing about design and development" },
];

export const achievements: Achievement[] = [
    {
        year: "2024",
        title: "Design System Excellence Award",
        description: "Recognized for creating a comprehensive design system that improved team efficiency by 40%",
    },
    {
        year: "2023",
        title: "Product Launch Success",
        description: "Led the design for 3 successful product launches with 95% user satisfaction rate",
    },
    {
        year: "2022",
        title: "Team Leadership",
        description: "Built and managed a design team of 5 designers across multiple products",
    },
];

export const timeline: TimelineItem[] = [
    {
        period: "2022 - Present",
        role: "Senior Product Designer",
        company: "Tech Startup Inc.",
        description: "Leading design for multiple products, building design systems, and mentoring junior designers.",
    },
    {
        period: "2020 - 2022",
        role: "Product Designer",
        company: "Digital Agency Co.",
        description: "Designed user experiences for B2B and B2C products across various industries.",
    },
    {
        period: "2019 - 2020",
        role: "UI/UX Designer",
        company: "Creative Studio",
        description: "Focused on mobile app design and user research for early-stage startups.",
    },
    {
        period: "2018 - 2019",
        role: "Junior Designer",
        company: "Design House",
        description: "Started my design career working on web design and basic user interface projects.",
    },
];
