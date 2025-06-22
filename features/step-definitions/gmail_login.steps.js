const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const Actor = require('../../src/Actor');
const BrowseTheWeb = require('../../src/abilities/BrowseTheWeb');
const GmailTask = require('../../src/tasks/GmailTask');
const GmailPage = require('../../src/pages/GmailPage');

// Aumentar el timeout por defecto para todos los pasos en este archivo
setDefaultTimeout(60 * 1000); // 60 segundos

let actor;
let browseTheWeb;
let taskResult;

// Hook para configurar el actor antes de cada escenario de Gmail
Before({ tags: "@gmail" }, async function () {
    browseTheWeb = await BrowseTheWeb.usingMobile('Pixel 5', { headless: false, slowMo: 50 });
    actor = Actor.named('UsuarioMóvilBDD').whoCan('browseTheWeb', browseTheWeb);
});

Given('que estoy en la página de inicio de Gmail en un móvil', async function () {
    const gmailPage = new GmailPage();
    await actor.attemptsTo(require('../../src/actions/Navigate').to(gmailPage.getUrl()));
    console.log('Navegando a la página de inicio de Gmail en móvil...');
});

When('me logueo en Gmail con el usuario {string} y la contraseña {string}', async function (username, password) {
    const loginTask = GmailTask.withCredentials(username, password);
    taskResult = await actor.performs(loginTask);
    console.log(`Intentando login en Gmail con usuario: ${username}`);
});

Then('debería poder acceder a mi bandeja de entrada', async function () {
    console.log('Verificando resultado del login exitoso en Gmail...');
    expect(taskResult.success).toBe(true, 'El resultado de la tarea de login en Gmail debería ser exitoso.');
});

Then('debería recibir un error de autenticación', async function () {
    console.log('Verificando resultado del login fallido en Gmail...');
    expect(taskResult.success).toBe(false, 'El resultado de la tarea de login en Gmail debería ser fallido.');
});

// Hook para cerrar el navegador después de cada escenario de Gmail
After({ tags: "@gmail" }, async function () {
    if (browseTheWeb) {
        console.log('Test de Gmail finalizado. El navegador permanecerá abierto para inspección.');
        // Se comenta la siguiente línea para mantener el navegador abierto para depuración.
        // await browseTheWeb.close();
    }
}); 