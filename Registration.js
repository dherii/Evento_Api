const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Event = require('./Event');

// Definição do modelo Registration
const Registration = sequelize.define('Registration', {
  participantName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Relacionamento (1:N)
Event.hasMany(Registration, { foreignKey: 'eventId' });
Registration.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = Registration;