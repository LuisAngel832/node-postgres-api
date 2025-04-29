var url = "http://localhost:8080/api/users"; // <-- tu URL de usuarios

function postUser() {
  console.log(url);

  var myName = $('#name').val();
  var myEmail = $('#email').val();
  var myAge = $('#age').val();
  var myComments = $('#comments').val();

  if (!myName || !myEmail || !myAge || !myComments) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  var myUser = {
    name: myName,
    email: myEmail,
    age: myAge,
    comments: myComments
  };

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      alert("Usuario creado exitosamente.");
    },
    data: JSON.stringify(myUser)
  });
}

function getUsers() {
  console.log(url);

  $.getJSON(url, function(json) {
    console.log(json);

    var arrUsers = json.users; 

    var htmlTableUsers = '<table border="1">';
    
    htmlTableUsers += `
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Edad</th>
        <th>Comentarios</th>
      </tr>`;

    arrUsers.forEach(function(item) {
      console.log(item);
      htmlTableUsers += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.age}</td>
          <td>${item.comments}</td>
        </tr>`;
    });

    htmlTableUsers += '</table>';
    $('#resultado').html(htmlTableUsers);
  });
}

function updateUser() {
  console.log("Actualizando usuario...");

  var userId = $('#id').val(); 
  var myName = $('#name').val();
  var myEmail = $('#email').val();
  var myAge = $('#age').val();
  var myComments = $('#comments').val();

  if (!userId || !myName || !myEmail || !myAge || !myComments) {
    alert("Todos los campos son obligatorios, incluyendo el ID.");
    return;
  }

  var updatedUser = {
    name: myName,
    email: myEmail,
    age: myAge,
    comments: myComments
  };

  $.ajax({
    url: `${url}/${userId}`, 
    type: 'PUT',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(updatedUser),
    success: function(data) {
      console.log(data);
      alert("Usuario actualizado exitosamente.");
      getUsers(); 
    },
    error: function(err) {
      console.error(err);
      alert("Error al actualizar usuario.");
    }
  });
}

function deleteUser() {
  console.log("Eliminando usuario...");

  var userId = $('#id').val();

  if (!userId) {
    alert("Debes ingresar el ID del usuario para eliminar.");
    return;
  }

  $.ajax({
    url: `${url}/${userId}`, 
    type: 'DELETE',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      alert("Usuario eliminado exitosamente.");
      getUsers(); 
    },
    error: function(err) {
      console.error(err);
      alert("Error al eliminar usuario.");
    }
  });
}
