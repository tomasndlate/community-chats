const bcrypt = require('bcrypt');

exports.comparePassword = async (password, otherPassword) => {
    let isPasswordEqual = await bcrypt.compare(password, otherPassword);
    return isPasswordEqual;
}

exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    return newPassword;
}