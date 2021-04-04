import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'


let schema = buildSchema(`
  type Query {
    hello: String
  }
`)

let root = {
    hello: function() {
        console.log(arguments)
        return 'Hello world!'
    }
}

let app = express()
app.use(express.json())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))

async function testtest({ a = false } = {}) {
  console.log(a)
}

testtest()