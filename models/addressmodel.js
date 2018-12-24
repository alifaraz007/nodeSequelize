module.exports = function (db, Sequelize) {
    const Address = db.define('address', {
        address_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'profile',
                key: 'id'
            }
        },
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        pincode: Sequelize.INTEGER,
        phone_num: Sequelize.INTEGER
    }, {
            timestamps: true,
            freezeTableName: true
        }
    )
    Address.associate = function (models) {
        Address.belongsTo(models.Profile, { foreignKey: 'address_id' })
    }
    return Address;
}