const EventBus = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail))
  },
  dispatch(event, payload) {
    document.dispatchEvent(new CustomEvent(event, { detail: payload }))
  },
  remove(event, callback) {
    document.removeEventListener(event, callback)
  }
}

export default EventBus
