import Cookies from "js-cookie";

export function logout() {
    if (confirm('Deseja realmente sair?') === true){
        Cookies.remove('Authorization')
        window.location.href = '/'
    }
}