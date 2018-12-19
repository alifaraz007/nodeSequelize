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
                    return new Promise((resolve, reject) => {
                        this.findOne({ where: { email: user.email } })
                            .then((email) => {
                                if (email) {
                                    reject(new Error('email already existed'))
                                } else {
                                    this.findOne({ where: { userName: user.userName } })
                                        .then((username) => {
                                            if (username) {
                                                reject(new Error('username already existed'))
                                            } else {
                                                resolve();
                                            }
                                        })
                                }
                            })
                    })
                }
            },
            timestamps: true,
            freezeTableName: true
        });
    return User;
}
