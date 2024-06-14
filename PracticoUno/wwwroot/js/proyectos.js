window.onload = ListadoDeProyectos();

function ListadoDeProyectos() {
    $.ajax({
        // la URL para la petición
        url: '../../Proyectos/ListadoProyectos',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: {},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (listadoProyectos) {

            $("#proyectosModal").modal("hide");
            LimpiarModal();

            let tabla = ``;

            $.each(listadoProyectos, function (index, proyectos) {

                tabla += `
                <tr>
                    <td>${proyectos.nombre}</td>
                    <td>${proyectos.descripcion}</td>
                    <td>${proyectos.fechaInicio}</td>
                    <td>${proyectos.fechaFin}</td>
                    <td>${proyectos.presupuesto}</td>
                    <td>${proyectos.estado}</td>
                    <td class="text-center">
                    <button type="button" class="btn btn-success btn-sm" onclick="ModalEditar(${proyectos.proyectoID})">
                    Editar
                    </button>
                    </td>
                    <td class="text-center">
                    <button type="button" class="btn btn-danger btn-sm" onclick="ValidarEliminacion(${proyectos.proyectoID})">
                    Eliminar
                    </button>
                    </td>
                </tr>
             `;
            });

            document.getElementById("tbody-proyectos").innerHTML = tabla;

        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }
    });
}

function LimpiarModal() {
    document.getElementById("ProyectoID").value = 0;
    document.getElementById("NombreProyecto").value = "";
    document.getElementById("DescripcionProyecto").value = "";
    document.getElementById("FechaInicio").value = 0;
    document.getElementById("FechaFin").value = 0;
    document.getElementById("Presupuesto").value = "";
    document.getElementById("Estado").value = 0;
}

function NuevoProyecto() {
    $("#tituloModal").text("Nuevo Proyecto");
}

function GuardarDatos() {
    let proyectoID = document.getElementById("ProyectoID").value;
    let nombre = document.getElementById("NombreProyecto").value;
    let descripcion = document.getElementById("DescripcionProyecto").value;
    let fechaInicio = document.getElementById("FechaInicio").value;
    let fechaFin = document.getElementById("FechaFin").value;
    let presupuesto = document.getElementById("Presupuesto").value;
    let estado = document.getElementById("Estado").value;

    $.ajax({
        // la URL para la petición
        url: '../../Proyectos/GuardarDatos',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { ProyectoID: proyectoID, Nombre: nombre, Descripcion: descripcion, FechaInicio: fechaInicio, FechaFin: fechaFin, Presupuesto: presupuesto, Estado: estado },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {

            if (resultado != "") {
                alert(resultado)
            }
            ListadoDeProyectos();
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }
    });
}

function ModalEditar(proyectoID) {
    $.ajax({
        // la URL para la petición
        url: '../../Proyectos/ListadoProyectos',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { ProyectoID: proyectoID },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (listadoProyectos) {
            listadoProyecto = listadoProyectos[0];

            document.getElementById("ProyectoID").value = proyectoID
            $("#tituloModal").text("Editar Proyecto");
            document.getElementById("NombreProyecto").value = listadoProyecto.nombre;
            document.getElementById("DescripcionProyecto").value = listadoProyecto.descripcion;
            document.getElementById("FechaInicio").value = listadoProyecto.fechaInicio;
            document.getElementById("FechaFin").value = listadoProyecto.fechaFin;
            document.getElementById("Presupuesto").value = listadoProyecto.presupuesto;
            document.getElementById("Estado").value = listadoProyecto.estado;
            $("#proyectosModal").modal("show");

        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }
    });
}

function ValidarEliminacion(proyectoID) {
    var elimina = confirm("¿Esta seguro que desea eliminar este proyecto?")
    if(elimina == true) {
        EliminarProyecto(proyectoID)
    }
}

function EliminarProyecto(proyectoID) {
    $.ajax({
        // la URL para la petición
        url: '../../Proyectos/EliminarProyecto',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { ProyectoID: proyectoID },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (eliminarProyecto) {
            ListadoDeProyectos();
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el listado');
        }
    });
}