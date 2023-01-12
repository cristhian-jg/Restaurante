window.onload = function () {

    var newMesa = document.getElementById("newMesa")

    newMesa.addEventListener("click", function () {

        var form = document.getElementById("formulario")

        var numero = document.getElementById("numero")
        var comensales = document.getElementById("comensales")
        var descripcion = document.getElementById("descripcion")

        numero.value = ""
        comensales.value = ""
        descripcion.value = ""

        form.className = ""

        document.getElementById("cancelar").addEventListener("click", function () {
            document.getElementById("formulario").className = "visually-hidden"
        });

        document.getElementById("confirmar").addEventListener("click", function (evt) {
            fetch('https://restaurante.serverred.es/api/mesas', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Auth-Token': getToken()

                    },
                    body: JSON.stringify({
                        numero: document.getElementById("numero").value,
                        comensales: document.getElementById("comensales").value,
                        descripcion: document.getElementById("descripcion").value
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success: ', data)
                    if (data.error != null) {
                        document.getElementById("missatgeError").innerHTML = data.error
                        document.getElementById("missatgeError").className = "text-danger"
                    } else {
                        document.getElementById("missatgeError").innerHTML = "Se creó correctamente"
                        document.getElementById("missatgeError").className = "text-success"
                    }
                })
                .catch((error) => {
                    console.error('Error: ', error)
                })

            evt.preventDefault()
        });

    })

    fetch('https://restaurante.serverred.es/api/mesas', {
            method: 'GET',
            headers: {
                'Auth-Token': getToken()
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.data.data.forEach(element => {
                console.log(element)

                var tbody = document.getElementById("files")

                var tr = document.createElement("tr")
                var tdBorrar = document.createElement("td")
                var btnBorrar = document.createElement("button")
                var tdModificar = document.createElement("td")
                var btnModificar = document.createElement("button")

                var tdNumero = document.createElement("td")
                var tdComensales = document.createElement("td")
                var tdDescripcion = document.createElement("td")


                tdNumero.appendChild(document.createTextNode(element.numero))
                tdComensales.appendChild(document.createTextNode(element.comensales))
                tdDescripcion.appendChild(document.createTextNode(element.descripcion))

                btnBorrar.appendChild(document.createTextNode("Borrar"))
                tdBorrar.appendChild(btnBorrar)
                btnBorrar.className = "btn btn-primary btn-lg my-3"
                btnBorrar.setAttribute("id", element._id)

                // TODO Falta actualizar la tabla al borrar.

                btnBorrar.addEventListener("click", function () {

                    var confirmar = confirm("Estas seguro de que quieres eliminar esta mesa?")

                    if (confirmar) {
                        fetch('https://restaurante.serverred.es/api/mesas/' + this.id, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    'Auth-Token': getToken()
                                }
                            })
                            .then(response => response.json())
                            .then(json => {
                                console.log(json)
                            })
                            .catch((error) => console.error('Error: ', error))
                    }
                })

                btnModificar.appendChild(document.createTextNode("Modificar"))
                tdModificar.appendChild(btnModificar)
                btnModificar.className = "btn btn-primary btn-lg my-3"
                btnModificar.setAttribute("id", element._id)
                btnModificar.addEventListener("click", function () {

                    var form = document.getElementById("formulario")

                    var numero = document.getElementById("numero")
                    var comensales = document.getElementById("comensales")
                    var descripcion = document.getElementById("descripcion")

                    var id = this.id;

                    // Mostrar el formulario
                    form.className = ""

                    numero.value = element.numero
                    comensales.value = element.comensales
                    descripcion.value = element.descripcion

                    form.addEventListener("submit", function (evt) {
                        fetch('https://restaurante.serverred.es/api/mesas/' + id, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    'Auth-Token': getToken()

                                },
                                body: JSON.stringify({
                                    numero: document.getElementById("numero").value,
                                    comensales: document.getElementById("comensales").value,
                                    descripcion: document.getElementById("descripcion").value
                                })
                            })
                            .then(response => response.json())
                            .then(json => {
                                console.log(json)
                            })
                            .catch((error) => console.error('Error: ', error))

                        evt.preventDefault()
                    });
                })

                tr.appendChild(tdBorrar)
                tr.appendChild(tdModificar)
                tr.appendChild(tdNumero)
                tr.appendChild(tdComensales)
                tr.appendChild(tdDescripcion)

                tbody.appendChild(tr)
            }))
        })
}

function getToken() {
    var token

    if (JSON.parse(localStorage.getItem("token")) != null) {
        token = JSON.parse(localStorage.getItem("token"))
    }
    return token;
}