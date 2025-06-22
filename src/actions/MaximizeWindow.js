const Action = require('./Action');

/**
 * Acción para maximizar la ventana del navegador
 */
class MaximizeWindow extends Action {
    /**
     * Ejecutar la maximización de ventana
     * @param {Object} actor - El actor que ejecuta la acción
     */
    async performAs(actor) {
        const browseTheWeb = actor.abilityTo('browseTheWeb');
        await browseTheWeb.maximizeWindow();
    }

    /**
     * Crear una nueva acción de maximización
     * @returns {MaximizeWindow}
     */
    static browser() {
        return new MaximizeWindow();
    }
}

module.exports = MaximizeWindow; 