const jwt = require("jsonwebtoken");
const blacklist = require("../lib/blaklist");
const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    if(blacklist.has(token)) {
        return res.status(401).send({ message: "Unauthorized!" });
    }
    token = token.slice(7, token.length);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.authInfo = decoded;
    } catch (err) {
        return res.status(401).send({ message: "Unauthorized!" });
    }
    next();
}

module.exports = {
    verifyToken
}