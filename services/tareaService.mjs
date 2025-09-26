//Importa la capa de persistencia (repositorio)
import TareaRepository from '../repository/tareaRepository.mjs';
import Tarea from '../models/tarea.mjs'; // Importa el modelo de Tarea

//Instancia el repositorio para manejar las tareas
const tareaRepo = new TareaRepository();

//Servicio para obtener todas las tareas
export function listarTareas() {
    // Obtiene todas las tareas desde la capa de persistencia
    return tareaRepo.obtenerTodas();
}

// Servicio para obtener solo las tareas completadas
export function listarTareasCompletadas() {
    // Obtiene todas las tareas desde la capa de persistencia
    const tareas = tareaRepo.obtenerTodas();
    // Filtra las tareas completadas
    return tareas.filter(tarea => tarea.completado);
}

// Servicio para crear una nueva tarea
export function crearTarea(id, titulo, descripcion, completado = false) {
    // Obtiene todas las tareas
    const tareas = tareaRepo.obtenerTodas();
    // Crea una nueva instancia del modelo Tarea
    const nuevaTarea = new Tarea(id, titulo, descripcion, completado);
    // Valida que la tarea tenga un titulo válido
    nuevaTarea.validar();
    // Añade la nueva tarea a la lista de tareas
    tareas.push(nuevaTarea);
    // Guarda la lista actualizada de tareas en el archivo
    tareaRepo.guardar(tareas);
}