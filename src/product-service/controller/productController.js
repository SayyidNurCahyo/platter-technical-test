const { productSchema } = require("../models/productModel");
const { sequelize } = require("../services/postgreService");
const { changeProductQty } = require("../services/postgreService");

const ProductModel = sequelize.define(
  "Product",
  {
    // Ganti dengan kolom-kolom sesuai dengan kebutuhan Anda
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    // Tambahkan kolom lain sesuai kebutuhan
  },
  {
    // Opsi tambahan
    tableName: "products", // Nama tabel di PostgreSQL
    timestamps: true, // Tambahkan jika Anda ingin menyimpan timestamps (createdAt, updatedAt)
  }
);

const processCheckOut = (product) => {
  productContent = JSON.parse(product.content.toString());
  changeProductQty(ProductModel, productContent._id);
};

module.exports = {
  processCheckOut: processCheckOut,
};
