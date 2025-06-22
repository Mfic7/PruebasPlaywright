/**
 * Page Object para Netflix
 */
class NetflixPage {
    constructor() {
        this.url = 'https://www.netflix.com/pe';
        this.selectors = {
            // Selectores para elementos de Netflix
            loginButton: 'a:has-text("Iniciar sesión")',
            // --- Selectores actualizados según feedback del usuario ---
            emailInput: 'input[name="userLoginId"]',
            passwordInput: '[data-uia="field-password"]',
            signInButton: '[data-uia="sign-in-button"]',
            // Selector para la pantalla de perfiles ("¿Quién está viendo?")
            profileGateLabel: '[data-uia="profile-gate-label"]',
            // Selector para la página de inicio post-login (el botón del menú de perfil)
            profileMenuButton: '[data-testid="profile-button"]',
            // Selector para el botón de cerrar sesión
            logoutButton: 'a:has-text("Cerrar sesión")',
            // Selector para el primer perfil de la lista
            firstProfile: '.profile-icon',
            // Selector de error de login
            loginErrorMessage: '[data-uia="error-message-container"]',
            // Selectores para películas (pueden variar según la región)
            movieTitles: '[data-uia="title-card-title"]',
            suspenseMovies: '[data-uia="title-card-title"]', // Se filtrará por contenido
            browseButton: '[data-uia="header-browse-link"]'
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
     * Realizar login en Netflix
     * @param {Object} page - Página de Playwright
     * @param {string} email - Email del usuario
     * @param {string} password - Contraseña del usuario
     */
    async login(page, email, password) {
        try {
            console.log('Haciendo clic en el botón de Iniciar Sesión...');
            // El botón de login puede no existir si ya se está en la página de login
            const loginLink = await page.locator(this.selectors.loginButton).first();
            if (await loginLink.isVisible()) {
                await loginLink.click();
            } else {
                console.log('Ya estamos en la página de login o el botón no es visible.');
            }
            
            console.log('Esperando por el campo de email...');
            await page.waitForSelector(this.selectors.emailInput, { timeout: 15000 });
            
            console.log('Ingresando email...');
            await page.fill(this.selectors.emailInput, email);
            
            console.log('Ingresando contraseña...');
            await page.fill(this.selectors.passwordInput, password);
            
            console.log('Haciendo clic en el botón de Iniciar Sesión del formulario...');
            await page.click(this.selectors.signInButton);
            
        } catch (error) {
            console.log('Error durante el proceso de login en Netflix:', error.message);
        }
    }

    /**
     * Verificar si el login fue exitoso buscando la pantalla de selección de perfil.
     * @param {Object} page - Página de Playwright
     * @returns {Promise<boolean>}
     */
    async isLoginSuccessful(page) {
        try {
            // Un login es exitoso si aparece la pantalla de perfiles, el menú de perfil O el botón de cerrar sesión.
            await page.waitForFunction((selectors) => {
                const profileGate = document.querySelector(selectors.profileGateLabel);
                const profileButton = document.querySelector(selectors.profileMenuButton);
                const logoutButton = document.querySelector(selectors.logoutButton);
                return profileGate || profileButton || logoutButton;
            }, this.selectors, { timeout: 20000 });

            console.log('Login en Netflix exitoso: Se encontró un elemento de la página de inicio (perfil o botón de logout).');
            return true;
        } catch (error) {
            console.log('Login en Netflix fallido: No se pudo confirmar el inicio de sesión.');
            const errorElement = await page.$(this.selectors.loginErrorMessage);
            if (errorElement) {
                const errorMessage = await errorElement.textContent();
                console.log('Mensaje de error encontrado en Netflix:', errorMessage.trim());
            }
            return false;
        }
    }

    /**
     * Seleccionar el primer perfil disponible.
     * @param {Object} page 
     */
    async selectFirstProfile(page) {
        try {
            console.log('Seleccionando el primer perfil disponible...');
            await page.waitForSelector(this.selectors.firstProfile, { timeout: 5000 });
            await page.click(this.selectors.firstProfile);
            console.log('Perfil seleccionado.');
            await page.waitForLoadState('networkidle', { timeout: 10000 });
        } catch (error) {
            console.log('No se pudo seleccionar un perfil o no era necesario.');
        }
    }

    /**
     * Hacer scroll hacia abajo en la página
     * @param {Object} page 
     */
    async scrollDown(page) {
        try {
            console.log('Haciendo scroll hacia abajo...');
            await page.evaluate(() => {
                window.scrollBy(0, document.body.scrollHeight);
            });
            await page.waitForTimeout(1000); // Esperar un momento para que cargue contenido nuevo
        } catch(error) {
            console.log('Error al hacer scroll:', error.message);
        }
    }

    /**
     * Extraer títulos de películas de suspenso
     * @param {Object} page - Página de Playwright
     * @returns {Promise<string[]>}
     */
    async extractSuspenseMovieTitles(page) {
        try {
            await page.waitForSelector(this.selectors.movieTitles, { timeout: 10000 });
            const titles = await page.$$eval(this.selectors.movieTitles, elements => 
                elements.map(el => el.textContent.trim()).filter(text => text.length > 0)
            );
            return titles.slice(0, 3); // Devolver los primeros 3 títulos encontrados
        } catch (error) {
            console.log('Error al extraer títulos de películas:', error.message);
            return ['No se pudieron extraer títulos de películas'];
        }
    }
}

module.exports = NetflixPage; 