import express from 'express'

const router = express.Router()

const whitePixel = 'R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=';

const getPixelResponse = (res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-type', 'image/gif');
    res.end(Buffer.from(whitePixel, 'base64'))
}

const getMaxCookieAge = () => 60 * 60 * 24 * 36 * 100

const cookieName = 'testCookie'

router.get('/auth',(req,res,next)=>{
    if(!req.cookie[cookieName]){
        req.cookie(cookieName,'test',{
            maxAge: getMaxAge(),
            httpOnly: false,
            domain: 'localhost',
            secure: true,
            sameSite: 'none'
        })
    }

    getPixelResponse(res)
})

router.get('/test',(req,res,next)=>{
    if(!req.cookies[cookieName]){

    }
    getPixelResponse(res)
})

export default router