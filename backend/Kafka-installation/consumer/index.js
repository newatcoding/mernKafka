// console.log('Consumer...');
let Kafka=require('node-rdkafka');
// Kafka.KafkaConsumer
var consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
  }, {});


consumer.connect();

consumer.on('ready', function() {
    console.log('consumer started');
    consumer.subscribe(['test-1']);
    consumer.consume();
})
.on('data', function(data) {
    // Output the actual message contents
    console.log(data.value.toString());
});


