import axios from 'axios'

export default function handler(req, res) {
    const token = req.headers['authorization']
    console.log('TOKEN', token)
    console.log('Request', req.body.data)
    // console.log('Response', res)
    return res.status(200).json({ token });
}