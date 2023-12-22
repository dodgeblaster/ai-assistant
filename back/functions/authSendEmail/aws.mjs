import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
    PutCommand,
    GetCommand,
    DynamoDBDocumentClient,
    DeleteCommand
} from '@aws-sdk/lib-dynamodb'

const dbClient = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(dbClient)
const client = new SESv2Client({})

/**
 * Send Email Functions
 */
export async function sendEmail({ to, from, subject, body }) {
    const command = new SendEmailCommand({
        Destination: {
            ToAddresses: [to]
        },
        Content: {
            Simple: {
                Body: {
                    Html: {
                        Data: body
                    }
                },
                Subject: {
                    Data: subject
                }
            }
        },
        FromEmailAddress: from
    })
    return await client.send(command)
}

/**
 * Personal Info DB Functions
 */
export async function personalInfoGet(x) {
    try {
        const command = new GetCommand({
            TableName: process.env.PERSONALINFOTABLE,
            Key: x
        })

        const res = await docClient.send(command)
        return res.Item ? res.Item.id : false
    } catch (e) {
        return false
    }
}

export async function personalInfoSet(x) {
    const command = new PutCommand({
        TableName: process.env.PERSONALINFOTABLE,
        Item: x
    })

    return await docClient.send(command)
}

/**
 *  App DB Functions
 */
export async function set(x) {
    const command = new PutCommand({
        TableName: process.env.TABLE,
        Item: x
    })

    return await docClient.send(command)
}
