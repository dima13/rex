import express from 'express'
import request from 'supertest'
let app = express()
app.get('/', (req, res) => {
    const a: number = 5
    res.json({a})
})

describe('test', () => {
    test("test", async () => {
        let a = await request(app).get('/')
        console.log(a.body.a)
    })
})