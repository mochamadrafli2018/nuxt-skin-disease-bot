export default function UserChat(text) {
    const messagesContainer = document.getElementById('messages')
    // create element for user reply
    const userDiv = document.createElement('div')
          userDiv.id = ''
          userDiv.className = 'bg-green-600 border-2 border-white my-1 ml-auto px-3 py-2 max-w-7xl rounded-l-3xl rounded-br-2xl text-white w-min'
          userDiv.innerHTML = `Mengirim`
    // add userDiv to messagesContainer
    messagesContainer.appendChild(userDiv)
    // fake delay to seem 'real'
    setTimeout(() => {
        userDiv.innerHTML = `${text}`
    }, 200)
}