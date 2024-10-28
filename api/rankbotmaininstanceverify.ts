import crypto from 'crypto'
import { kv } from '@vercel/kv'
import type { VercelRequest, VercelResponse } from '@vercel/node'
 
export default async function (request: VercelRequest, response: VercelResponse) {
    if (request.method !== "POST"){
        response.status(405).json({ 'message': 'Method not allowed.' })
        return
    }

    if (!request.body.pw){
        response.status(400).json({ 'message': 'Missing data.' })
        return
    }

    const { pw } = request.body

    const hash = crypto.createHash('sha512').update(pw).digest('hex')
    const refHash = await kv.get("RANKBOT_MAIN_HASH") as string
    
    if (crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(refHash, 'hex'))){
        response.status(200).json({ 'message': 'ok' })
        return
    }
    else {
        response.status(401).json({ 'message': 'unauthorized' })
        return
    }
}