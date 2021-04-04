let socket = new WebSocket("ws://localhost:3434/test")
socket.onopen = function (e) {
    socket.send(JSON.stringify({
        aaa: 5,
        bbb: 6
    }))
}

socket.onmessage = function (event) {
    console.log(`[message][test] Данные получены с сервера: ${event.data}`)
}


let socket2 = new WebSocket("ws://localhost:3434/hear")
socket2.onopen = function (e) {
    socket2.send(JSON.stringify({
        aaa: 7,
        bbb: 8
    }))
}

socket2.onmessage = function (event) {
    console.log(`[message][hear] Данные получены с сервера: ${event.data}`)
}