/**
 * Page Object para Gmail (versión móvil)
 */
class GmailPage {
    constructor() {
        this.url = 'https://mail.google.com';
        this.selectors = {
            // Selector para "Usar la versión web" - más robusto
            useWebVersionLink: "a:has-text('Usar la versión web')",
            // Selectores para Gmail móvil - Actualizados para ser más robustos
            emailInput: 'input[type="email"][name="identifier"]',
            nextButton: '#identifierNext button',
            passwordInput: 'input[type="password"][name="Passwd"]',
            passwordNextButton: '#passwordNext button',
            // Selector para el botón de Redactar, señal de login exitoso
            composeButton: 'div[role="button"][gh="cm"]',
            // Mensajes de error/éxito
            errorMessage: '.o6cuMc',
        };
    }

    /**
     * Obtener la URL de la página
     * @returns {string}
     */
    getUrl() {
        return this.url;
    }

    /**
     * Obtener selectores de la página
     * @returns {Object}
     */
    getSelectors() {
        return this.selectors;
    }

    /**
     * Realizar login en Gmail
     * @param {Object} page - Página de Playwright
     * @param {string} email - Email del usuario
     * @param {string} password - Contraseña del usuario
     */
    async login(page, email, password) {
        try {
            await page.waitForLoadState('networkidle');
            
            // Manejar el aviso de "Actualiza a la app de Gmail"
            await this.handleMobileWebPrompt(page);
            
            console.log('Ingresando email en Gmail...');
            await page.waitForSelector(this.selectors.emailInput, { timeout: 15000 });
            await page.fill(this.selectors.emailInput, email);
            await page.waitForTimeout(500); // Pequeña pausa
            await page.click(this.selectors.nextButton);
            
            console.log('Ingresando contraseña en Gmail...');
            await page.waitForSelector(this.selectors.passwordInput, { timeout: 15000 });
            await page.fill(this.selectors.passwordInput, password);
            await page.waitForTimeout(500); // Pequeña pausa
            await page.click(this.selectors.passwordNextButton);
            
        } catch (error) {
            console.log('Error durante el login de Gmail:', error.message);
        }
    }

    /**
     * Maneja el popup/pantalla que sugiere usar la app móvil.
     * @param {Object} page - Página de Playwright
     */
    async handleMobileWebPrompt(page) {
        try {
            console.log('Buscando el enlace "Usar la versión web"...');
            const useWebLink = page.locator(this.selectors.useWebVersionLink);
            await useWebLink.waitFor({ state: 'visible', timeout: 15000 });
            console.log('Enlace encontrado. Haciendo clic para continuar a la versión web.');
            await useWebLink.click();
            await page.waitForLoadState('networkidle');
        } catch (error) {
            console.log('No se encontró el aviso para usar la app móvil, se continúa con el login normal.');
        }
    }

    /**
     * Obtener mensaje de login exitoso
     * @param {Object} page - Página de Playwright
     * @returns {Promise<string>}
     */
    async getLoginSuccessMessage(page) {
        try {
            const isSuccess = await this.isLoginSuccessful(page);
            if(isSuccess) {
                return 'Login en Gmail exitoso: Se encontró la interfaz del inbox.';
            }
            return 'Login en Gmail fallido: No se pudo acceder al inbox.';
        } catch (error) {
            return `Error al obtener mensaje de éxito: ${error.message}`;
        }
    }

    /**
     * Verificar si el login fue exitoso buscando el botón de Redactar.
     * @param {Object} page - Página de Playwright
     * @returns {Promise<boolean>}
     */
    async isLoginSuccessful(page) {
        try {
            // Un timeout más largo para Gmail, ya que puede tardar en cargar
            await page.waitForSelector(this.selectors.composeButton, { timeout: 25000 });
            console.log('Login en Gmail exitoso: Se encontró el botón de Redactar.');
            return true;
        } catch (error) {
            console.log('Login en Gmail fallido: No se pudo encontrar la interfaz del inbox.');
            return false;
        }
    }
}

module.exports = GmailPage; 