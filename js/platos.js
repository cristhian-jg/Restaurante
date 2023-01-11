window.onload = function () {

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

                btnModificar.appendChild(document.createTextNode("Modificar"))
                tdModificar.appendChild(btnModificar)
                btnModificar.className = "btn btn-primary btn-lg my-3"

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