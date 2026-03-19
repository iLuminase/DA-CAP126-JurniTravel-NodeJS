let userModel = require('..schemas/userSchema');
module.exports = {
    CreateAnUser: async function (
        username,
        password,
        email,
        role,
        fullname,
        avatarUrl,
        status,
        loginCount,
    ) {
        let newUser = new userModel({
            username: username,
            password: password,
            email: email,
            fullname: fullname,
            avatarUrl: avatarUrl,
            status: status,
            role: role,
            loginCount: loginCount
        });
        await newUser.save();
        return newUser;
    },
    FindUserByUsername: async function (username) {
        return await userModel.findOne({
            username: username,
            isDeleted: false
        });
    },
    FindUserByEmail: async function (email) {
        return await userModel.findOne({
            email: email,
            isDeleted: false
        });
    },
    FindUserByToken: async function (token) {
        return await userModel.findOne(
            {
                forgotPasswordToken: token,
                isDeleted: false
            }
        );
    },
    FindUserById: async function (id) {
        try {
            return await userModel.findOne({
                _id: id,
                isDeleted: false
            }).populate('role');

        } catch (error) {
            return false;
        }
    },
}