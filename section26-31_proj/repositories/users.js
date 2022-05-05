const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
    async create (attrs) {
        // attrs = attributes = {email : '', password : ''}
        attrs.id = this.randomID();

        const salt = crypto.randomBytes(8).toString('hex');
        const buff = await scrypt(attrs.password, salt, 64);

        const records = await this.getAll();
        const record = {
            ...attrs,
            password : `${buff.toString('hex')}.${salt}`
        };
        records.push(record);

        await this.writeAll(records);

        return record;
    }

    async comparePasswords (saved, supplied) {
        // saved -> password saved in db: "hashed.salt"
        // supplied -> password given by user trying to signin
        const [ hashed, salt ] = saved.split('.');
        const hashedSuppliedBuff = await scrypt(supplied, salt, 64);

        return hashedSuppliedBuff.toString('hex') === hashed;
    }
}

module.exports = new UsersRepository('users.json');
