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
  postMedicamentos(value) {
    return sofiSaludApi().post('/medicamentos', value)
  },

  buscarMedicamentos(value) {
    return sofiSaludApi().post('/medicamentos/buscar', value)
  },

  //GET
  getMedicamentos(pag, lim) {
    return sofiSaludApi().get(`/medicamentos?pagina=${pag}&limit=${lim}`)
  },

  getMedicamentosById(id) {
    return sofiSaludApi().get(`/medicamentos/${id}`)
  },

  getSelectPresentacion() {
    return sofiSaludApi().get(`/select/presentacion`)
  },

  //PUT
  putMedicamento(value) {
    return sofiSaludApi().put(`/medicamentos`, value)
  },

  //DELETE

  deleteMedicamento(id) {
    return sofiSaludApi().delete(`/medicamentos/${id}`)
  },
}
