module.exports = class User{
    findOneById({name, email, password,templateCreateUser}){
        return templateCreateUser({name, email, password})
    }
}