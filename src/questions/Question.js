/**
 * Clase base para todas las preguntas en el patrón Screenplay
 */
class Question {
    /**
     * Obtener la respuesta a la pregunta
     * @param {Object} actor - El actor que responde la pregunta
     * @returns {Promise<any>}
     */
    async answeredBy(actor) {
        throw new Error('El método answeredBy debe ser implementado por las subclases');
    }

    /**
     * Crear una nueva instancia de la pregunta
     * @returns {Question}
     */
    static create() {
        return new this();
    }
}

module.exports = Question; 