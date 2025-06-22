/**
 * Clase Actor que representa al usuario que ejecuta las acciones
 * Siguiendo el patrón Screenplay
 */
class Actor {
    constructor(name) {
        this.name = name;
        this.abilities = new Map();
    }

    /**
     * Crear un nuevo actor
     * @param {string} name - Nombre del actor
     * @returns {Actor}
     */
    static named(name) {
        return new Actor(name);
    }

    /**
     * Agregar una habilidad al actor
     * @param {string} name - Nombre de la habilidad
     * @param {Object} ability - La habilidad a agregar
     * @returns {Actor}
     */
    whoCan(name, ability) {
        this.abilities.set(name, ability);
        return this;
    }

    /**
     * Obtener una habilidad del actor
     * @param {string} name - Nombre de la habilidad
     * @returns {Object}
     */
    abilityTo(name) {
        const ability = this.abilities.get(name);
        if (!ability) {
            throw new Error(`El actor ${this.name} no tiene la habilidad: ${name}`);
        }
        return ability;
    }

    /**
     * Ejecutar una acción
     * @param {Object} action - La acción a ejecutar
     * @returns {Promise<any>}
     */
    async attemptsTo(action) {
        return await action.performAs(this);
    }

    /**
     * Hacer una pregunta
     * @param {Object} question - La pregunta a hacer
     * @returns {Promise<any>}
     */
    async asks(question) {
        return await question.answeredBy(this);
    }

    /**
     * Ejecutar una tarea
     * @param {Object} task - La tarea a ejecutar
     * @returns {Promise<any>}
     */
    async performs(task) {
        return await task.performAs(this);
    }

    /**
     * Obtener el nombre del actor
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * Verificar si el actor tiene una habilidad
     * @param {string} name - Nombre de la habilidad
     * @returns {boolean}
     */
    hasAbility(name) {
        return this.abilities.has(name);
    }
}

module.exports = Actor; 