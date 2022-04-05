//Evento click en el boton de iniciar sesion, muestra el modal con el formulario
$('#iniciarSesion').click(() => {
    $("#modalSesion").modal('show');
});

//Evento click en el boton de aceptar del form, para iniciar sesion si las credenciales son correctas 
$('#btnAceptar').click(async () => {
    const correo = document.querySelector('#txtEmail').value;
    const contraseña = document.querySelector('#txtPassword').value;
    if ((correo === '') || (contraseña === '')) {
        alert('Por favor, ingrese todos los campos del formulario');
    } else if ((contraseña != 'secret')) {
        alert('Contraseña incorrecta');
    } else {
        const token = await postData(correo, contraseña);
        toggleNavBar();
        $(".modal").modal('hide');
    }
});

// Evento click del link para cerrar sesión, muestra la opción para
// iniciar sesión, y oculta las opciones Situación Chile y Cerrar
// Sesión
$('#cerrarSesion').click(() => {
    $('#iniciarSesion').toggle();
    $('#situacionChile').toggle();
    $('#cerrarSesion').toggle();

    localStorage.clear();
    window.location.href = '/covid19/index.html';
});

// Toggle para el NavBar
const toggleNavBar = () => {
    $('#iniciarSesion').toggle();
    $('#situacionChile').toggle();
    $('#cerrarSesion').toggle();
};

// Función asíncrona para generar el JWT
const postData = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/api/login',
            {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password })
            })
        const { token } = await response.json();
        localStorage.setItem('jwt-token', token);
        return token
    } catch (err) {
        console.error(`Error: ${err} `)
    }
}