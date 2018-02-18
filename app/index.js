import redis from "redis"
import backend from './backends/dialogflow'

const client = redis.createClient()
client.subscribe('speech')

client.on("message", async (channel, filename) => {
  console.log(`Received ${filename}`)
  const result = await backend.recognize(filename)
  console.log(result)
})

const pub = redis.createClient()
pub.publish('speech', '/tmp/2018-02-18T14:35:11.861Z.wav')
