const fs = require('node:fs')
const { AuthError } = require ('../core/error.response')

class authSevice {
    static login = ({ ...params }) => {
        return {
            message: 'success',
            metadata: params
        }
    }

    static register = ({username, password, ...params }) => {
         const stringFile = fs.readFileSync('user.txt', 'utf-8')
         let listUsers = stringFile ? JSON.parse(stringFile) : [];

        const exitUser = listUsers.find(user => user.username == username);
        if (exitUser) throw new AuthError()
        
        fs.writeFile('user.txt', JSON.stringify([...listUsers, { id:123, username, password }]), 'utf-8', error => {
            if (error) {
                console.log('save error');
            } else {
                console.log('save SUCCESS');

            }
        })
        return {username, password}
    }
}

module.exports = authSevice;