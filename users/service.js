const sequelize = require('../utils/database')
const User = require('./entity')(sequelize)

module.exports = {
    findAll: async () => {
        return User.findAll()
    },
    findOne: async (address) => {
        return User.findByPk(address)
    },
    create: async (createDto) => {
        return User.create(createDto)
    },
    update: async (address, updateDto) => {
        const user = User.findByPk(address)
        user.address = updateDto?.address ? updateDto.address : user.address
        user.description = updateDto?.description ? updateDto.description : user.description
        user.cash1 = updateDto?.cash1 ? updateDto.cash1 : user.cash1
        user.cash2 = updateDto?.cash2 ? updateDto.cash2 : user.cash2
        user.cash3 = updateDto?.cash3 ? updateDto.cash3 : user.cash3

        return user.save()
    },
    delete: async (address) => {
        return User.findAll({
            where: {
                address: address
            }
        }).then(assets => {
            assets.forEach(val => { return val.destroy()})
        })
    },
    initTable: async () => {
        const row = await User.findOne()
        if(!row){
            const dto = [
                { address: 'user1', cash1: 100, cash2: 100, cash3: 100 },
                { address: 'user2', cash1: 500, cash2: 500, cash3: 500 },
                { address: 'user3', cash1: 1000, cash2: 1000, cash3: 1000 },
            ];
            const promises = dto.map((el) => {
                return User.create(el);
            });

            return Promise.all(promises);
        }
    }
}