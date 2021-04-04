import { from } from "rxjs"
import { connect } from 'amqplib'

const rUrl = 'amqp://localhost:5672'
const name = 'test1'

async function start() {
    try {
        let r = await connect(rUrl)
        let k = await r.createChannel()

        k.assertQueue(name, { durable: false })
        k.sendToQueue(name, Buffer.from('testtesttest'))
    } catch(e) {
        console.log(e)
    }   
}

async function end() {
    try {
        let r = await connect(rUrl)
        let k = await r.createChannel()

        k.assertQueue(name, { durable: false })
        await k.consume(name, v => {console.log(v.content.toString())}, { noAck: true })
    } catch(e) {
        console.log(e)
    }  
}

// start()
end()
