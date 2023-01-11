window.onload = main

function main() {
    var registrar = document.getElementById("enviar")
    registrar.addEventListener("click", validar)
}

function validar(e) {
    borrarError()

    e.preventDefault()

    if (validarNombre() && validarCorreo() && validarPassword() && validarPasswordC()) {
        
        var nombre, correo, password, mensajeError

        nombre = document.getElementById("nom").value
        correo = document.getElementById("email").value
        password = document.getElementById("password").value
        mensajeError = document.getElementById("missatgeError")

        const data = {
            name: nombre,
            email: correo,
            password: password
        }

        fetch('https://restaurante.serverred.es/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

function validarNombre() {
    console.log("FUNCTION: validarNombre()")

    var element = document.getElementById("nom")

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            mostrarError(element, "El nombre no puede estar vacío.")
        }
        if (element.validity.patternMismatch) {
            mostrarError(element, "El nombre no cumple con el formato correcto.")
        }
        return false
    }
    return true
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


function validarPasswordC() {
    console.log("FUNCTION: validarPasswordC()")

    var element = document.getElementById("passwordc")
    var password = document.getElementById("password")

    console.log(element.value)
    console.log(password.value)

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            mostrarError(element, "Tienes que volver a introducir la contraseña.")
        }
        if (element.value !== password.value) {
            mostrarError(element, "La contraseña no coinicide con la anterior.")
            console.log("No es igual")
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