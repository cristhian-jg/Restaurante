window.onload = main

function main() {
    var salir = document.getElementById("enviar")
    salir.addEventListener("click", logout)
}

function logout() {

    var confirma = confirm("Estas seguro de que quieres cerrar la sesión?")

    if (confirma) {
        if (JSON.parse(localStorage.getItem("token")) != null) {
            localStorage.removeItem("token")
        }
    }

}