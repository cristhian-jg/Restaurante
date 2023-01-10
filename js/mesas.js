window.onload = function () {

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

                btnModificar.appendChild(document.createTextNode("Modificar"))
                tdModificar.appendChild(btnModificar)
                btnModificar.className = "btn btn-primary btn-lg my-3"

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