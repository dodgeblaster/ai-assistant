export const STATE = {
    START: 'START',
    SUBMITTING: 'SUBMITTING',
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS'
}

const data = {
    state: STATE.START,
    history: []
}

const proxiedStore = new Proxy(data, {
    set: function (target, property, value) {
        target[property] = value
        app.events.dispatchEvent(new Event(`chatstore.${property}.changed`))
        return true
    }
})

export const store = proxiedStore
