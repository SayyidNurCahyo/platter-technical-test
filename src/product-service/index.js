const { logger } = require("./services/logService");
const { postgresConnect } = require("./services/postgreService");
const { amqpConnectAndConsume } = require("./services/rabbitMQService");
const SLEEP_TIME = process.env.SLEEP_TIME || 30000;

// Sleep till MongoDB and RabbitMQ services start.
logger.info(
  `Sleeping for ${SLEEP_TIME}ms before connecting to MongoDB and RabbitMQ.`
);
setTimeout(() => {
  // Connect to MongoDB
  postgresConnect();
  // Connect to RabbmitMQ and consume orders
  amqpConnectAndConsume();
  logger.info(`restaurant-service started.`);
}, SLEEP_TIME);
