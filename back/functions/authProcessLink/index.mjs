import { get, set } from './aws.mjs'
import crypto from 'crypto'

export const config = {
    url: 'POST /processMagicLink',
    env: {
        TABLE: '{@output.ai-assistant-infra.TableName}'
    },
    permissions: [
        {
            Effect: 'Allow',
            Action: ['dynamodb:GetItem', 'dynamodb:PutItem'],
            Resource: '{@output.ai-assistant-infra.TableArn}'
        }
    ]
}

export const handler = async (e) => {
    const { token } = JSON.parse(e.body)

    /**
     * Confirm link is still valid
     */
    const magicLink = await get({
        pk: 'magiclink_' + token,
        sk: 'meta'
    })

    if (!magicLink) {
        return {
            statusCode: 404,
            body: 'Magic Link not found'
        }
    }

    if (Date.now() > magicLink.expires) {
        return {
            statusCode: 404,
            body: 'Magic Link expired'
        }
    }

    if (magicLink.linkUsed) {
        return {
            statusCode: 200,
            body: 'Magic Link already used'
        }
    }

    /**
     * Create session
     */
    const sessionId = crypto.randomBytes(16).toString('hex')
    await set({
        pk: 'session_' + sessionId,
        sk: 'meta',
        userId: magicLink.userId,
        expires: Date.now() + 1000 * 60 * 60 * 24
    })

    /**
     * Return html
     */
    return {
        statusCode: 200,
        body: JSON.stringify({ sessionId }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTION'
        }
    }
}
