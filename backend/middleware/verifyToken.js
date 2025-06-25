const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
        
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err){
            console.error('ERRO na verificação do JWT:', err.message);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = verifyToken;