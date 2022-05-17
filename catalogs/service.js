const Catalog = require('./entity')

const convertValue = (val) => {
    return {
        ID: val.ID,
        name: val.name,
        description: val.description,
        url: val.url,
        price: {
            cost1: val.cost1,
            cost2: val.cost2,
            cost3: val.cost3,
        },
        req: {
            req1: val.req1,
            req2: val.req2,
            req3: val.req3,
        },
    };
}


module.exports = {
    findAll: async () => {
        return Catalog.findAll()
    },
    findAllConverted: async (id) => {
        return Catalog.findAll().then(allArr => {
            return allArr.map((val) => {
                return convertValue(val);
            })
        })
    },
    findOne: async (id) => {
        return Catalog.findByPk(+id)
    },
    findOneConverted: async (id) => {
        return Catalog.findByPk(+id).then(val => convertValue(val))
    },
     create: async (createDto) => {
        return Catalog.create(createDto)
    },
    update: async  (id, updateDto) => {
        const asset = Catalog.findByPk(+id)
        asset.name = updateDto?.name ? updateDto.name : asset.name
        asset.description = updateDto?.description ? updateDto.description : asset.description
        asset.url = updateDto?.url ? updateDto.url : asset.url
        asset.cost1 = updateDto?.cost1 ? updateDto.cost1 : asset.cost1
        asset.cost2 = updateDto?.cost2 ? updateDto.cost2 : asset.cost2
        asset.cost3 = updateDto?.cost3 ? updateDto.cost3 : asset.cost3
        asset.req1 = updateDto?.req1 ? updateDto.req1 : asset.req1
        asset.req2 = updateDto?.req2 ? updateDto.req2 : asset.req2
        asset.req3 = updateDto?.req3 ? updateDto.req3 : asset.req3
        asset.category = updateDto?.category ? updateDto.category : asset.category
        return asset.save()
    },
    delete: async  (id) => {
        return Catalog.findAll({
            where: {
                id: id
            }
        }).then(assets => {
            assets.forEach(val => { return val.destroy()})
        })
    },
    initTable: async () => {
        const asset = await Catalog.findOne()
        if(!asset){
            const dto = [
                {
                    name: 'building1',
                    description: 'building1',
                    url: 'url_building1',
                    cost1: 100,
                    cost2: 100,
                    cost3: 100,
                    req1: 2,
                    req2: 2,
                    req3: 2,
                    category: 1,
                },
                {
                    name: 'building2',
                    description: 'building2',
                    url: 'url_building2',
                    cost1: 200,
                    cost2: 200,
                    cost3: 200,
                    req1: 2,
                    req2: 2,
                    req3: 2,
                    category: 1,
                },
                {
                    name: 'building3',
                    description: 'building3',
                    url: 'url_building3',
                    cost1: 300,
                    cost2: 300,
                    cost3: 300,
                    req1: 2,
                    req2: 2,
                    req3: 2,
                    category: 1,
                },
            ];
            const promises = dto.map((el) => {
                return Catalog.create(el);
            });

            return Promise.all(promises);
        }
    }
}