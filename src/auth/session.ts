export interface Session {
    session_id: string;
    user_id: string;
    expires: Date;
    token: string;
}