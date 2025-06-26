<template>
  <v-dialog v-model="alert.show" width="auto" class="justify-center align-center">
    <v-alert
      v-model="alert.show"
      :color="alert.color"
      variant="elevated"
      prominent
      closable
      width="400px"
      >{{ alert.message }}</v-alert
    >
  </v-dialog>
  <v-container class="d-flex justify-center align-center">
    <v-card width="700" class="pa-7">
      <v-form ref="form" @submit.prevent="editarUsuario">
        <v-row>
          <v-col>
            <v-text-field
              :rules="usernameRules"
              v-model="usuario.user"
              label="Nombre de Usuario"
              variant="solo"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              :rules="contrasenaRules"
              v-model="usuario.pass"
              label="Contraseña"
              variant="solo"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              :rules="globalRules"
              v-model="usuario.rol"
              :items="roles"
              item-title="nombre_rol"
              item-value="id_rol"
              label="Rol"
              variant="solo"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              :rules="globalRules"
              v-model="usuario.status"
              :items="estado"
              item-title="nombre_status"
              item-value="id_status"
              label="Estado"
              variant="solo"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-container class="d-flex justify-center">
            <v-btn color="success" type="submit">Editar</v-btn>
          </v-container>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import sofiSaludService from '@/services/sofiSaludService'

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    alert: { show: false, message: '' },
    usuario: {
      id: null,
      user: null,
      pass: null,
      rol: null,
      status: null,
    },
    roles: [
      { id_rol: 1, nombre_rol: 'Administrador' },
      { id_rol: 2, nombre_rol: 'Usuario' },
    ],
    estado: [
      { id_status: 1, nombre_status: 'Activo' },
      { id_status: 2, nombre_status: 'Inactivo' },
    ],
    globalRules: [(value) => !!value || 'Requerido'],
    usernameRules: [
      (value) => !!value || 'Éste campo es requerido',
      (value) =>
        !value.includes(' ') || 'El nombre de usuario no puede contener espacios en blanco',
      (value) => /^[A-Za-z\s.\d]+$/.test(value) || 'No se permiten caracteres especiales',
      (value) =>
        value.length <= 14 || 'El nombre de usuario no puede contener más de 14 caracteres',
      (value) =>
        value.length >= 4 || 'El nombre de usuario no puede contener menos de 4 caracteres',
    ],
    contrasenaRules: [
      (value) => !!value || 'La contrasena es requerida',
      (value) => !value.includes(' ') || 'La contraseña no puede contener espacios',
      (value) =>
        /^[a-zA-Z0-9\._-]*$/.test(value) ||
        'La contraseña solo puede contener letras, números, guiones bajos y puntos',
      (value) => value.length <= 14 || 'La contraseña no puede tener más de 18 caracteres',
      (value) => value.length >= 4 || 'La contraseña no puede tener menos de 4 caracteres',
    ],
  }),

  methods: {
    async obtenerUsuarioByid() {
      try {
        const res = await sofiSaludService.getUsuarioById(this.id)
        console.log(res)
        const datosApi = res.data
        this.usuario.id = datosApi.id
        this.usuario.user = datosApi.usuario
        this.usuario.pass = datosApi.pass
        this.usuario.rol  = Number(datosApi.rol.codigo)
        this.usuario.status = Number(datosApi.estado.codigo)
        console.log("-----------", typeof datosApi.estado.codigo)
      } catch (error) {
        console.log(error)
      }
    },

    async editarUsuario() {
      const { valid } = await this.$refs.form.validate()

      if (!valid) {
        this.alert = {
          show: true,
          color: 'warning',
          message: 'Complete todos los campos requeridos',
        }
        return
      }
      try {
        const res = await sofiSaludService.putUsuario(this.usuario)
        this.alert = {
          show: true,
          color: 'success',
          message: 'Usuario Editado correctamente.',
        }
        this.$emit('actualizar_tabla')
        console.log(res)
      } catch (error) {
        const msjError = error.response.data.mensaje
        this.alert = {
          show: true,
          color: 'warning',
          message: msjError,
        }
        console.log(error)
      }
    },
  },
  mounted() {
    this.obtenerUsuarioByid()
  },
}
</script>
