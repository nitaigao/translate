// Imports the Dialogflow library
const dialogflow = require('dialogflow');

// Instantiates a sessison client
const sessionClient = new dialogflow.SessionsClient();

// The path to identify the agent that owns the created intent.
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// Read the content of the audio file and send it as part of the request.
const readFile = common.util.promisify(fs.readFile, {singular: true});
readFile(filename)
  .then(inputAudio => {
    // The audio query request
    const request = {
      session: sessionPath,
      queryInput: {
        audioConfig: {
          audioEncoding: encoding,
          sampleRateHertz: sampleRateHertz,
          languageCode: languageCode,
        },
      },
      inputAudio: inputAudio,
    };
    // Recognizes the speech in the audio and detects its intent.
    return sessionClient.detectIntent(request);
  })
  .then(responses => {
    console.log('Detected intent:');
    logQueryResult(sessionClient, responses[0].queryResult);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });