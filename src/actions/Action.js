/**
 * Clase base para todas las acciones en el patrón Screenplay
 */
class Action {
    /**
     * Ejecutar la acción
     * @param {Object} actor - El actor que ejecuta la acción
     * @returns {Promise<any>}
     */
    async performAs(actor) {
        throw new Error('El método performAs debe ser implementado por las subclases');
    }

    /**
     * Crear una nueva instancia de la acción
     * @returns {Action}
     */
    static create() {
        return new this();
    }
}

module.exports = Action; 