const jwt = require('jsonwebtoken');
const {User} = require('../../model/user');
const bcrypt = require('bcryptjs');
const {promisify} = require('util');
require('dotenv').config();
const verifyToken = promisify(jwt.verify);
const jwtSecret = process.env.JWT_SECRET;


const checkPassword = (userPassword, candidatePassword) => {
    try {
        return bcrypt.compareSync(userPassword, candidatePassword);
    } catch (error) {
        throw {error}
    }
}


const signup = async (userId, name, email, password, role) => {
    try {
        const data = await User.create({userId, name, email, password, role});

        return data;
    } catch (error) {
        throw error
    }
}


const login = async (email, password) => {
    try {
        const user = await User.findOne({
            where:{
                email
            }
        })

        const passwordMatch = checkPassword(password, user.password);

        if(!passwordMatch) throw new Error('Password Incorrect!!');

        const token = jwt.sign({userId:user.userId},jwtSecret,{
            expiresIn: '1h'
        });

        return token
    } catch (error) {
        return error
    }
}


const isAuthenticated = async (req) => {
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            throw new Error('Token not found or Invalid')
        }


        const decoded = await verifyToken(token, jwtSecret);

        const user = await User.findByPk(decoded.userId);

        return user.dataValues
    } catch (error) {
        throw(error);
    }
}


module.exports = {
    signup,
    login,
    isAuthenticated
}