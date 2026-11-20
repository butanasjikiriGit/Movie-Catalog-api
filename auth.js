const jwt = require("jsonwebtoken");

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    return jwt.sign(data, "Movie-Catalog-System", {});
};

module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    if (typeof token === "undefined") {
        return res.status(403).send({
            auth: "Failed",
            message: "No token provided"
        });
    } else {
        token = token.slice(7, token.length);

        jwt.verify(token, "Movie-Catalog-System", function (err, decodedToken) {
            if (err) {
                return res.status(403).send({
                    auth: "Failed",
                    message: err.message
                });
            } else {
                req.user = decodedToken;
                next();
            }
        });
    }
};

module.exports.verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        return res.status(403).send({
            auth: "Failed",
            message: "Action Forbidden"
        });
    }
};