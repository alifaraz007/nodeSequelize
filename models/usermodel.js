module.exports = function (db, Sequelize) {
    const User = db.define('user', {
        name: {
            type: Sequelize.STRING
        },
        userName: {
            type: Sequelize.STRING,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING
    }, {
            hooks: {
                beforeCreate: function (user, option) {
                    return new Promise(async (resolve, reject) => {
                        const email = await this.findOne({ where: { email: user.email } })
                        if (email) {
                            reject('email already existed')
                        } else {
                            const username = await this.findOne({ where: { userName: user.userName } })
                            if (username) {
                                reject('username already existed')
                            } else {
                                resolve();
                            }
                        }
                    })
                }
            },
            timestamps: true,
            freezeTableName: true
        });
    User.getData = function (page, limit, offset) {
        return new Promise(async (resolve, reject) => {
            if (page >= 0 && limit > 0) {
                const data = await this.findAll({ limit, offset })
                if (data[0] == null) {
                    reject('data not found')
                } else {
                    resolve(data);
                }
            } else {
                reject('invalid data')
            }
        })
    }
    User.associate = function (models) {
        User.hasOne(models.UserDetails, { foreignKey: 'user_id' })
    }
    return User;
}


