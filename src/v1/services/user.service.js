const fs = require('node:fs')
const { AuthError } = require ('../core/error.response')

class UserService {
    static getAllUser = async () =>{
        const stringFile = fs.readFileSync('user.txt', 'utf-8')
        let listUsers = stringFile ? JSON.parse(stringFile) : [];
        return listUsers
    }
}

module.exports = UserService;