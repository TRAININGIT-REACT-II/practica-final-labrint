  //Verificamos que siempre se inserte un usuario y un password
  export const validarFormulario = (usuario,password) =>
    (usuario && password && usuario.trim() && password.trim());