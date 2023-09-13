import type { User } from "./user";

export interface UserProvider {
    getUser(user_id: string): Promise<User>;
    createUser(user: User): Promise<void>;
    parseUserData(token: Record<string, any>): User;
}