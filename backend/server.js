const express = require('express');
// const dotenv=require('dotenv');
// const kafka = require('kafka-node');
const app = express();
const port = 4000;
const route=require('./route/route');
const routeNotify=require('./route/routeNotify');
const cors=require("cors");

// const Producer=kafka.Producer,
//         client=new kafka.KafkaClient(),
//         producer=new Producer(client);
// producer.on('ready', function () {
//     console.log('Producer is ready');
// });

// producer.on('error', function (err) {
//     console.log('Producer is in error state');
//     console.log(err);
// })



app.get('/', (req, res) => res.send('Hello World!'))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/users',route);
app.use('/notifications',routeNotify);

app.listen(port, () => console.log(`Example app listening on port 4000!`))
