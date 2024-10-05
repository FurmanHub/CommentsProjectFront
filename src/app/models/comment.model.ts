export interface Comment {
    id?: number;
    userName: string;
    email: string;
    text: string;
    homePage?: string;
    replies?: Comment[];
}
