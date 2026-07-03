import http from 'node:http'
import {getDataFromDB} from './database/db.js'



const PORT = process.env.PORT || 3000;;

const server = http.createServer( async (req,res) => {
    const flightsData = await getDataFromDB();

    if (req.url === '/api' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.end(JSON.stringify(flightsData))
    } else {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 404
        res.end(JSON.stringify(
            {error: "not found", message: "The requested route does not exist"}
        ))
    }
})

server.listen(PORT, () => console.log(`server runing on port ${PORT}`))

