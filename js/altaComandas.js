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

                var mesas = document.getElementById("mesas")

                var div = document.createElement("div")
                div.className = "col"

                var input = document.createElement("input")
                input.className = "mt-2 btn btn-primary p-3"
                input.value = element.numero
                input.type = "button"
                input.id = element._id
                input.addEventListener("click", function() {
                    if (this.className == "mt-2 btn btn-danger p-3" ) {
                            this.className = "mt-2 btn btn-primary p-3"
                    } else {
                        this.className = "mt-2 btn btn-danger p-3"
                    }
        
                })

                div.appendChild(input)
                mesas.appendChild(div)
            }))
        })


    fetch('https://restaurante.serverred.es/api/bebidas', {
            method: 'GET',
            headers: {
                'Auth-Token': getToken()
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.data.data.forEach(element => {
                console.log(element)

                var bebidas = document.getElementById("bebidas")

                var div = document.createElement("div")
                div.className = "col"

                var input = document.createElement("input")
                input.className = "mt-2 btn btn-info p-3"
                input.value = element.nombre
                input.type = "button"
                input.id = element._id
                input.addEventListener("click", function() {
                    if (this.className == "mt-2 btn btn-danger p-3" ) {
                            this.className = "mt-2 btn btn-info p-3"
                    } else {
                        this.className = "mt-2 btn btn-danger p-3"
                    }
        
                })

                div.appendChild(input)
                bebidas.appendChild(div)

            }))
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



                switch (element.orden) {
                    case "Primero":
                        var platosPrimero = document.getElementById("platosPrimero")

                        var div = document.createElement("div")
                        div.className = "col"

                        var input = document.createElement("input")
                        input.className = "mt-2 btn btn-warning p-3"
                        input.value = element.nombre
                        input.type = "button"
                        input.id = element._id

                        input.addEventListener("click", function() {
                            if (this.className == "mt-2 btn btn-danger p-3" ) {
                                    this.className = "mt-2 btn btn-warning p-3"
                            } else {
                                this.className = "mt-2 btn btn-danger p-3"
                            }
                
                        })

                        div.appendChild(input)
                        platosPrimero.appendChild(div)

                        break;
                    case "Segundo":

                    var platosSegundo = document.getElementById("platosSegundo")

                    var div = document.createElement("div")
                    div.className = "col"

                    var input = document.createElement("input")
                    input.className = "mt-2 btn btn-warning p-3"
                    input.value = element.nombre
                    input.type = "button"
                    input.id = element._id
                    input.addEventListener("click", function() {
                        if (this.className == "mt-2 btn btn-danger p-3" ) {
                                this.className = "mt-2 btn btn-warning p-3"
                        } else {
                            this.className = "mt-2 btn btn-danger p-3"
                        }
            
                    })

                    div.appendChild(input)
                    platosSegundo.appendChild(div)
                        break;
                    case "Postre":
                        var platosPostre = document.getElementById("platosPostre")

                        var div = document.createElement("div")
                        div.className = "col"

                        var input = document.createElement("input")
                        input.className = "mt-2 btn btn-warning p-3"
                        input.value = element.nombre
                        input.type = "button"
                        input.id = element._id
                        input.addEventListener("click", function() {
                            if (this.className == "mt-2 btn btn-danger p-3" ) {
                                    this.className = "mt-2 btn btn-warning p-3"
                            } else {
                                this.className = "mt-2 btn btn-danger p-3"
                            }
                
                        })

                        div.appendChild(input)
                        platosPostre.appendChild(div)
                        break;
                    default:
                        break;
                }

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