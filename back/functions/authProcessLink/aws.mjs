import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
    PutCommand,
    GetCommand,
    DynamoDBDocumentClient
} from '@aws-sdk/lib-dynamodb'

const dbClient = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(dbClient)

export async function get(x) {
    try {
        const command = new GetCommand({
            TableName: process.env.TABLE,
            Key: x
        })

        const res = await docClient.send(command)
        return res.Item ? res.Item : false
    } catch (e) {
        return false
    }
}

export async function set(x) {
    const command = new PutCommand({
        TableName: process.env.TABLE,
        Item: x
    })

    return await docClient.send(command)
}
