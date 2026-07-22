import http from 'node:http'
import {getDataEn} from './utils/getData.js'
import { getDataAr } from './utils/getData.js';
import { sendJSONResponse } from './utils/sendJSONResponse.js';
import path from 'node:path';
import fs from 'node:fs/promises'



const PORT = process.env.PORT || 3000;

const server = http.createServer( async (req,res) => {

    if (req.url === '/api/en' && req.method === 'GET') {
            const flightsDataEn = await getDataEn()
            sendJSONResponse(res,200,flightsDataEn)
    } else if (req.url === '/api/ar' && req.method === 'GET') {
            const flightsDataAr = await getDataAr()
            sendJSONResponse(res,200,flightsDataAr)
    } else {
        sendJSONResponse(res,404,
        {error: "not found", message: "The requested route does not exist"})
    }
})

server.listen(PORT, () => console.log(`server runing on port ${PORT}`))

