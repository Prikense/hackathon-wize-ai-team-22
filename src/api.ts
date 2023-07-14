import axios from 'axios'

//const axios = require('axios');

export async function getResponse(message: String): Promise<String>{
  let data = JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "user",
        "content": message
      }
    ]
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.openai.com/v1/chat/completions',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer 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'
    },
    data : data
  };
  
  // var resp = 'a';
  return new Promise ((resolve, reject) => {
    axios.request(config)
    .then((response) => {
    console.log(JSON.stringify(response.data['choices'][0]['message']['content']));
    // resp=JSON.stringify(response.data['choices'][0]['message']['content'])
    resolve(JSON.stringify(response.data['choices'][0]['message']['content']));
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });   
  });
}