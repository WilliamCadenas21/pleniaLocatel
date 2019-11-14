
//middleware
const middleware = {}

middleware.auth = (req, res, next) => {
    const user = req.app.locals.user
    console.log(req.baseUrl)
    if (user == undefined) {
        res.render('unauthorized')
    }else{
        switch(req.baseUrl) {
            case '/plenia':
                (user.type === 'plenia' ? next(): res.render('unauthorized'))  
                break;
            case '/master':
                (user.type === 'master' ? next(): res.render('unauthorized')) 
                break;

            case '/distribuidor':
                (user.type === 'distribuidor' ? next(): res.render('unauthorized')) 
                break;

            case '/franquicia':
                (user.type === 'franquicia' ? next(): res.render('unauthorized')) 
                break;
            
            default:
                res.render('unauthorized')
        }
    }
}

module.exports = middleware