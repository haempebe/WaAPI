const express = require('express')
const app = express()
const port = 3000
const router = require("./routers/wa")
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use("/", router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})