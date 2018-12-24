module.exports = function (db, Sequelize) {
    const UserDetails = db.define('userDetails', {
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
    UserDetails.associate = function (models) {
        UserDetails.belongsTo(models.Profile, { foreignKey: 'profile_id' })
        UserDetails.belongsTo(models.User, { foreignKey: 'user_id' })
    }
    return UserDetails;
}