import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.MQTT_HOST;
const port = process.env.MQTT_PORT;
const username = process.env.ADAFRUIT_USER;
const key = process.env.ADAFRUIT_KEY;

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `mqtt://${host}:${port}`;

const options = {
  clientId: clientId,
  clean: true,
  connectTimeout: 4000,
  username: username,
  password: key,
  reconnectPeriod: 1000,
};

const client = mqtt.connect(connectUrl, options);
const topic2 = `${username}/feeds/bbc-temp`

client.on('connect', () => {
  console.log('Connected');
  client.subscribe(topic2, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Subscribed to ${topic2}`);
    }
  });
});

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString());
});

export default client;
