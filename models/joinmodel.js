module.exports = function (db, Sequelize) {
    const Join = db.define('join', {
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        profile_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'profile',
                key: 'id'
            }
        }
    },
        {
            timestamps: true,
            freezeTableName: true
        })
    Join.associate = function (models) {
        Join.belongsTo(models.Profile, { foreignKey: 'profile_id' })
        Join.belongsTo(models.User, { foreignKey: 'user_id' })
    }
    return Join;
}