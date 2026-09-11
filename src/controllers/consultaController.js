//consultas armazenadas na memória
let consultas = [
    {id:1, paciente:"André", medico: "Dra. Larissa", especialidade:"Dermatologia"},
    {id:2, paciente:"Carlos", medico: "Dr. Silas", especialidade:"Ortopedia"}
]

//para listar todas as consultas
export const listAll = (req, res) => {
  return res.status(200).json(consultas);
};

//para listar conforme o número do ID
export const getById = (req, res) => {
  const id = Number(req.params.id);
  const consulta = consultas.find(c => c.id === id);

  if (!consulta) {
    return res.status(404).json({ message: "Consulta não encontrada." });
  }

  return res.status(200).json(consulta);
};

//para criar uma nova consulta
export const create = (req,res) => {
    const novaConsulta = req.body;

    consultas.push(novaConsulta);
  
  return res.status(201).json(novaConsulta);
}