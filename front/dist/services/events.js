const setupEvents = () => {
    const eventbus = document.createElement('div')
    eventbus.id = 'eventbus'
    document.body.appendChild(eventbus)
    return document.querySelector('#eventbus')
}

export default setupEvents()
