const endpoint = 'https://28uowuqx7l.execute-api.us-east-1.amazonaws.com'

const makeApiCall = async (path, data) =>
    fetch(endpoint + path, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${await window.localStorage.getItem('sessionId')}`
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })

export const ask = async (answers) => {
    const x = await makeApiCall('/ask', {
        answers
    })
    return await x.json()
}
