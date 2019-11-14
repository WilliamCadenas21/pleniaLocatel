
//middleware
const middleware = {}

middleware.auth = (req, res, next) => {
    if (req.app.locals.user == undefined) {
        res.render('unauthorized')
    }else{
        next()
    }
}

module.exports = middleware