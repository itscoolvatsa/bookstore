const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");

const scryptAsync = promisify(scrypt);

const hashPassword = async (password) => {
    const salt = randomBytes(8).toString("hex");
    const hash = await scryptAsync(password, salt, 64);
    return `${hash.toString("hex")}.${salt}`;
};

const comparePassword = async (providedPassword, availablePassword) => {
    const [hash, salt] = availablePassword.split(".");
    const newHash = await scryptAsync(providedPassword, salt, 64);
    return hash === newHash.toString("hex");
};

module.exports = {
    hashPassword,
    comparePassword,
};
