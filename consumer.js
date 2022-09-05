const { Kafka, logLevel } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['mint:19092', 'mint:29092', 'mint:39092'],
  logLevel: logLevel.INFO,
  // sasl: {
  //   mechanism: 'plain', 
  //   username: process.env.KAFKA_CONSUMER_SASL_USERNAME,
  //   password: process.env.KAFKA_CONSUMER_SASL_PASSWORD
  // }
})

const main = async () => {
    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    
    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        
        // process the message
        console.log({
          partition: partition,
          offset: message.offset,
          key: message.key.toString(),
          value: message.value.toString(),
          headers: message.headers
        })


        // commit message
        await consumer.commitOffsets([
          {
            topic,
            partition,
            offset: Number(message.offset).toString()
          }
        ]);

      },
    })
    
}

main();

