window.onload = function () {

    var mesasSeleccionadas = [];
    var bebidasSeleccionadas = [];
    var platosSeleccionados = [];


    var confirmar = document.getElementById("confirmar")
    confirmar.addEventListener("click", function () {
        
        var nombre = document.getElementById("nombre")
        var comensales = document.getElementById("comensales")
        var notas = document.getElementById("notas")

        fetch('https://restaurante.serverred.es/api/comandas', {
            method: 'POST',
            headers: {
                'Auth-Token': getToken()
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
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
                            mesasSeleccionadas.forEach(function(mesa, index, object) {
                                if(mesa.id === element._id){
                                  object.splice(index, 1);
                                }
                            });
                            console.log(mesasSeleccionadas)
                    } else {
                        this.className = "mt-2 btn btn-danger p-3"
                        mesasSeleccionadas.push({
                            id: element._id,
                            numero: element.numero
                        })
                        console.log(mesasSeleccionadas)
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
                            bebidasSeleccionadas.forEach(function(bebida, index, object) {
                                if(bebida.id === element._id){
                                  object.splice(index, 1);
                                }
                            });
                            console.log(bebidasSeleccionadas)
                    } else {
                        this.className = "mt-2 btn btn-danger p-3"
                        bebidasSeleccionadas.push({
                            id: element._id,
                            numero: element.nombre
                        })
                        console.log(bebidasSeleccionadas)
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
                                    platosSeleccionados.forEach(function(plato, index, object) {
                                        if(plato.id === element._id){
                                          object.splice(index, 1);
                                        }
                                    });
                                    console.log(platosSeleccionados)
                            } else {
                                this.className = "mt-2 btn btn-danger p-3"
                                platosSeleccionados.push({
                                    id: element._id,
                                    numero: element.nombre
                                })
                                console.log(platosSeleccionados)
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
                                platosSeleccionados.forEach(function(plato, index, object) {
                                    if(plato.id === element._id){
                                      object.splice(index, 1);
                                    }
                                });
                                console.log(platosSeleccionados)
                        } else {
                            this.className = "mt-2 btn btn-danger p-3"
                            platosSeleccionados.push({
                                id: element._id,
                                numero: element.nombre
                            })
                            console.log(platosSeleccionados)
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
                                    platosSeleccionados.forEach(function(plato, index, object) {
                                        if(plato.id === element._id){
                                          object.splice(index, 1);
                                        }
                                    });
                                    console.log(platosSeleccionados)
                            } else {
                                this.className = "mt-2 btn btn-danger p-3"
                                platosSeleccionados.push({
                                    id: element._id,
                                    numero: element.nombre
                                })
                                console.log(platosSeleccionados)
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