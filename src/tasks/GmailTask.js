const Task = require('./Task');
const Navigate = require('../actions/Navigate');
const CurrentUrl = require('../questions/CurrentUrl');
const GmailPage = require('../pages/GmailPage');

/**
 * Tarea para automatizar Gmail en móvil
 */
class GmailTask extends Task {
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
        this.gmailPage = new GmailPage();
    }

    /**
     * Ejecutar la tarea de Gmail
     * @param {Object} actor - El actor que ejecuta la tarea
     * @returns {Promise<Object>}
     */
    async performAs(actor) {
        const results = {
            currentUrl: '',
            loginMessage: '',
            success: false
        };

        try {
            // Navegar a Gmail
            await Navigate.to(this.gmailPage.getUrl()).performAs(actor);
            
            // Obtener URL actual
            results.currentUrl = await CurrentUrl.value().answeredBy(actor);
            console.log('URL actual:', results.currentUrl);
            
            // Realizar login
            if (this.email && this.password) {
                const browseTheWeb = actor.abilityTo('browseTheWeb');
                const page = browseTheWeb.getPage();
                await this.gmailPage.login(page, this.email, this.password);
                
                // Obtener mensaje de login exitoso
                results.loginMessage = await this.gmailPage.getLoginSuccessMessage(page);
                
                // Verificar si el login fue exitoso
                results.success = await this.gmailPage.isLoginSuccessful(page);
            } else {
                results.loginMessage = 'No se proporcionaron credenciales';
                results.success = false;
            }
            
            // Imprimir resultados
            console.log('\n=== RESULTADOS GMAIL ===');
            console.log('URL actual:', results.currentUrl);
            console.log('Mensaje de login:', results.loginMessage);
            console.log('Login exitoso:', results.success);
            
        } catch (error) {
            console.error('Error en la tarea de Gmail:', error.message);
            results.success = false;
            results.loginMessage = `Error: ${error.message}`;
        }

        return results;
    }

    /**
     * Crear una nueva tarea de Gmail
     * @param {string} email - Email del usuario
     * @param {string} password - Contraseña del usuario
     * @returns {GmailTask}
     */
    static withCredentials(email, password) {
        return new GmailTask(email, password);
    }
}

module.exports = GmailTask; 