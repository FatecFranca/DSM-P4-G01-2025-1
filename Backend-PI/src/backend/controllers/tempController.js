import Medidas from '../models/Medidas.js'

class tempController {
  async getTemp(req, res) {
    try {
      const temp = await Medidas.findOne().sort({ _id: -1 })

      if (!temp) {
        return res.status(404).json({ error: 'Nenhum dado encontrado' })
      }

      const dataConvertida = new Date(temp.timestamp * 1000)

      const dia = String(dataConvertida.getDate()).padStart(2, '0')
      const mes = String(dataConvertida.getMonth() + 1).padStart(2, '0')
      const ano = dataConvertida.getFullYear()
      const hora = String(dataConvertida.getHours()).padStart(2, '0')
      const minuto = String(dataConvertida.getMinutes()).padStart(2, '0')

      const [temperatura, umidade] = temp.dado.split(',')

      const resposta = {
        data: `${dia}/${mes}/${ano}`,
        hora: `${hora}:${minuto}`,
        temperatura: `${temperatura}°C`,
        umidade: `${umidade}%`,
      }

      res.status(200).json(resposta)
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Erro ao buscar temperatura', detalhe: error.message })
    }
  }
}

export default tempController
