import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name, email, phone, from, to } = req.body

  let data = JSON.stringify({
    "customer": {
      "phone": phone ?? "",
      "manager": name ?? "",
      ...(!!email ? { "email": email } : {} ),
    },
    "order": {
      "source_name": "api",
      "comment": `Из ${from ?? "?"} в ${to ?? "?"}`
    },
    "cargo": [
      {
        "CargoType": "-"
      }
    ]
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://logistic.fastsol.ru/Services/ApiV2/2047/orders/set',
    headers: { 
      'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Mobile Safari/537.36', 
      'Token': '0f5ce6a53a6ebbfed610ba7426c4b051_L9bjqIw72z', 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios.request(config)
  .then((response) => {
    return res.json({
      message: response,
    })
  })
  .catch((error) => {
    return res.json({
      message: error,
    })
  });

}
