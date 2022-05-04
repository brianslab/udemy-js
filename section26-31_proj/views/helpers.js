module.exports = {
    getError (errors, property) {
        // property === 'email' || 'password' || 'passwordConfirmation'
        try {
            return errors.mapped()[property].msg;

            /* errors.mapped() === {
                    email : {
                        msg: ''
                    },
                    ...
                }
            */
        } catch (err) {
            return '';
        }
    }
};
