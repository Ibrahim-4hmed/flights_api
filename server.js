import http from 'node:http'
import {getDataFromDB} from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js';



const PORT = process.env.PORT || 3000;

const server = http.createServer( async (req,res) => {
    const flightsData = await getDataFromDB();
    

    if (req.url === '/api' && req.method === 'GET') {
        sendJSONResponse(res,200,flightsData)
    } else {
        sendJSONResponse(res,404,
        {error: "not found", message: "The requested route does not exist"})
    }
})

server.listen(PORT, () => console.log(`server runing on port ${PORT}`))

