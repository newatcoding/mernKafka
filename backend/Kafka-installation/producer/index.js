// console.log('Producer...');

const Kafka=require('node-rdkafka');
const stream= Kafka.Producer.createWriteStream({
    'metadata.broker.list':'127.0.0.1:9092'
},{},{topic:'test-1'});

function queueMessage(){
    const success=stream.write(Buffer.from('hi'));
    if(success){
        console.log('msg wrote successfully to the stream');
    }else{
        console.log('something went wrong..');
    }
}
setInterval(()=>{
    queueMessage();
},3000);