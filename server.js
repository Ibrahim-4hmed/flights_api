import http from 'node:http'
import {getDataEn} from './utils/getData.js'
import { getDataAr } from './utils/getData.js';
import { sendJSONResponse } from './utils/sendJSONResponse.js';
import { getDataByPathParams } from './utils/getDataByPathParams.js';
import { getDataByPathParamsAr } from './utils/getDataByPathParams.js';
import path from 'node:path';
import fs from 'node:fs/promises'



const PORT = process.env.PORT || 3000;

const server = http.createServer( async (req,res) => {
    const flightsDataEn = await getDataEn()
    const flightsDataAr = await getDataAr()



    if (req.url === '/api/en' && req.method === 'GET') {
        // const flightsDataEn = await getDataEn()
        sendJSONResponse(res,200,'application/json',flightsDataEn)
    }  else if (req.url.startsWith('/api/fromcountry/ar') && req.method === 'GET') {
        const fromCountry = decodeURIComponent(req.url.split('/').pop().trim())
        const filteredData = getDataByPathParamsAr(flightsDataAr, 'fromCountry', fromCountry)
        sendJSONResponse(res,200,'application/json',filteredData)
    } else if (req.url.startsWith('/api/tocountry/ar') && req.method === 'GET') {
        const toCountry = decodeURIComponent(req.url.split('/').pop().trim())
        const filteredData = getDataByPathParamsAr(flightsDataAr, 'toCountry', toCountry)
        sendJSONResponse(res,200,'application/json',filteredData)
    }  else if (req.url === '/api/ar' && req.method === 'GET') {
        // const flightsDataAr = await getDataAr()
        sendJSONResponse(res,200,'application/json',flightsDataAr)
    } else if (req.url.startsWith('/api/fromcountry') && req.method === 'GET') {
        const fromCountry = req.url.split('/').pop()
        const filteredData = getDataByPathParams(flightsDataEn, 'fromCountry', fromCountry)
        sendJSONResponse(res,200,'application/json',filteredData)
    } else if (req.url.startsWith('/api/tocountry') && req.method === 'GET') {
        const toCountry = req.url.split('/').pop()
        const filteredData = getDataByPathParams(flightsDataEn, 'toCountry', toCountry)
        sendJSONResponse(res,200,'application/json',filteredData)
    }
     else {
        sendJSONResponse(res,404,'application/json',
        {error: "not found", message: "The requested route does not exist"})
    }
})

server.listen(PORT, () => console.log(`server runing on port ${PORT}`))

