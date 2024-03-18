import {hash, compare, genSalt} from 'bcrypt'

const SALT_RANDOMS = 8

export default { 
    hashPassword: async (password) => {
        const genSaltGenerated = await genSalt(SALT_RANDOMS)

        return await hash(password, genSaltGenerated)
    },

    verifyPassword: async (password, hashedPassword) => {
        return await compare(password, hashedPassword)
    }
}