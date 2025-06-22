const Task = require('./Task');
const Navigate = require('../actions/Navigate');
const MaximizeWindow = require('../actions/MaximizeWindow');
const CurrentUrl = require('../questions/CurrentUrl');
const NetflixPage = require('../pages/NetflixPage');

/**
 * Tarea para automatizar Netflix
 */
class NetflixTask extends Task {
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
        this.netflixPage = new NetflixPage();
    }

    /**
     * Ejecutar la tarea de Netflix
     * @param {Object} actor - El actor que ejecuta la tarea
     * @returns {Promise<Object>}
     */
    async performAs(actor) {
        const results = {
            currentUrl: '',
            movieTitles: [],
            success: false
        };

        const browseTheWeb = actor.abilityTo('browseTheWeb');
        const page = browseTheWeb.getPage();

        try {
            await Navigate.to(this.netflixPage.getUrl()).performAs(actor);
            await MaximizeWindow.browser().performAs(actor);
            results.currentUrl = await CurrentUrl.value().answeredBy(actor);
            console.log('URL actual:', results.currentUrl);

            if (this.email && this.password) {
                await this.netflixPage.login(page, this.email, this.password);
                
                if (await this.netflixPage.isLoginSuccessful(page)) {
                    results.success = true;
                    console.log('Login exitoso, procediendo a seleccionar perfil...');
                    await this.netflixPage.selectFirstProfile(page);

                    // Hacer scroll hacia abajo para ver más contenido
                    await this.netflixPage.scrollDown(page);
                } else {
                    console.log('El login no fue exitoso. No se continuará con la extracción de títulos.');
                    results.success = false;
                }
            } else {
                // Si no hay credenciales, el "éxito" es simplemente estar en la página
                results.success = true; 
            }

            // Extraer títulos solo si el paso anterior fue exitoso (o no se requería login)
            if (results.success) {
                console.log('Extrayendo títulos de películas...');
                results.movieTitles = await this.netflixPage.extractSuspenseMovieTitles(page);
            }
            
            console.log('\n=== RESULTADOS NETFLIX ===');
            console.log('URL actual:', results.currentUrl);
            console.log('Login Exitoso:', results.success);
            console.log('Títulos de películas extraídos:');
            results.movieTitles.forEach((title, index) => {
                console.log(`${index + 1}. ${title}`);
            });
            
        } catch (error) {
            console.error('Error en la tarea de Netflix:', error.message);
            results.success = false;
        }

        return results;
    }

    /**
     * Crear una nueva tarea de Netflix con credenciales
     * @param {string} email - Email del usuario (opcional)
     * @param {string} password - Contraseña del usuario (opcional)
     * @returns {NetflixTask}
     */
    static withCredentials(email, password) {
        return new NetflixTask(email, password);
    }

    /**
     * Crear una nueva tarea de Netflix sin credenciales
     * @returns {NetflixTask}
     */
    static withoutCredentials() {
        return new NetflixTask();
    }
}

module.exports = NetflixTask; 