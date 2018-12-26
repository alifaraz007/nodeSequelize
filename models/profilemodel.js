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
    //creating user's profile
    Profile.add = function (profiledata) {
        return new Promise(async (resolve, reject) => {
            const data = await this.findOne()
            if (!data) {
                const result = await this.create(profiledata)
                resolve(result)
            } else {
                reject('profile is already created')
            }
        })
    }
    Profile.associate = function (models) {
        Profile.hasOne(models.UserDetails, { foreignKey: 'profile_id' })
        Profile.hasMany(models.Address, { foreignKey: 'address_id' })
    }
    return Profile;
}