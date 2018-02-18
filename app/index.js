import redis from "redis"
import fs from 'fs'
import request from 'request'
import { Wit } from 'node-wit'

const client = redis.createClient()

client.subscribe('speech')

const ACCESS_TOKEN = 'UX4X2HZ2UYHRQNOLQMQSRKK3TZK7S7VP'

var captureSpeechIntent = (access_token, stream, options, callback) => {
    if(!callback) {
      callback = options;
      options = undefined;
    }

    var request_options = {
      url: 'https://api.wit.ai/speech',
      qs: {},
      method: 'POST',
      json: true,
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': "audio/wav"
      }
    };

    stream.pipe(request(request_options, (error, response, body) => {
      if (response && response.statusCode != 200) {
        error = "Invalid response received from server: " + response.statusCode
      }
      callback(error, body);
    }));
};

const makeWitSpeechRequest = (filePath) => {
  var stream = fs.createReadStream(filePath)
  captureSpeechIntent(ACCESS_TOKEN, stream, (err, res) => {
    console.log("Response from Wit for audio stream: ")
    if (err) console.log("Error: ", err)
    console.log(JSON.stringify(res, null, " "))
  })
}

client.on("message", (channel, message) => {
  console.log(`Received ${message}`)
  makeWitSpeechRequest(message)
})
