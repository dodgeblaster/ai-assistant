import * as ui from './ui.js'
import { store, STATE } from './store.js'
import { ask } from '../../services/api.js'

export default class ChatPage extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        app.events.addEventListener('chatstore.state.changed', () => {
            this.render()
        })

        this.render()
    }

    submitQuestion() {
        store.state = STATE.SUBMITTING
        ask(answers)
            .then((x) => {
                debugger
                store.state = STATE.SUCCESS
            })
            .catch((e) => {
                store.state = STATE.ERROR
            })
    }

    render() {
        if (store.state === STATE.START) {
            this.innerHTML = ui.start()
            ui.get.submitButton().addEventListener('click', () => {
                this.submitAnswers()
            })
        }

        if (store.state === STATE.SUBMITTING) {
            ui.set.submitButtonToSubmitting()
            ui.set.errorMessageToInactive()
        }

        if (store.state === STATE.SUCCESS) {
            ui.set.submitButtonToDefault()
            ui.set.errorMessageToInactive()
        }

        if (store.state === STATE.ERROR) {
            ui.set.submitButtonToDefault()
            ui.set.errorMessageToActive('There was an issue')
        }
    }
}
customElements.define('chat-page', ChatPage)
