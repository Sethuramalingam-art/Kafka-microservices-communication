const express = require("express");
const kafka = require("kafka-node");
const app = express();

app.use(express.json());

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

const producer = new kafka.Producer(client);

producer.on("ready", () => {});

app.listen(process.env.PORT);
