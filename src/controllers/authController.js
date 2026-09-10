// importando o bycript para criptografar a senha
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//um array simulando um banco de dados de usuários na memória
//(const usuarios = [];)
const usuarios = [];

//função de registro

// receberá os dados para o registro
export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Gerando o salt e a senha criptografada (hash)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Criando o objeto do novo usuário
        const novoUsuario = {
            id: usuarios.length + 1,
            email,
            password: hashedPassword, // salvando a senha criptografada
            role
        };

         usuarios.push(novoUsuario);

        // o que irá voltar para o usuário
        return res.status(201).json({
        message: "Usuário cadastrado com sucesso",
        usuario: { 
        id: novoUsuario.id, 
        email: novoUsuario.email, 
        role: novoUsuario.role 
        }
});

    } catch (error) {
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
};

//função de login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

//procurando usuário através do e-mail
const usuario = usuarios.find(u => u.email === email);

// se não encontrar, retorna 401 com "Credenciais inválidas"
    if (!usuario) {
     return res.status(401).json({ message: "Credenciais inválidas" });
    }

//o bycript a senha colocada do o HASH da senha do BD 
//(nesse caso os dados da memória)
const isValid = await bcrypt.compare(password, usuario.password);
if(!isValid) 
    return res.status(401).json({ message: "Credenciais Inválidas"});

//emissão do token
const token = jwt.sign(
    { id: usuario.id, email: usuario.email, role: usuario.role },
    process.env.JWT_SECRET,
    {expiresIn: '1h'}
);
return res.status(200).json({ token });

    } catch (error) {
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
};