export const autorizarCargos = (...cargosPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario || !req.usuario.role 
        || !cargosPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({
        message: 'Acesso negado: Recursos restritos'
      });
    }

    // Se passou na verificação, avança para a próxima função
    return next();
  };
};

