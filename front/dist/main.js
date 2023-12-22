import './components/chat.js'
import './pages/chat/index.js'

import router from './services/router.js'
import events from './services/events.js'

window.app = {}
app.router = router
app.events = events

window.addEventListener('DOMContentLoaded', () => {
    app.router.init()
    loadData()
})
