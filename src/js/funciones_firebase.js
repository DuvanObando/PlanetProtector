import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCWginihqxxOLUh6IZI4nOqI6Nmb02qsoQ",
    authDomain: "planet-protector-46e02.firebaseapp.com",
    projectId: "planet-protector-46e02",
    storageBucket: "planet-protector-46e02.appspot.com",
    messagingSenderId: "766797752497",
    appId: "1:766797752497:web:62b5d1262c1c491a661a90",
    measurementId: "G-HN1H1BP23E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Una función para mostrar un error de firebase en la consola con un mensaje que indique la ubicación del error.
function mostrarErrorEnConsola(error, mensaje) {
    console.error(mensaje);
    console.error(`Código del error: ${error.code}`);
    console.error(`Mensaje del error: ${error.message}`);
}

// Para el registro de usuarios se usó Firebase Auth, un servicio que permite la creación de usuarios de forma fácil.
// El atributo 'informacionPersonal' espera un diccionario con el nombre del campo y el valor del campo (por ejemplo 'nombre': 'Juanito Gacha')
export function registrarVoluntario(correoElectronico, contrasena, informacionPersonal) {
    // Crea un usuario con un correo electrónico y una contraseña.
    // Hay algunos campos que el objeto user acepta, como el nombre o el número de teléfono, pero no
    // tiene predefinido, por ejemplo, el campo de número de documento, hoja de vida, y otros. Para los
    // campos que vienen predefinidos dentro del objeto toca almacenarlos en la base de datos de forma convencional.
    createUserWithEmailAndPassword(auth, correoElectronico, contrasena)
    .then((credencialesUsuario) => {
        const user = credencialesUsuario.user;
        // Se edita el campo de nombre.
        updateProfile(user, {
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
        const referenciaDocumento = setDoc(doc(db, "voluntarios", user.uid), {
            numeroDocumento: informacionPersonal["numeroDocumento"],
        })
        .then(() => {
            // OK.
        })
        .catch((error) => {
            mostrarErrorEnConsola(error, "Error al momento de crear documento");
        });
    })
    .catch((error) => {
        mostrarErrorEnConsola(error, "Error al momento de crear usuario");
    });
}

// Para el registro de usuarios se usó Firebase Auth, un servicio que permite la creación de usuarios de forma fácil.
// El atributo 'informacionPersonal' espera un diccionario con el nombre del campo y el valor del campo (por ejemplo 'nombre': 'Juanito Gacha')
export function registrarOrganizacion(correoElectronico, contrasena, informacionOrganizacional) {
    // Crea un usuario con un correo electrónico y una contraseña.
    // Hay algunos campos que el objeto user acepta, como el nombre o el número de teléfono, pero no
    // tiene predefinido, por ejemplo, el campo de número de documento, hoja de vida, y otros. Para los
    // campos que vienen predefinidos dentro del objeto toca almacenarlos en la base de datos de forma convencional.
    createUserWithEmailAndPassword(auth, correoElectronico, contrasena)
    .then((credencialesUsuario) => {
        const user = credencialesUsuario.user;
        // Se edita el campo de nombre.
        updateProfile(user, {
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
        const referenciaDocumento = setDoc(doc(db, "organizaciones", user.uid), {
            nit: informacionOrganizacional["nit"],
        })
        .then(() => {
            // OK.
        })
        .catch((error) => {
            mostrarErrorEnConsola(error, "Error al momento de crear documento");
        });
    })
    .catch((error) => {
        mostrarErrorEnConsola(error, "Error al momento de crear usuario");
    });
}