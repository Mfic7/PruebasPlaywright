const { chromium, firefox, webkit } = require('playwright');

/**
 * Habilidad para navegar en la web siguiendo el patrón Screenplay
 */
class BrowseTheWeb {
    constructor(browser, context, page) {
        this.browser = browser;
        this.context = context;
        this.page = page;
    }

    /**
     * Crear una nueva instancia con el navegador especificado
     * @param {string} browserType - Tipo de navegador ('chromium', 'firefox', 'webkit')
     * @returns {Promise<BrowseTheWeb>}
     */
    static async using(browserType = 'chromium') {
        const browserMap = {
            chromium,
            firefox,
            webkit
        };

        const browser = await browserMap[browserType].launch({
            headless: false,
            slowMo: 1000
        });

        const context = await browser.newContext();
        const page = await context.newPage();

        return new BrowseTheWeb(browser, context, page);
    }

    /**
     * Crear una nueva instancia para dispositivos móviles
     * @param {string} device - Dispositivo móvil
     * @returns {Promise<BrowseTheWeb>}
     */
    static async usingMobile(device = 'Pixel 5') {
        const browser = await chromium.launch({
            headless: false,
            slowMo: 1000
        });

        const context = await browser.newContext({
            ...require('playwright').devices[device]
        });

        const page = await context.newPage();

        return new BrowseTheWeb(browser, context, page);
    }

    /**
     * Navegar a una URL
     * @param {string} url - URL a navegar
     */
    async navigateTo(url) {
        await this.page.goto(url, { waitUntil: 'networkidle' });
    }

    /**
     * Maximizar la ventana del navegador
     */
    async maximizeWindow() {
        await this.page.setViewportSize({ width: 1920, height: 1080 });
    }

    /**
     * Obtener la URL actual
     * @returns {Promise<string>}
     */
    async getCurrentUrl() {
        return await this.page.url();
    }

    /**
     * Cerrar el navegador
     */
    async close() {
        await this.browser.close();
    }

    /**
     * Obtener la página actual
     * @returns {Object}
     */
    getPage() {
        return this.page;
    }

    /**
     * Obtener el contexto actual
     * @returns {Object}
     */
    getContext() {
        return this.context;
    }
}

module.exports = BrowseTheWeb; 