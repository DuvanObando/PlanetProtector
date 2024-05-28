import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js'


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

// En Firebase, una colección es un grupo de documentos. Los documentos son equivalentes a los registros en una base de datos convencional.

// Crea un documento en la base de datos, y retorna el id de tal documento.
export async function crearDocumento(nombreColeccion, datos) {
    try {
        const referenciaDocumento = await addDoc(collection(db, nombreColeccion), datos);
        return referenciaDocumento.id;
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de crear documento.");
    }
}

// Retorna un objeto que representa un documento de la colección especificada con un id.
export async function cargarDocumento(nombreColeccion, id) {
    const referenciaDocumento = doc(db, nombreColeccion, id);
    return await getDoc(referenciaDocumento);
}

// Retorna una lista de documentos que pasen el filtro (un query).
export async function cargarDocumentos(filtro) {
    const documentos = [];
    try {
        const snapshotQuery = await getDocs(filtro);
        snapshotQuery.forEach((doc) => {
            documentos.push(doc);
        });
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de cargar documentos.");
    }
    return documentos;
}

// Retorna el objeto con la información de la oferta, sacado de la base de datos.
export async function cargarOfertas(preferencias) {
    // Una búsqueda que retorna todas las ofertas que contengan al menos alguna de las preferencias.
    const q = query(collection(db, "ofertas"), where("preferencias", "array-contains-any", preferencias));
    return await cargarDocumentos(q);
}

// Retorna una lista con los objetos que representan las postulaciones de cierto voluntario
// con el estado proveído.
export async function cargarPostulaciones(idVoluntario, estado) {
    const q = query(collection(db, "postulaciones"), where("voluntario", "==", idVoluntario), where("estado", "==", estado));
    return await cargarDocumentos(q);
}

// Edita cierto documento con el id especificado.
// Si el documento no existe, lo crea.
export async function editarDocumento(nombreColeccion, id, datos) {
    try {
        await setDoc(doc(db, nombreColeccion, id), datos, {merge: true});
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de crear documento con id.");
    }
}

// Mira si un registro en la colección 'coleccion' con id 'id_registro' existe.
export async function existeDocumento(nombreColeccion, id) {
    const referenciaDocumento = doc(db, nombreColeccion, id);
    try {
        const snapshotDocumento = await getDoc(referenciaDocumento);
        return snapshotDocumento.exists();
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de comprobar la existencia de un registro.");
    }
}

// Inicia sesión de usuario y retorna al objeto que lo representa.
// Puede retornar null si hay un error al momento de iniciar sesión.
export async function iniciarSesion(correoElectronico, contrasena) {
    let usuario;
    let tipoUsuario;
    try {
        const credencialesUsuario = await signInWithEmailAndPassword(auth, correoElectronico, contrasena);
        usuario = credencialesUsuario.user;
        if (await existeDocumento("voluntarios", usuario.uid)) {
            tipoUsuario = "voluntario";
        } else if (await existeDocumento("organizaciones", usuario.uid)) {
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

// Retorna un url de descarga para un archivo en la base de datos.
export async function obtenerURLArchivo(ubicacionArchivo) {
    try {
        return await getDownloadURL(ref(storage, ubicacionArchivo));
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de obtener el archivo " + ubicacionArchivo);
    }
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
        await editarDocumento("voluntarios", voluntario.uid, {
            numeroDocumento: informacionPersonal["numeroDocumento"],
        });
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
        await editarDocumento("organizaciones", organizacion.uid, {
            numeroDocumento: informacionOrganizacional["nit"],
        });
    } catch (error) {
        mostrarErrorEnConsola(error, "Error al momento de crear organización");
    }
}

// Sube un archivo en la ubicación específicada en Firebase. El nombre del archivo en la base de datos será, predeterminadamente, el mismo nombre del archivo en la máquina local.
export async function subirArchivo(archivo, ubicacion, nombreArchivo = archivo["name"]) {
    // Referencia remota del archivo en Firebase
    ubicacion = ubicacion.replace(/^\/*|\/*$/g, "");
    const referenciaArchivo = ref(storage, `${ubicacion}/${nombreArchivo}`);
    const snapshot = await uploadBytes(referenciaArchivo, archivo);
}
