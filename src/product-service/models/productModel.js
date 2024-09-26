const { Sequelize, DataTypes } = require('sequelize');

// Inisialisasi Sequelize
const sequelize = new Sequelize('mydatabase', 'user', 'password', {
  host: 'postgres',
  dialect: 'postgres',
});

// Definisikan model Item
const ItemModel = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
}, {
  // Opsi tambahan untuk item model
  tableName: 'items', // Nama tabel untuk item
  timestamps: false, // Tidak perlu timestamps
});

// Definisikan model Product
const ProductModel = sequelize.define('Product', {
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'delivered'),
    defaultValue: 'pending',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Invalid e-mail."
      }
    }
  }
}, {
  // Opsi tambahan untuk product model
  tableName: 'products', // Nama tabel untuk produk
  timestamps: true, // Menggunakan timestamps (createdAt, updatedAt)
});

// Definisikan relasi antara Product dan Item
ProductModel.hasMany(ItemModel, {
  foreignKey: 'productId',
  as: 'items' // Alias untuk relasi
});
ItemModel.belongsTo(ProductModel, {
  foreignKey: 'productId',
});

// Fungsi untuk menyinkronkan model dengan database
const syncDatabase = async () => {
  try {
    await sequelize.authenticate(); // Cek koneksi
    console.log('Connection to PostgreSQL has been established successfully.');

    await sequelize.sync({ force: true }); // Sinkronkan semua model dengan tabel di database
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

syncDatabase();

module.exports = {
  ProductModel,
  ItemModel,
};
