import dotenv from 'dotenv' 

dotenv.config()

export default {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'kosmo'
    }
}