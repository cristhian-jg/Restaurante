window.onload = main

function main() {

    getInfoUser()

    var actualizar = document.getElementById("enviar")
    var avatar = document.getElementById("enviarAvatar")

    actualizar.addEventListener("click", validar, false)
    avatar.addEventListener("click", validarAvatar, false)


}

function getToken() {
    var token

    if (JSON.parse(localStorage.getItem("token")) != null) {
        token = JSON.parse(localStorage.getItem("token"))
    }
    return token;
}

function getInfoUser() {
    fetch('https://restaurante.serverred.es/api/areapersonal', {
        method: 'GET',
        headers: {
            'Auth-Token': getToken()
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data)
            document.getElementById("nom").placeholder = data.data.user.name
            document.getElementById("user").innerHTML = "Àrea personal de " + data.data.user.name
        })

        .catch((error) => {
            console.error('Error', error)
        })
}

function validarAvatar(e) {

    borrarError()

    e.preventDefault()

    var mensajeError = document.getElementById("missatgeError")

    if (validarExtension() && validarSize()) {

        var formData = new FormData()
        var fileField = document.querySelector('input[type="file"]')
        var name =  document.getElementById("nom").placeholder

        formData.append('name', name)
        formData.append('avatar', fileField.files[0])

        fetch('https://userprofile.serverred.es/api/areapersonal/avatar' , {
            method: 'PUT',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Accept' : 'application/json',
                "auth-token": getToken()
            },
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success: ', result)
        })

        return true
    } else {
        console.log("No valido")
        mensajeError.innerHTML = "El formato o el tamaño del fichero no es correcto"
        return false
    }
}

function validarExtension() {
    var avatar = document.getElementById("avatarFile")
    var name = avatar.files[0].name
    var ext = name.split('.').pop()
    ext = ext.toLowerCase()

    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
            return true
        default:
            return false
    }
}

function validarSize() {
    var avatar = document.getElementById("avatarFile")
    var size = avatar.files[0].size

    if (size > 2000000) {
        return false
    }
    return true
}

function validar(e) {
    borrarError()

    e.preventDefault()

    if (validarNombre() && validarPassword() && validarPasswordNueva() && validarPasswordRepetida()) {

        var nombre, password, passwordNueva, passwordRepetida

        nombre = document.getElementById("nom").value
        password = document.getElementById("passworda").value
        passwordNueva = document.getElementById("password").value
        passwordRepetida = document.getElementById("passwordc").value

        mensajeError = document.getElementById("missatgeError")

        const data = {
            name: nombre,
            password: password
        }

        fetch('https://userprofile.serverred.es/api/areapersonal', {
            method: 'PUT',
            headers: {
                'Auth-Token': getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success: ', data)
                mensajeError.innerHTML = data.error

                localStorage.setItem("token", JSON.stringify(data.data.token))

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
        if (element.validity.patternMismatch) {
            mostrarError(element, "El nombre no cumple con el formato correcto.")
        }
        return false
    }
    return true
}

function validarPassword() {
    var element = document.getElementById("password")

    if (!element.checkValidity()) {
        if (element.validity.valueMissing) {
            mostrarError(element, "Es necesario introducir la contraseña.")
        }
        if (element.validity.patternMismatch) {
            mostrarError(element, "La contraseña no cumple con el formato correcto.")
        }
        return false
    }
    return true
}

function validarPasswordNueva() {

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

function validarPasswordRepetida() {
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

function borrarError() {
    var mensajeError

    mensajeError = document.getElementById("missatgeError")
    mensajeError.innerHTML = ""
}