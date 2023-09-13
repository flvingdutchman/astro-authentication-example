import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

import type { Session } from "../session";

export class DynamoDBSessionProvider {
    private client: DynamoDBClient;
    private table_name: string = 'Sessions';

    constructor() {
        this.client = new DynamoDBClient({ region: process.env.AWS_REGION });
    }

    async createSession(session: Session): Promise<void> {
        const command = new PutCommand({
            TableName: this.table_name,
            Item: {
                session_id: session.session_id,
                user_id: session.user_id,
                token: session.token,
                expires: session.expires
            }
        });

        const result = await this.client.send(command);

        if (result.$metadata.httpStatusCode !== 200) throw new Error(`Failed to create session for user ${session.user_id}`);
    }
}