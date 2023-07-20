const jwt = require("jsonwebtoken");
const config = require("../database/auth.config");
const db = require("../models");
const Employee = db.employee;

verifyToken = (res, req, next) => {
    let token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({
            message:"no token!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message: "Unauthorised!"
            });

        }
        req.EmployeeId = decoded.id;
        next()
    });
};


isAdmin = (req, res, next) => {
    Employee.findByPk(req.EmployeeId).then(employee => {
        employee.getRoles().then(roles =>{
            for (let i = 0; i < roles.length; i++){
                if(roles[i].name === 'admin'){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "admin only"
            });
            return;
        });
    });
};

isModerator = (req, res, next) => {
    Employee.findByPk(req.EmployeeId).then(employee => {
        employee.getRoles().then(roles =>{
            for (let i = 0; i < roles.length; i++){
                if(roles[i].name === 'moderator'){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "moderator only"
            });
            return;
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    Employee.findByPk(req.userId).then(employee => {
      employee.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
  
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Moderator or Admin Role!"
        });
      });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;