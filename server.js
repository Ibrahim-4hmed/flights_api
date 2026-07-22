import http from 'node:http'
// import {getDataFromDB} from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js';
import path from 'node:path';
import fs from 'node:fs/promises'



const PORT = process.env.PORT || 3000;

const __dirname = import.meta.dirname

const server = http.createServer( async (req,res) => {

const filePath = path.join(__dirname,'data','data.js')


    if (req.url === '/api' && req.method === 'GET') {
        try {
            const flightsData = await  fs.readFile(filePath)
            sendJSONResponse(res,200,flightsData)
        } catch (error) {
            console.log(error)
        }
    } else {
        sendJSONResponse(res,404,
        {error: "not found", message: "The requested route does not exist"})
    }
})

server.listen(PORT, () => console.log(`server runing on port ${PORT}`))

