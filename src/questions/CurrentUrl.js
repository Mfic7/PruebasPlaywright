const Question = require('./Question');

/**
 * Pregunta para obtener la URL actual
 */
class CurrentUrl extends Question {
    /**
     * Obtener la URL actual
     * @param {Object} actor - El actor que responde la pregunta
     * @returns {Promise<string>}
     */
    async answeredBy(actor) {
        const browseTheWeb = actor.abilityTo('browseTheWeb');
        return await browseTheWeb.getCurrentUrl();
    }

    /**
     * Crear una nueva pregunta para la URL actual
     * @returns {CurrentUrl}
     */
    static value() {
        return new CurrentUrl();
    }
}

module.exports = CurrentUrl; 