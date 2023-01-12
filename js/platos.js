window.onload = function () {

    var newPlato = document.getElementById("newPlato")

    newPlato.addEventListener("click", function () {

        var form = document.getElementById("formulario")

        var nombre = document.getElementById("nombre")
        var orden = document.getElementById("orden")
        var precio = document.getElementById("precio")

        nombre.value = ""
        orden.value = ""
        precio.value = ""

        form.className = ""

        document.getElementById("cancelar").addEventListener("click", function () {
            document.getElementById("formulario").className = "visually-hidden"
        });

        document.getElementById("confirmar").addEventListener("click", function (evt) {
            fetch('https://restaurante.serverred.es/api/platos', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Auth-Token': getToken()

                    },
                    body: JSON.stringify({
                        nombre: document.getElementById("nombre").value,
                        orden: document.getElementById("orden").value,
                        precio: document.getElementById("precio").value
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

    fetch('https://restaurante.serverred.es/api/platos', {
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

                var tdNombre = document.createElement("td")
                var tdOrden = document.createElement("td")
                var tdPrecio = document.createElement("td")


                tdNombre.appendChild(document.createTextNode(element.nombre))
                tdOrden.appendChild(document.createTextNode(element.orden))
                tdPrecio.appendChild(document.createTextNode(element.precio))

                btnBorrar.appendChild(document.createTextNode("Borrar"))
                tdBorrar.appendChild(btnBorrar)
                btnBorrar.className = "btn btn-primary btn-lg my-3"
                btnBorrar.setAttribute("id", element._id)

                // TODO Falta actualizar la tabla al borrar.

                btnBorrar.addEventListener("click", function () {

                    var confirmar = confirm("Estas seguro de que quieres eliminar esta mesa?")

                    if (confirmar) {
                        fetch('https://restaurante.serverred.es/api/platos/' + this.id, {
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

                    var nombre = document.getElementById("nombre")
                    var orden = document.getElementById("orden")
                    var precio = document.getElementById("precio")

                    var id = this.id;

                    // Mostrar el formulario
                    form.className = ""

                    nombre.value = element.nombre
                    orden.value = element.orden
                    precio.value = element.precio

                    form.addEventListener("submit", function (evt) {
                        fetch('https://restaurante.serverred.es/api/platos/' + id, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    'Auth-Token': getToken()

                                },
                                body: JSON.stringify({
                                    nombre: document.getElementById("nombre").value,
                                    orden: document.getElementById("orden").value,
                                    precio: document.getElementById("precio").value
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
                tr.appendChild(tdNombre)
                tr.appendChild(tdOrden)
                tr.appendChild(tdPrecio)

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