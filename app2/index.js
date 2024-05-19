const express = require("express");
const kafka = require("kafka-node");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const onDBInit = async () => {
  mongoose.connect(process.env.MONGO_URL);
  const User = new mongoose.model("user", {
    name: String,
    email: String,
    password: String,
  });
  const client = new kafka.KafkaClient({
    kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS,
  });
  const consumer = new kafka.Consumer(
    client,
    [
      {
        topic: process.env.KAFKA_TOPIC,
        //   partition
      },
    ],
    {
      autoCommit: false, // to check the latest events/ messages received once updated/ latest msgs recieved it will create batch file
    }
  );
  consumer.on("message", async (message) => {
    const user = await new User(JSON.parse(message.value));
    await user.save();
  });
  consumer.on("error", (err) => {
    console.log(err);
  });
};

setTimeout(onDBInit, 10000);

app.listen(process.env.PORT);
