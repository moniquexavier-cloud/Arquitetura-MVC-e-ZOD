import jwt from 'jsonwebtoken';

// função intermediária responsável por barrar requisições não autenticadas:
export const autenticarToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json(
    { message: "Token não fornecido"});

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json(
        { message: "Token inválido ou expirado"})
    }
};

