const sequelize = require('../utils/database')
const Product = require('./entity')(sequelize)
const Catalog = require('../catalogs/service')
const Asset = require('../assets/service')
const User = require('../users/service')

const getCashReqErrors = (user, catalogProd) => {
    const cashErrors = [];

    if (user.cash1 < catalogProd.cost1) {
        cashErrors.push({
            cash: 'cash1',
            diff: user.cash1 - catalogProd.cost1,
        });
    }
    if (user.cash2 < catalogProd.cost2) {
        cashErrors.push({
            cash: 'cash2',
            diff: user.cash2 - catalogProd.cost2,
        });
    }
    if (user.cash3 < catalogProd.cost3) {
        cashErrors.push({
            cash: 'cash3',
            diff: user.cash3 - catalogProd.cost3,
        });
    }

    return cashErrors;
}

const getAssetsReqErrors = (catalogProd, assets) => {
    const reqErrors = [];
    if (
        catalogProd.req1 &&
        !assets.find((el) => {
            return el.type === 1;
        })
    ) {
        reqErrors.push({ type: 1, req: catalogProd.req1 });
    }
    if (
        catalogProd.req1 &&
        !assets.find((el) => {
            return el.type === 2;
        })
    ) {
        reqErrors.push({ type: 2, req: catalogProd.req2 });
    }
    if (
        catalogProd.req1 &&
        !assets.find((el) => {
            return el.type === 3;
        })
    ) {
        reqErrors.push({ type: 3, req: catalogProd.req3 });
    }
    return reqErrors;
}

module.exports = {
    findOne: async (id) => {
        return Product.findByPk(+id)
    },
    findAll: async () => {
        Product.findAll()
    },
    create: async (createDto) => {
        return Product.create(createDto)
    },
    update: async (id, updateDto) => {
      const asset = Asset.findByPk(+id)
      asset.address = updateDto?.address ? updateDto.address : asset.address
      return asset.save()
    },
    delete: async (id) => {
        return Product.findAll({
            where: {
                id: id
            }
        }).then(assets => {
            assets.forEach(val => { return val.destroy()})
        })
    },
    buyProduct: async (productId, userAddress) => {
        try {
          const user = await User.findOne(userAddress);
          if (!user) {
            return {
              success: false,
              error: {
                errorMessage: 'User not found',
              },
            };
          }

          const catalogProd = await Catalog.findOne(productId);
          if (!catalogProd) {
            return {
              success: false,
              error: {
                errorMessage: 'Catalog element not found',
              },
            };
          }

          const cashErrors = getCashReqErrors(user, catalogProd);

          const assets = await Asset.findByAddressGteReq(
              userAddress,
              catalogProd.req1,
              catalogProd.req2,
              catalogProd.req3,
          );
          const reqErrors = getAssetsReqErrors(catalogProd, assets);

          let errMess = '';
          if (cashErrors.length) {
            errMess +=
                'Not enough cash (' +
                cashErrors
                    .map((el) => {
                      return `${el.cash}: ${-el.diff}`;
                    })
                    .join(';') +
                ' )';
          }
          if (reqErrors.length) {
            errMess +=
                'Build assets (' +
                reqErrors
                    .map((el) => {
                      return `type ${el.type} for lvl ${el.req} `;
                    })
                    .join('; ') +
                ')';
          }

          if (errMess.length) {
            return {
              success: false,
              error: {
                errorMessage: errMess,
              },
            };
          }

          user.cash1 -= catalogProd.cost1;
          user.cash2 -= catalogProd.cost2;
          user.cash3 -= catalogProd.cost3;

          try {
            await sequelize.transaction(async (t) => {
              const transactionHost = { transaction: t };

              await user.save(transactionHost);
              await Product.create(
                  {
                    address: user.address,
                  },
                  transactionHost,
              );
            });
          } catch (err) {
            console.error('error', err);
            return {
              success: false,
              error: {
                errorMessage: 'Transaction error!',
              },
            };
          }

          return {
            success: true,
            data: {
              resources: {
                cash1: user.cash1,
                cash2: user.cash2,
                cash3: user.cash3,
              },
            },
          };
        } catch (error) {
          return {
            success: false,
            error: {
              errorMessage: error.message,
            },
          };
        }
    }
}