// console.log('Producer...');

const Kafka=require('node-rdkafka');
// const stream= Kafka.Producer.createWriteStream({
//     'metadata.broker.list':'localhost:9092'
// },{},{topic:'test-1'});
// function queueMessage(i){
//     const success=stream.write(Buffer.from(JSON.stringify({"name":`${i}`})));
//     if(success){
//         // console.log(i);
        
//     }else{
//         console.log('something went wrong..'+ success + i);
//     }
// }

// for(let i=0;i<2000;i++){
//     //  setInterval(()=>{
//         queueMessage(i);
//     // },100);
    
    
// }
// stream.on('error', (err)=>{
//     console.error(err);
// });

var producer = new Kafka.Producer({
    'metadata.broker.list': 'localhost:9092',
    'dr_cb': true
  });
 
  producer.connect();
  
  producer.on('ready', function() {
    try {
        // for(let i=0;i<1;i++){
            // producer.produce(
            //     'test-topics',
            //     null,
            //     Buffer.from(JSON.stringify({"name":`${i}`,"age":`${i}`,id:Math.random()}) ),
            //     'Stormwind',
            //     Date.now(),
               
            //   );
            //   producer.produce(
            //     'notify-topics',
            //     null,
            //     Buffer.from(JSON.stringify({"name":`${i}`,"age":`${i}`,id:Math.random()}) ),
            //     Date.now(),
            //   );
        // }
     
    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
    }
  });
  
  producer.on('event.error', function(err) {
    console.error('Error from producer');
    console.error(err);
  })
  
  // producer.setPollInterval(100);

  module.exports=producer;