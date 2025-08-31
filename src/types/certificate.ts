// types/certificate.ts
export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    image: string;
    link?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
