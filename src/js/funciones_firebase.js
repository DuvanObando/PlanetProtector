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
    try {
        const credencialesUsuario = await signInWithEmailAndPassword(auth, correoElectronico, contrasena);
        usuario = credencialesUsuario.user;
        if (await existeRegistro("voluntarios", usuario.uid)) {
            tipoUsuario = "voluntario";
        } else if (await existeRegistro("organizaiones", usuario.uid)) {
            tipoUsuario = "organización";
        }
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de iniciar sesión");
    }
    return [usuario, tipoUsuario];
}

// Una función para mostrar un error de firebase en la consola con un mensaje que indique la ubicación del error.
export function mostrarErrorEnConsola(error, mensaje) {
    console.error(mensaje);
    console.error(`Código del error: ${error.code}`);
    console.error(`Mensaje del error: ${error.message}`);
}

// Manda un link de restablecimiento de contraseña al correo proveído.
export async function restablecerContrasena(correoElectronico) {
    try {
        await sendPasswordResetEmail(auth, correoElectronico);
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de enviar correo de reestablecimiento de contraseña.")
    }
}

// Para el registro de usuarios se usó Firebase Auth, un servicio que permite la creación de usuarios de forma fácil.
// El atributo 'informacionPersonal' espera un diccionario con el nombre del campo y el valor del campo (por ejemplo 'nombre': 'Juanito Gacha')
export async function registrarVoluntario(correoElectronico, contrasena, informacionPersonal) {
    try {
        const credencialesUsuario = await createUserWithEmailAndPassword(auth, correoElectronico, contrasena);
        const voluntario = credencialesUsuario.user;
        try {
            await updateProfile(voluntario, {
                displayName: informacionPersonal["nombre"],
            })
        } catch (error) {
            mostrarErrorEnConsola(error, "Error al momento de editar información de usuario");
        }
        try {
            await setDoc(doc(db, "voluntarios", voluntario.uid), {
                numeroDocumento: informacionPersonal["numeroDocumento"],
            })
        } catch (error) {
            mostrarErrorEnConsola(error, "Error al momento de crear documento");
        }
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de crear usuario");
    }
}

// Para el registro de usuarios se usó Firebase Auth, un servicio que permite la creación de usuarios de forma fácil.
// El atributo 'informacionPersonal' espera un diccionario con el nombre del campo y el valor del campo (por ejemplo 'nombre': 'Juanito Gacha')
export async function registrarOrganizacion(correoElectronico, contrasena, informacionOrganizacional) {
    try {
        const credencialesUsuario = await createUserWithEmailAndPassword(auth, correoElectronico, contrasena);
        const organizacion = credencialesUsuario.user;
        try {
            await updateProfile(organizacion, {
                displayName: informacionOrganizacional["nombre"],
            })
        } catch (error) {
            mostrarErrorEnConsola(error, "Error al momento de editar información de organización");
        }
        try {
            await setDoc(doc(db, "organizaciones", organizacion.uid), {
                numeroDocumento: informacionOrganizacional["numeroDocumento"],
            })
        } catch (error) {
            mostrarErrorEnConsola(error, "Error al momento de crear documento de organización");
        }
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de crear organización");
    }
}