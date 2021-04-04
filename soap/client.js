let soap = require('soap')
let url = 'http://localhost:8001/wsdl?wsdl'
let args = {name: 'value', test: 567890}

soap.createClient(url, function(err, client) {
  client.MyFunction(args, function(err, result) {
      console.log(result)
  })
})