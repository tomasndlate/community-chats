const { postLogInMethod } = require("./auth/login.method")
const { postSignUpMethod } = require("./auth/signup.method")

const authPath = {
    '/auth/signup': {
        post: postSignUpMethod
    },
    '/auth/login': {
        post: postLogInMethod
    }
}

module.exports = {
    authPath
}