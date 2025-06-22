const Action = require('./Action');

/**
 * Acción para navegar a una URL específica
 */
class Navigate extends Action {
    constructor(url) {
        super();
        this.url = url;
    }

    /**
     * Ejecutar la navegación
     * @param {Object} actor - El actor que ejecuta la acción
     */
    async performAs(actor) {
        const browseTheWeb = actor.abilityTo('browseTheWeb');
        await browseTheWeb.navigateTo(this.url);
    }

    /**
     * Crear una nueva acción de navegación
     * @param {string} url - URL a navegar
     * @returns {Navigate}
     */
    static to(url) {
        return new Navigate(url);
    }
}

module.exports = Navigate; 