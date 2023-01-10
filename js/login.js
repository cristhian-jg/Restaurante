window.onload = main

function main() {
    var acceder = document.getElementById("enviar")
    acceder.addEventListener("click", validar)
}

function validar(e) {
    borrarError()

    e.preventDefault()

    if (validarCorreo() && validarPassword()) {

        var correo, password, mensajeError

        correo = document.getElementById("email").value
        password = document.getElementById("password").value
        mensajeError = document.getElementById("missatgeError")

        const data = {
            email: correo,
            password: password
        }

        fetch('https://restaurante.serverred.es/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success: ', data)
                mensajeError.innerHTML = data.error

                localStorage.setItem("token", JSON.stringify(data.data.token))
                
                window.location.href = "areaPersonal.html"
            })
            .catch((error) => {
                console.error('Error', error)
            })

        return true
    } else {
        return false
    }
}

function validarCorreo() {
    console.log("FUNCTION: validarCorreo()")

    var element = document.getElementById("email")

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            mostrarError(element, "El correo no puede estar vacío.")
        }
        if (element.validity.patternMismatch) {
            mostrarError(element, "El correo no cumple con el formato correcto.")
        }
        return false
    }
    return true
}

function validarPassword() {
    console.log("FUNCTION: validarPassword()")

    var element = document.getElementById("password")

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            mostrarError(element, "Es necesario introducir una contraseña.")
        }
        if (element.validity.patternMismatch) {
            mostrarError(element, "La contraseña no cumple con el formato correcto.")
        }
        return false
    }
    return true
}

function mostrarError(element, msg) {
    var mensajeError

    mensajeError = document.getElementById("missatgeError")
    mensajeError.innerHTML = msg

    element.focus()
}

function borrarError() {
    var mensajeError

    mensajeError = document.getElementById("missatgeError")
    mensajeError.innerHTML = ""
}