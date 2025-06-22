/**
 * Clase base para todas las tareas en el patrón Screenplay
 */
class Task {
    /**
     * Ejecutar la tarea
     * @param {Object} actor - El actor que ejecuta la tarea
     * @returns {Promise<any>}
     */
    async performAs(actor) {
        throw new Error('El método performAs debe ser implementado por las subclases');
    }

    /**
     * Crear una nueva instancia de la tarea
     * @returns {Task}
     */
    static create() {
        return new this();
    }
}

module.exports = Task; 