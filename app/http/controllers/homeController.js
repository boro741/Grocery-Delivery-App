const Grocery = require('../../models/grocery')

function homeController() {
    return {
        async index(req, res) {
            const groceries = await Grocery.find()
            return res.render('home', { groceries: groceries })
        }
    }
}

module.exports = homeController