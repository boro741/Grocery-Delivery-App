const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController= require('../app/http/controllers/customers/cartController')

function initRoutes(app){
    // Home Routes
    app.route('/')
        .get(homeController().index)

    // Auth Routes
    app.route('/login')
        .get(guest,authController().login) // GET
        .post(authController().postLogin) // POST
    
    app.route('/register')
        .get(guest,authController().register)
        .post(authController().postRegister)

    app.route('/logout')
        .get(authController().logout)
      
    
    // Cart Routes
    app.route('/cart')
        .get(cartController().index)

    app.route('/update-cart')
        .get(cartController().update)

    // Customer routes
    app.route('/orders')
        .post(auth, orderController().store)
    app.route('/customer/orders')
        .get(auth, orderController().index)
    
    // Admin routes
    app.route('/admin/orders')
        .get(admin, AdminOrderController().index)
}

module.exports = initRoutes