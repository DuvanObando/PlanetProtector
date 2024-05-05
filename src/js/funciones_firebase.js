import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCWginihqxxOLUh6IZI4nOqI6Nmb02qsoQ",
    authDomain: "planet-protector-46e02.firebaseapp.com",
    projectId: "planet-protector-46e02",
    storageBucket: "planet-protector-46e02.appspot.com",
    messagingSenderId: "766797752497",
    appId: "1:766797752497:web:62b5d1262c1c491a661a90",
    measurementId: "G-HN1H1BP23E",
};

// Inicialización de las variables de Firebase.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();
const db = getFirestore(app);

// En Firebase, una colección es un grupo de documentos. Los documentos son equivalentes a los registros en
// una base de datos convencional.

// Mira si un registro en la colección 'coleccion' con id 'id_registro' existe.
export async function existeRegistro(coleccion, idRegistro) {
    const referenciaDocumento = doc(db, coleccion, idRegistro);
    const snapshotDocumento = await getDoc(referenciaDocumento);
    return snapshotDocumento.exists();
}

// Inicia sesión de usuario y retorna al objeto que lo representa.
// Puede retornar null si hay un error al momento de iniciar sesión.
export async function iniciarSesion(correoElectronico, contrasena) {
    var usuario;
    var tipoUsuario;
    await signInWithEmailAndPassword(auth, correoElectronico, contrasena)
    .then(async (credencialesUsuario) => {
        usuario = credencialesUsuario.user;
        // Se comprueba el tipo de usuario.
        if (await existeRegistro("voluntarios", usuario.uid)) {
            tipoUsuario = "voluntario";
        } else if (await existeRegistro("organizaciones", usuario.uid)) {
            tipoUsuario = "organización";
        }
    })
    .catch((error) => {
        mostrarErrorEnConsola(error, "Error al momento de iniciar la sesión del usuario.");
        tipoUsuario = error.code;
    });
    return [usuario, tipoUsuario];
}

// Una función para mostrar un error de firebase en la consola con un mensaje que indique la ubicación del error.
function mostrarErrorEnConsola(error, mensaje) {
    console.error(mensaje);
    console.error(`Código del error: ${error.code}`);
    console.error(`Mensaje del error: ${error.message}`);
}

// Manda un link de reestablecimiento de contraseña al correo proveido.
export async function reestablecerContrasena(correoElectronico) {
    await sendPasswordResetEmail(auth, correoElectronico)
    .then(() => {
        alert("Link de reestablecimiento de contraseña enviado. Revisa tu correo.");
    })
    .catch((error) => {
        mostrarErrorEnConsola(error, "Error al momento de enviar correo de reestablecimiento de contraseña.")
    });
}

// Para el registro de usuarios se usó Firebase Auth, un servicio que permite la creación de usuarios de forma fácil.
// El atributo 'informacionPersonal' espera un diccionario con el nombre del campo y el valor del campo (por ejemplo 'nombre': 'Juanito Gacha')
export async function registrarVoluntario(correoElectronico, contrasena, informacionPersonal) {
    // Crea un usuario con un correo electrónico y una contraseña.
    // Hay algunos campos que el objeto user acepta, como el nombre o el número de teléfono, pero no
    // tiene predefinido, por ejemplo, el campo de número de documento, hoja de vida, y otros. Para los
    // campos que vienen predefinidos dentro del objeto toca almacenarlos en la base de datos de forma convencional.
    await createUserWithEmailAndPassword(auth, correoElectronico, contrasena)
    .then((credencialesUsuario) => {
        const usuario = credencialesUsuario.user;
        // Se edita el campo de nombre.
        updateProfile(usuario, {
            displayName: informacionPersonal["nombre"],
        })
        .then(() => {
            // OK.
        })
        .catch((error) => {
            mostrarErrorEnConsola(error, "Error al momento de editar información de usuario");
        });
        // Se edita el campo de número de documento.
        // En la base de datos se guarda el usuario con el uid que proporciona Firebase Auth.
        const referenciaDocumento = setDoc(doc(db, "voluntarios", usuario.uid), {
            numeroDocumento: informacionPersonal["numeroDocumento"],
        })
        .then(() => {
            // OK.
        })
        .catch((error) => {
            mostrarErrorEnConsola(error, "Error al momento de crear documento");
        });
        alert("Registro completado.");
        window.location.href = "/src/html/log-in.html";
    })
    .catch((error) => {
        mostrarErrorEnConsola(error, "Error al momento de crear usuario");
    });
}

// Para el registro de usuarios se usó Firebase Auth, un servicio que permite la creación de usuarios de forma fácil.
// El atributo 'informacionPersonal' espera un diccionario con el nombre del campo y el valor del campo (por ejemplo 'nombre': 'Juanito Gacha')
export async function registrarOrganizacion(correoElectronico, contrasena, informacionOrganizacional) {
    // Crea un usuario con un correo electrónico y una contraseña.
    // Hay algunos campos que el objeto user acepta, como el nombre o el número de teléfono, pero no
    // tiene predefinido, por ejemplo, el campo de número de documento, hoja de vida, y otros. Para los
    // campos que vienen predefinidos dentro del objeto toca almacenarlos en la base de datos de forma convencional.
    await createUserWithEmailAndPassword(auth, correoElectronico, contrasena)
    .then((credencialesUsuario) => {
        const usuario = credencialesUsuario.user;
        // Se edita el campo de nombre.
        updateProfile(usuario, {
            displayName: informacionOrganizacional["nombre"],
        })
        .then(() => {
            // OK.
        })
        .catch((error) => {
            mostrarErrorEnConsola(error, "Error al momento de editar información de usuario");
        });
        // Se edita el campo de número de NIT.
        // En la base de datos se guarda el usuario con el uid que proporciona Firebase Auth.
        const referenciaDocumento = setDoc(doc(db, "organizaciones", usuario.uid), {
            nit: informacionOrganizacional["nit"],
        })
        .then(() => {
            // OK.
        })
        .catch((error) => {
            mostrarErrorEnConsola(error, "Error al momento de crear documento");
        });
        alert("Registro completado.");
        window.location.href = "/src/html/log-in.html";
    })
    .catch((error) => {
        mostrarErrorEnConsola(error, "Error al momento de crear usuario");
    });
}