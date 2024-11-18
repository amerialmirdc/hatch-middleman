import axios from 'axios'

export default async function handler(req, res) {
    const token = req.headers['authorization']
    const data = req.body

    const config = {
        headers: {
            "Authorization": token
        }
    }

    if(token){
        return await new Promise((resolve, reject) => {
            axios.post('https://ras-backend.ap.ngrok.io/api/hatch-readings', data, config)
            .then(response => {
                // console.log('data', response.data)
              res.status(200).json({ data: response.data });
              resolve();
            })
            .catch(err => {
                // console.log(err)
              res.status(500).json({
                  message: "not authorized!"
              })  
              resolve();
            });
          });
    }else{
        return res.status(403).json({message: 'Unauthorized access'})
    }
}