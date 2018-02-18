import redis from "redis"
import backend from './backends/wit'

const client = redis.createClient()
client.subscribe('speech')

client.on("message", async(channel, filename) => {
  console.log(`Received ${filename}`)
  const result = await backend.recognize(filename)
  console.log(result)
})
