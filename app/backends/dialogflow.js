import dialogflow from 'dialogflow'
import fs from 'fs'

const sessionClient = new dialogflow.SessionsClient()

const projectId = 'baxter-dafd4'
const sessionId = '123'

const sessionPath = sessionClient.sessionPath(projectId, sessionId)

const recognize = (filePath) => {
  const inputAudio = fs.readFileSync(filePath)
  return new Promise((resolve) => {
    const request = {
      session: sessionPath,
      queryInput: {
        audioConfig: {
          audioEncoding: 'wav',
          sampleRateHertz: 16000,
          languageCode: 'en-GB',
        },
      },
      inputAudio: inputAudio,
    }
    sessionClient.detectIntent(request)
      .then(responses => {
        console.log(responses[0])
        resolve(responses[0])
      }).catch(err => {
        console.error('ERROR:', err)
      })
  })
}

export default {
  recognize
}
