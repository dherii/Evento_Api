const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Definição do modelo Event
const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Event;