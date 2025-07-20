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

  postUsuario(value) {
    return sofiSaludApi().post('/users', value)
  },

  subirRespaldo(formData) {
    return sofiSaludApi().post(`/respaldo/cargar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
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

  getUsuarios() {
    return sofiSaludApi().get(`/users?pagina=1&limit=1000`)
  },

  getUsuarioById(id) {
    return sofiSaludApi().get(`/users/${id}`)
  },

  getReporteMedicamento() {
    return sofiSaludApi().get('/respaldo/generar', {
      responseType: 'blob', // Para manejar archivos
    })
  },

  //PUT
  putMedicamento(value) {
    return sofiSaludApi().put(`/medicamentos`, value)
  },

  putUsuario(value) {
    return sofiSaludApi().put(`/users`, value)
  },

  //DELETE

  deleteMedicamento(id) {
    return sofiSaludApi().delete(`/medicamentos/${id}`)
  },

  deleteUsuario(id) {
    return sofiSaludApi().delete(`/users/${id}`)
  },
}
