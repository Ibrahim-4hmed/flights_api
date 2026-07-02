import http from 'node:http'
import data from './database/db'

const flights = data;


const PORT = 2000;

const server = http.createServer((req,res) => {
    res.end("hello form node js file")
})

server.listen(PORT, () => console.log(`server runing on port ${PORT}`))

