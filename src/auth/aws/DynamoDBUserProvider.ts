import { DynamoDBClient  } from "@aws-sdk/client-dynamodb";
import type { User } from "../user";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import type { UserProvider } from "../userProvider";
import type { CognitoIdentityToken } from "./CognitoIdentityToken";

class UserNotFoundException extends Error {}

export class DynamoDBUserProvider implements UserProvider {
    private client: DynamoDBClient;
    private documentClient: DynamoDBDocumentClient;
    private table_name: string = 'Users';

    constructor() {
        this.client = new DynamoDBClient({ region: process.env.AWS_REGION });
        this.documentClient = DynamoDBDocumentClient.from(this.client);
    }

    async getUser(user_id: string): Promise<User> {
        const command = new GetCommand({
            TableName: this.table_name,
            Key: {
                user_id: user_id
            }
        });

        const result = await this.documentClient.send(command);

        if (result.Item === undefined) throw new UserNotFoundException(`User ${user_id} not found`);

        return result.Item as User;
    }

    async createUser(user: User): Promise<void> {
        try {
            await this.getUser(user.user_id);
        } catch (error) {
            if (!(error instanceof UserNotFoundException))
                throw error;
        }

        const command = new PutCommand({
            TableName: this.table_name,
            Item: user
        });

        const result = await this.documentClient.send(command);

        if (result.$metadata.httpStatusCode !== 200) throw new Error(`Failed to create user ${user.user_id}`);
    }

    parseUserData(token: Record<string, any>): User {
        const cognitoToken = token as CognitoIdentityToken;

        return {
            user_id: cognitoToken.sub,
            user_name: cognitoToken['cognito:username']
        };
    }
}