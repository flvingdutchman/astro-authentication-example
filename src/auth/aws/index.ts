import { DynamoDBSessionProvider } from './DynamoDBSessionProvider';
import { DynamoDBUserProvider } from './DynamoDBUserProvider';

export const userProvider = new DynamoDBUserProvider();
export const sessionProvider = new DynamoDBSessionProvider();