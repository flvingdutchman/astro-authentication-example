export interface Cookie {
    name: string;
    value: string;
    options: {
        httpOnly: boolean;
        path?: string;
        sameSite: 'Strict' | 'Lax' | 'None';
        secure: boolean;
        expires?: Date;
        signed?: boolean;
    }
}