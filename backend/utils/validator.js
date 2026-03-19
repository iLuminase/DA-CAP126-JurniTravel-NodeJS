let { body, validationResult } = require('express-validator');
module.exports = {
    validatedResult: function (req, res, next) {
        let result = validationResult(req);
        if (result.errors.length > 0) {
            res.status(404).send(
                result.errors.map(function (e) {
                    return {
                        [e.path]: e.msg,
                    };
                }),
            );
        } else {
            next();
        }
    },
    CreateUserValidator: [
        body('email')
            .notEmpty()
            .withMessage('Email khong duoc de trong')
            .bail()
            .isEmail()
            .withMessage('Email khong hop le'),
        body('username')
            .notEmpty()
            .withMessage('Username khong duoc de trong')
            .bail()
            .isLength({ min: 3 })
            .withMessage('Username phai co it nhat 3 ky tu'),
        body('password')
            .notEmpty()
            .withMessage('Mat khau khong duoc de trong')
            .bail()
            .isStrongPassword(
                {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }
            )
            .withMessage('Mat khau phai co it nhat 8 ky tu, bao gom chu hoa, chu thuong, so va ky tu dac biet'
            ),
        body('role')
            .notEmpty()
            .withMessage('Role khong duoc de trong')
            .bail()
            .isMongoId()
            .withMessage('Role phai la 1 Id hop le')
    ],
    RegisterValidator: [
        body('email')
            .notEmpty()
            .withMessage('Email khong duoc de trong')
            .bail()
            .isEmail()
            .withMessage('Email sai dinh dang'),
        body('username')
            .notEmpty()
            .withMessage('Username khong duoc de trong')
            .bail()
            .isAlphanumeric()
            .withMessage('Username chi duoc chua chu cai va so'),
        body('password')
            .notEmpty()
            .withMessage('Mat khau khong duoc de trong')
            .bail()
            .isStrongPassword(
                {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }
            )
            .withMessage('Mat khau phai co it nhat 8 ky tu, bao gom chu hoa, chu thuong, so va ky tu dac biet'
            )
    ],
    ChangePasswordValidator: [
        body("oldPassword")
            .notEmpty()
            .withMessage("Mat khau cu khong duoc de trong"),
        body("newPassword")
            .notEmpty()
            .withMessage("Mat khau moi khong duoc de trong")
            .bail()
            .isStrongPassword(
                {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }
            )
            .withMessage('Mat khau moi phai co it nhat 8 ky tu, bao gom chu hoa, chu thuong, so va ky tu dac biet'
            )
    ],
    ModifyUserValidator: [
        body('email')
            .isEmpty()
            .withMessage('Email khong duoc thay doi'),
        body('username')
            .isEmpty()
            .withMessage('Username khong duoc thay doi'),
        body('password')
            .optional()
            .isStrongPassword(
                {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }
            )
            .withMessage('Mat khau moi phai co it nhat 8 ky tu, bao gom chu hoa, chu thuong, so va ky tu dac biet'
            ),
        body('role')
            .isEmpty()
            .withMessage('Role khong duoc thay doi'),
        body('avatarUrl').optional().isArray().withMessage('Image khong hop le'),
        body('avatarUrl.*').optional().isUrl().withMessage('Url khong hop le')

    ],

}