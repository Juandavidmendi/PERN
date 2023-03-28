//metodo para recuperar los datos del servidor
// export default function authHeader(){
//     const user = JSON.parse(localStorage.getItem('user'));

//     //si existe el usuario y tiene el token de acceso devuelva un Header con el token
//     if(user && user.accessToken){
//         // return{ Authorization: 'Bearer ' + user.accessToken};
//         return{ 'x-access-token': user.accessToken};
//     }else{
//         return{};
//     }
// }
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem('user')) {
      // for Node.js Express back-end
      return { 'x-access-token': user.acessToken };
    } else { 
      return {};
    }
  }