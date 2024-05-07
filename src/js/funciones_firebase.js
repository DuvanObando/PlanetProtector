import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
import {getDownloadURL, getStorage, ref} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js'


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
const storage = getStorage(app);

// En Firebase, una colección es un grupo de documentos. Los documentos son equivalentes a los registros en
// una base de datos convencional.

export async function generarOferta(datosOferta) {
    const URLFoto = await obtenerURLArchivo(datosOferta["foto"] + "/foto.png");
    return `<button>
        <div>
            <img src="${URLFoto}" alt="Foto de oferta">
        </div>
        <div>
            ${datosOferta["descripcion"]}
        </div>
    </button>`;
}

// Retorna un url de descarga para un archivo en la base de datos.
export async function obtenerURLArchivo(ubicacionArchivo) {
    try {
        return await getDownloadURL(ref(storage, ubicacionArchivo));
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de obtener el archivo " + ubicacionArchivo);
    }
}

// Retorna el objeto con la información de la oferta, sacado de la base de datos.
export async function cargarOfertas(preferencias) {
    // Una búsqueda que retorna todas las ofertas que contengan al menos alguna de las preferencias.
    var ofertas = [];
    const q = query(collection(db, "ofertas"), where("preferencias", "array-contains-any", preferencias));
    const snapshotQuery = await getDocs(q);
    snapshotQuery.forEach((doc) => {
        ofertas.push(doc);
    })
    return ofertas;
}

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
        } else if (await existeRegistro("organizaciones", usuario.uid)) {
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
                numeroDocumento: informacionOrganizacional["nit"],
            })
        } catch (error) {
            mostrarErrorEnConsola(error, "Error al momento de crear documento de organización");
        }
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de crear organización");
    }
}