module.exports.admin = function(req, res, next){
    if(req.get('role') && req.get('role').toLowerCase()  === 'admin'){
        next();
    }
    else {
        res.status(401).send({
            message: "Unauthorized access !!"
        });
    }
};


module.exports.user = function(req, res, next){
    if(req.get('role') && (req.get('role').toLowerCase()  === 'admin' || req.get('role').toLowerCase()  === 'user')){
        next();
    }
    else {
        res.status(401).send({
            message: "Unauthorized access !!"
        });
    }
};