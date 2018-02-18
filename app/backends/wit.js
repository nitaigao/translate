import fs from 'fs'
import request from 'request'
import { Wit } from 'node-wit'

const ACCESS_TOKEN = process.env.WIT_TOKEN

const captureSpeechIntent = (access_token, stream) => {
  return new Promise((resolve) => {
    const request_options = {
      url: 'https://api.wit.ai/speech',
      qs: {},
      method: 'POST',
      json: true,
      headers: {
        'Authorization': 'Bearer ' + ACCESS_TOKEN,
        'Content-Type': "audio/wav"
      }
    }
    stream.pipe(request(request_options, (error, response, body) => {
      if (response && response.statusCode != 200) {
        const error = "Invalid response received from server: " + response.statusCode
        console.error(error)
      }
      resolve(body)
    }))
  })
}

const recognize = (filePath) => {
  const stream = fs.createReadStream(filePath)
  return captureSpeechIntent(ACCESS_TOKEN, stream)
}

export default {
  recognize
}
