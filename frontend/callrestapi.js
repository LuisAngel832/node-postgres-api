var url = "http://localhost:3300/api/users";

function postUser() {
    console.log("Enviando datos a:", url);
    
    // Obtener valores del formulario
    var myName = $('#name').val();
    var myEmail = $('#email').val();
    var myAge = $('#age').val();
    var myComments = $('#comments').val();

    // Validación básica
    if(!myName || !myEmail) {
        $('#resultado').html('<p style="color:red">Nombre y Email son obligatorios</p>');
        return;
    }

    // Crear objeto usuario
    var myuser = {
        name: myName,
        email: myEmail,
        age: myAge,
        comments: myComments
    };
    
    console.log("Datos del usuario:", myuser);

    // Enviar solicitud POST
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(myuser),
        success: function(data) {
            console.log("Respuesta del servidor:", data);
            $('#resultado').html(`
                <p style="color:green">Usuario creado exitosamente!</p>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `);
            
            // Limpiar formulario después del éxito
            $('#name, #email, #age, #comments').val('');
        },
        error: function(error) {
            console.error("Error en la solicitud:", error);
            $('#resultado').html(`
                <p style="color:red">Error al crear usuario</p>
                <pre>${error.responseText || error.statusText}</pre>
            `);
        }
    });
}

function getUsers() {
    console.log("Obteniendo usuarios de:", url);
    
    // Mostrar carga mientras se obtienen los datos
    $('#resultado').html('<p>Cargando usuarios...</p>');
    
    // Enviar solicitud GET
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log("Usuarios recibidos:", data);
            
            if(data.length === 0) {
                $('#resultado').html('<p>No hay usuarios registrados</p>');
                return;
            }
            
            // Crear tabla HTML con los resultados
            let table = `
                <table border="1" style="width:100%">
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Edad</th>
                        <th>Comentarios</th>
                    </tr>
            `;
            
            data.forEach(user => {
                table += `
                    <tr>
                        <td>${user.name || '-'}</td>
                        <td>${user.email || '-'}</td>
                        <td>${user.age || '-'}</td>
                        <td>${user.comments || '-'}</td>
                    </tr>
                `;
            });
            
            table += '</table>';
            $('#resultado').html(table);
        },
        error: function(error) {
            console.error("Error al obtener usuarios:", error);
            $('#resultado').html(`
                <p style="color:red">Error al cargar usuarios</p>
                <pre>${error.responseText || error.statusText}</pre>
            `);
        }
    });
}
function getUsers() {
    console.log("Obteniendo usuarios de:", url);

    // Mostrar mensaje de carga
    $('#resultado').html('<p>Cargando usuarios...</p>');

    $.getJSON(url, function(json) {
        console.log("Respuesta recibida:", json);

        // Verificar si hay datos
        if (!json.users || json.users.length === 0) {
            $('#resultado').html('<p>No hay usuarios registrados</p>');
            return;
        }

        var arrUsers = json.users;
        var htmlTableUsers = '<table border="1" style="width:100%; border-collapse:collapse; margin-top:20px;">';
        
        // Encabezados de la tabla
        htmlTableUsers += `
            <thead>
                <tr style="background-color:#f2f2f2">
                    <th style="padding:8px">ID</th>
                    <th style="padding:8px">Nombre</th>
                    <th style="padding:8px">Email</th>
                    <th style="padding:8px">Edad</th>
                    <th style="padding:8px">Comentarios</th>
                </tr>
            </thead>
            <tbody>
        `;

        // Filas de datos
        arrUsers.forEach(function(item) {
            console.log("Procesando usuario:", item);
            htmlTableUsers += `
                <tr>
                    <td style="padding:8px; border:1px solid #ddd">${item.id || '-'}</td>
                    <td style="padding:8px; border:1px solid #ddd">${item.name || '-'}</td>
                    <td style="padding:8px; border:1px solid #ddd">${item.email || '-'}</td>
                    <td style="padding:8px; border:1px solid #ddd">${item.age || '-'}</td>
                    <td style="padding:8px; border:1px solid #ddd">${item.comments || '-'}</td>
                </tr>
            `;
        });

        htmlTableUsers += '</tbody></table>';
        $('#resultado').html(htmlTableUsers);

    }).fail(function(error) {
        console.error("Error al obtener usuarios:", error);
        $('#resultado').html(`
            <div style="color:red; margin-top:20px">
                <p>Error al cargar usuarios</p>
                <p>${error.statusText || 'Error desconocido'}</p>
            </div>
        `);
    });
}
