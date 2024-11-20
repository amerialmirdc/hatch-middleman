import axios from 'axios'

export default async function handler(req, res) {
  return await new Promise((resolve, reject) => {
    axios.get('https://ras-backend.ap.ngrok.io/api/hatch-readings', {})
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
}