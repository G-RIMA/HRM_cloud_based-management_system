const db = require("../models");

const Roles = db.roles;
const Employee = db.employee;

checkEmail = (req, res, next) => {
    Employee.findOne({
        where:{email: req.body.email}

    }).then(employee => {
        if(employee){
            res.status(400).send({
                maessage: "Email already in use!"
            });
            return;
        }
        
    });
    next();
};

checkRole = (req, res, next) => {
    if(req.body.roles) {
        for(let i = 0; i<req.body.roles.length; i++){
            if(!Roles.includes(req.body.roles[i])){
                res.status(400).send({
                    message: "ROle doesnt exist =" + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
}

const verifySignUp = {
    checkEmail: checkEmail
};

module.exports = verifySignUp;