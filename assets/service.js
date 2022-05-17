const sequelize = require('../utils/database')
const Asset = require('./entity')(sequelize)
const User = require('../users/service')
const { Op } = require('sequelize')

module.exports = {
    findAll: async () => {
        return Asset.findAll()
    },
    findOne: async (id) => {
        return Asset.findByPk(+id)
    },
    create: async (createDto) => {
        return Asset.create(createDto)
    },
    update: async  (id, updateDto) => {
        const asset = Asset.findByPk(+id)
        asset.address = updateDto?.address ? updateDto.address : asset.address
        asset.type = updateDto?.type ? updateDto.type : asset.type
        asset.level = updateDto?.level ? updateDto.level : asset.level
        return asset.save()
    },
    delete: async  (id) => {
        return Asset.findAll({
            where: {
                id: id
            }
        }).then(assets => {
            assets.forEach(val => { return val.destroy()})
        })
    },
    findByAddressGteReq: async (userAddress, req1, req2, req3) => {
        return Asset.findAll({
            where: {
                [Op.and]: [
                    { address: userAddress },
                    {
                        [Op.or]: [
                            {
                                [Op.and]: [{ type: 1 }, { level: { [Op.gte]: req1 } }],
                            },
                            {
                                [Op.and]: [{ type: 2 }, { level: { [Op.gte]: req2 } }],
                            },
                            {
                                [Op.and]: [{ type: 3 }, { level: { [Op.gte]: req3 } }],
                            },
                        ],
                    },
                ],
            },
        });
    },
    initTable: async () => {
        const row = await Asset.findOne()
        if(!row){
            const dto = [
                { address: 'user1', type: 1, level: 5 },
                { address: 'user1', type: 2, level: 5 },
                { address: 'user1', type: 3, level: 5 },

                { address: 'user2', type: 1, level: 7 },
                { address: 'user2', type: 2, level: 7 },
            ];
            const promises = dto.map((el) => {
                return Asset.create(el);
            });

            return Promise.all(promises);
        }
    }
}