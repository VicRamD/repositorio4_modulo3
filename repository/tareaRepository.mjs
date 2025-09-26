import fs from 'fs'; //Importamos el modulo del sistema de archivos Node.js
import path from 'path'; //Modulo para manejar rutas de archivos

import { fileURLToPath } from 'url'; // Para obtener la ruta del archivo actual
// Importamos la interfaz de persistencia
import TareasDataSource from './tareasDataSource.mjs';
import Tarea from '../models/tarea.mjs'; // Importamos el modelo Tarea

// Obtener la ruta del archivo de tareas
const __filename = fileURLToPath(import.meta.url);
/** 
 * import.meta es un objeto especial que contiene metadatos sobre el módulo actual en ejecución. 
 * Dentro de este objeto, la propiedad url contiene la URL completa del archivo del módulo actual. 
 * En entornos Node.js con módulos ES, esta URL comienza con el protocolo file:// seguido de la ruta del archivo en formato URL.
 */

const __dirname = path.dirname(__filename);
/**
 * La función fileURLToPath que se importa del módulo 'url' convierte esta URL de archivo (por 
 * ejemplo, file:///home/user/proyecto/archivo.js) a una ruta de sistema de archivos estándar 
 * (por ejemplo, /home/user/proyecto/archivo.js en sistemas Unix).
 */

const filePath = path.join(__dirname, '../tareas.txt');

//Implementación concreta que extiende la interfaz TareasDataSource
export default class TareaRepository extends TareasDataSource {
    constructor() {
        super(); // Llamada al constructor de la clase base
    }

    // Implementación del método obtenerTodas()
    obtenerTodas() {
        try {
            // Leer el archivo de texto en formato UTF-8
            const data = fs.readFileSync(filePath, 'utf-8');
            // Convertir el contenido del archivo en un array de objetos JSON
            const tareas = JSON.parse(data);
            // Convertir cada tarea en una instancia de la clase Tarea
            return tareas.map(tareaData => new Tarea(
                tareaData.id,
                tareaData.titulo,
                tareaData.descripcion,
                tareaData.completado
            ));
        } catch (error) {
            // Si ocurre un error, como que el archivo no exista, devolvemos un array vacío
            console.error('Error al leer el archivo de tareas:', error);
            return [];
        }
    }

    // Implementación del método guardar()
    guardar(tareas) {
        try {
            // Convertimos el array de tareas a una cadena JSON con indentación de 2 espacios
            const data = JSON.stringify(tareas, null, 2);
            // Guarda la cadena JSON en el archivo de texto
            fs.writeFileSync(filePath, data, 'utf-8');
        } catch (error) {
            // Si ocurre un error al guardar los datos, mostramos el error
            console.error('Error al guardar las tareas:', error);
        }
    }

    // Implementación del método eliminar()
    eliminar(id) {
        try {
            const tareas = this.obtenerTodas(); // Obtener todas las tareas existentes
            // Filtrar la tarea por ID
            const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
            this.guardar(tareasActualizadas); // Guarda la lista actualizada
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    }
}
