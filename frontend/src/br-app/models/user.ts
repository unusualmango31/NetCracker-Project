export interface User {
    _id?: string;
    email: string;
    username: string;
    password: string;
    tags: string[];
    isAdmin: boolean;
}
