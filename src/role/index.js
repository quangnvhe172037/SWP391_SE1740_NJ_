function getRole() {
    const role = {
        isLogin: sessionStorage.getItem('isLogin') || false,
        rememberme: JSON.parse(localStorage.getItem('rememberme')) || false,
        token: JSON.parse(localStorage.getItem('token')) || null,
        role: 'Customer'
    }
    if((!role.isLogin && !role.rememberme) || !role.token)
    {
        role.token=''
        role.role=null
        role.isLogin=false
        role.rememberme=false
    }
    return role
}

function getCurrentUser() {
//   const jwt = require('jsonwebtoken')
//   const token= localStorage.getItem('token') || ''
//   const secret ='jsadjaskjdiasdii12389nn182'
//   try {
//   return jwt.verify(token,secret);

// } catch (error) {
//   return null
// }
    return null;
}

export default getRole;