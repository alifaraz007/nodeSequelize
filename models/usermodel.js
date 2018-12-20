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
                            reject(new Error('email already existed'))
                        } else {
                            const username = await this.findOne({ where: { userName: user.userName } })
                            if (username) {
                                reject(new Error('username already existed'))
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
    return User;
}
