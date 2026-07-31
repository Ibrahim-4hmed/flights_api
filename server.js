import http from 'node:http'
import {getDataEn} from './utils/getData.js'
import { getDataAr } from './utils/getData.js';
import { sendJSONResponse } from './utils/sendJSONResponse.js';
import { getDataByPathParams } from './utils/getDataByPathParams.js';
import { getDataByPathParamsAr } from './utils/getDataByPathParams.js';
import { getDataByQueryParams } from './utils/getDataByQueryParams.js';
import path from 'node:path';
import fs from 'node:fs/promises'
import { url } from 'node:inspector';



const PORT = process.env.PORT || 3000;

const server = http.createServer( async (req,res) => {
    const flightsDataEn = await getDataEn()
    const flightsDataAr = await getDataAr()

    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const querysObj = Object.fromEntries(urlObj.searchParams)


    if ((req.url === '/api' || req.url === '/api/ar' ) 
        && req.method === 'GET') { // Sending Full Data
        const flightsData = urlObj.pathname.startsWith("/api/ar")
            ? flightsDataAr
            : flightsDataEn;
        sendJSONResponse(res,200,'application/json',flightsData)
    }  
     else if ((urlObj.pathname.startsWith("/api/airline") // Filter data By airline using Paths
        || urlObj.pathname.startsWith("/api/airline/ar"))
        && req.method === 'GET') {
        const airline = decodeURIComponent(urlObj.pathname.split("/").pop().trim());
        const data = urlObj.pathname.startsWith("/api/airline/ar")
            ? flightsDataAr
            : flightsDataEn;

        const filteredData = getDataByPathParams(data, airline);
        sendJSONResponse(res, 200, "application/json", filteredData);
    }
    else if ((urlObj.pathname === "/flights" 
        || urlObj.pathname === "/flights/ar") 
        && req.method === 'GET') { // Filter data By From and To country using Queries
        const data = urlObj.pathname === "/flights/ar"
            ? flightsDataAr
            : flightsDataEn;

        const filteredData = getDataByQueryParams(data, querysObj);
        sendJSONResponse(res, 200, "application/json", filteredData);
    }
    else { // Not Found Route
        sendJSONResponse(res,404,'application/json',
        {error: "not found", message: "The requested route does not exist"})
    }
})

server.listen(PORT, () => console.log(`server runing on port ${PORT}`))

