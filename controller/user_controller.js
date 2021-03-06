const userProvider = require('../provider/user_provider');
const db = require('../config/database')
const jwt = require('jsonwebtoken')

//controller for register
const register = async (req, res, next) => {
    try {
        const user = await userProvider.create(req, res)
        const result = await db.User.create(user)
        res.json(result);
    } catch (err) {
        res.status(400).json(err);
    }
}

//controller for login
const login = async (req, res) => {
    try {
        const user = await userProvider.login(req, res)
        const result = await db.User.findOne({
            where: { email: user.email, password: user.password }
        })
        if (!result) {
            res.json('entered wrong email or password');
        } else {
            let token = jwt.sign({ token: result.id }, 'secret_key', { expiresIn: 60 * 60 })
            res.json({ status: 1, token: token, })
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

//controller to get user data
const get = async (req, res) => {
    const user = await db.User.findOne({ where: { id: req.data.token } })
    res.json(user);
}

//controller for delete user data
const remove = async (req, res) => {
    const deleteUser = await db.User.destroy({ where: { id: req.data.token } })
    res.json('user data deleted');
}

//controller to return list of users
const list = async (req, res) => {
    try {
        const pageNum = Number(req.params.page)
        const limit = Number(req.params.count)
        const offset = pageNum * limit
        const userlist = await db.User.getData(pageNum, limit, offset)
        res.json(userlist)
    } catch (err) {
        res.status(400).json(err)
    }
}

//controller to create or update user profile
const profile = async (req, res) => {
    try {
        const profileData = await userProvider.add(req, res)
        const profile = await db.Profile.add(profileData)
        const userDetails = await db.UserDetails.findOrCreate({
            where: {
                user_id: req.data.token,
                profile_id: profile.id
            }
        })
        // creating or updating address
        const address = await db.Address.findOne({
            where: { address_type: profileData.address_type }
        })
        if (!address) {
            const newAddress = await db.Address.create({
                address_id: profile.id,
                address_type: profileData.address_type,
                city: profileData.city,
                state: profileData.state
            })
        } else {
            const updateAddress = await db.Address.update({
                city: profileData.city,
                state: profileData.state
            }, { where: { address_type: profileData.address_type } })
        }
        res.json(profile)
    } catch (err) {
        res.status(400).json(err)
    }
}

//controller to get all data of user by id
const getById = async (req, res) => {
    try {
        const data = await db.UserDetails.getDataById(req.params.id)
        res.json(data)
    } catch (err) {
        res.status(400).json(err)
    }
}


module.exports = {
    register,
    login,
    get,
    remove,
    list,
    profile,
    getById
}