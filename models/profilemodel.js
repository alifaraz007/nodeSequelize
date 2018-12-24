module.exports = function (db, Sequelize) {
    const Profile = db.define('profile', {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING
    },
        {
            timestamps: true,
            freezeTableName: true
        }
    )
    Profile.associate = function (models) {
        Profile.hasOne(models.UserDetails, { foreignKey: 'profile_id' })
        Profile.hasOne(models.Address, { foreignKey: 'address_id' })
    }
    return Profile;
}