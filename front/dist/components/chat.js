class MyChat extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        this.shadowRoot.innerHTML = /* html*/ `
        <style>
            .container {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }

            .chat-window {
                display: flex;
                flex-direction: column;
                /* background: green; */
                flex: 1;
                margin-bottom: 10px;
                justify-content: flex-end;
                overflow-y: scroll;
            }

            .chat-window-scroll {
                overflow-y: scroll;
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }

            .chat-window-scroll::-webkit-scrollbar {
                display: none;
            }

            .chat-input{
                display: flex;
                /* background: red; */
                flex: 0 0 60px;
                padding: 10px;
            }

            .chat-input input {
                border: none;
                border-radius: 10px;
                background: #eaebef;
                width: 100%;
                padding: 10px;
            }

            .chat-name {
                font-size: 14px;
                margin: 0;
                font-weight: bold;
                opacity: 0.9;
                display: flex;
                align-items: center;
                /* margin-bottom: 5px; */
            }

            .message {
                background: #232429;
                padding: 15px 15px;
                border-radius: 5px;
                margin: 10px;
                font-size: 14px;
            }

            .actor-ai {
                margin-right: 40px;
                background-color: #6d68f3;
                color: white;
                
            }

            .actor-me {
                margin-left: 40px;
                background-color: #eaebef;
                color: #31276e;
            }
        </style>
        <div class='container'>
            <div class='chat-window'>
            
            <div class='chat-window-scroll'></div>
            </div>
            <div class='chat-input'>
                <input placeholder='Chat...'/>
            </div>
        </div>
        `
    }

    addMessage(actor, text) {
        const msg = document.createElement('div')

        const aiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style='height: 14px; margin-right: 4px;'>
            <path d="M16.5 7.5h-9v9h9v-9z" />
            <path fill-rule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clip-rule="evenodd" />
        </svg>`

        const meSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style='height: 14px; margin-right: 4px;'>
            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
        </svg>`

        msg.innerHTML = `<p class='chat-name'> 
            ${actor === 'actor-ai' ? aiSvg : meSvg}
            ${actor === 'actor-ai' ? 'BedrockAI' : 'You'}</p>
        <p style='margin: 0'>${text}</p>`
        msg.classList.add('message')
        msg.classList.add(actor)
        this.shadowRoot.querySelector('.chat-window-scroll').appendChild(msg)

        const t = document.createElement('p')
        t.innerHTML = formatTime()
        t.style.fontSize = '12px'
        t.style.opacity = '0.3'
        t.style.marginLeft = actor === 'actor-ai' ? '10px' : '40px'
        t.style.marginTop = '-5px'
        this.shadowRoot.querySelector('.chat-window-scroll').appendChild(t)

        const chatWindow = this.shadowRoot.querySelector('.chat-window-scroll')
        chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight
    }
}

/**
 * Function that takes Date.now() and turns it into format 7.23pm
 */
function formatTime() {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'pm' : 'am'
    const hours12 = hours % 12 || 12
    const minutes12 = minutes < 10 ? `0${minutes}` : minutes
    return `${hours12}:${minutes12}${ampm}`
}

customElements.define('c-chat', MyChat)
