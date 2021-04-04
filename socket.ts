import express from 'express'
import eWS from 'express-ws'
const { app, getWss } = eWS(express())
const wait = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms))
const clients = new Set()

app.ws('/test', function (ws, req) {
    clients.add({ channel: 'test', ws })
    ws.on('message', (message) => {
        message = message.toString()
        console.log(message)
    })
    // console.log(getWss().clients)
})
app.ws('/hear', function (ws, req) {
    clients.add({ channel: 'hear', ws })
    ws.on('message', (message) => {
        message = message.toString()
        console.log(message)
    })
})

async function send() {
    while(true) {
        clients.forEach((v: { channel: string, ws: WebSocket }) => {
            try {
                if (v.channel === 'hear') {
                    v.ws.send('olololo - ' + Date.now())
                    console.log(`Отправили в канал ${v.channel}`)
                }
            } catch(e) {
                clients.delete(v)
                console.log('Пользователь удален из списка слушателей')
            }
        })
        await wait(5000)
    }
}

app.listen(3434)
send()
