const express = require('express')
const app = express()
const cors = require('cors')
const request = require('request');
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const CLIENT_ID = '75faf3f1102f897b2ad9bb7dc0d937ca'
const CLIENT_SECRET = '7f565e103475669dfad16e0229683aa21ff05bbbc81e788e483f62218b62e265'


app.post('/execute' , async (req,res) =>{
  const code = req.body.code;
  const input = req.body.input;
  const language = req.body.language;
  console.log("Code: " + code)
  console.log("Input: " + input)
  console.log("Language: " + language) 

  const program = {
    script : code,
    language: language,
    stdin: input,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  };

  try{
    request({
      url: 'https://api.jdoodle.com/v1/execute',
      method: "POST",
      json: program
    },
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body)
    })
  }
  catch(e){
      console.log(e)
  }
})




const port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log(`Server started at port ${port}`)
})