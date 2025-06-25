import { toValue } from 'vue'
import sofiSaludApi from './sofiSaludApi'

export default {
  //POST
  userLog(value) {
    return sofiSaludApi().post('/auth', value)
  },

    consulta(value) {
    return sofiSaludApi().post('/recomendacion', value)
  },

  //GET
    getMedicamentos(pag, lim) {
    return sofiSaludApi().get(`/medicamentos?pagina=${pag}&limit=${lim}`)
  },
}
