const { Sequelize, DataTypes } = require("sequelize");
const { logger } = require("./loggerService");

// environment variables
const PG_CONTAINER_NAME = process.env.PG_HOST || "localhost";
const PG_DATABASE = process.env.PG_DATABASE || "platterDB";
const PG_USER = process.env.PG_USER || "postgres";
const PG_PASSWORD = process.env.PG_PASSWORD || "password";
const PG_PORT = process.env.PG_PORT || 5432;

const sequelize = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
  host: PG_CONTAINER_NAME,
  port: PG_PORT,
  dialect: "postgres",
});

/**
 * Define Order model
 */
const Order = sequelize.define(
  "Order",
  {
    // Assuming the order model has an id and status field
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
  }
);

/**
 * Connect to PostgreSQL
 */
const postgresConnect = async () => {
  try {
    await sequelize.authenticate();
    logger.log(
      "info",
      `PostgreSQL - connection established at ${PG_CONTAINER_NAME}:${PG_PORT}`
    );
  } catch (error) {
    logger.log("fatal", `PostgreSQL - connection error: ${error}`);
    process.exit(1); // Exit process if connection fails
  }
};

/**
 * Change order status with ID
 * @param {String} orderId - Order ID.
 * @param {String} status - new status.
 */
const changeProductQty = async (orderId, status) => {
  try {
    const order = await Order.update(
      { status: status },
      { where: { id: orderId } }
    );

    if (order[0] === 1) {
      logger.info(`Order - ${orderId} status updated to ${status}`);
    } else {
      logger.log("error", `Order - ${orderId} not found`);
    }
  } catch (err) {
    logger.log("fatal", `Sequelize - ${err}`);
  }
};

module.exports = {
  sequelize: sequelize,
  postgresConnect: postgresConnect,
  changeProductQty: changeProductQty,
};
