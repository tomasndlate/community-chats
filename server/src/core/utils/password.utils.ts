import bcrypt from "bcrypt";

export const comparePassword = async (password: string, otherPassword: string) => {
    let isPasswordEqual = await bcrypt.compare(password, otherPassword);
    return isPasswordEqual;
}

export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    return newPassword;
}
