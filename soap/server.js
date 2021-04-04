const express = require('express')
const soap = require('soap')

let myService = {
    MyService: {
        MyPort: {
            MyFunction: function (args) {
                console.log(args)
                return {
                    name: args.name,
                    ll: 'ahuli'
                }
            },
        }
    }
}

let xml = require('fs').readFileSync('./soap/myservice.wsdl', 'utf8')

//express server example
let app = express()
app.listen(8001, function () {
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/wsdl', myService, xml)
    console.log('start')
})