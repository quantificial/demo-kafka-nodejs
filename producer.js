const { Kafka, logLevel } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['mint:19092', 'mint:29092', 'mint:39092'],
  //logLevel: logLevel.DEBUG
})

const main = async () => {
    const producer = kafka.producer()

    await producer.connect()

    await producer.send({
        topic: 'test-topic',
        acks: 1, 
        messages: [
            { 
                key: 'key1',
                value: 'Hello KafkaJS user!',
                headers: {
                    'corrlation-id' : '12345',
                    'system-id' : 'eapp'
                }
            },
        ],
    })

    await producer.disconnect()
}

main();

