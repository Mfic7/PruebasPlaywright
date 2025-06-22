const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const Actor = require('../../src/Actor');
const BrowseTheWeb = require('../../src/abilities/BrowseTheWeb');
const NetflixTask = require('../../src/tasks/NetflixTask');
const NetflixPage = require('../../src/pages/NetflixPage'); // Importar para acceder a la URL

// Aumentar el timeout por defecto para todos los pasos en este archivo
setDefaultTimeout(60 * 1000); // 60 segundos

let actor;
let browseTheWeb;
let taskResult;

// Hook para configurar el actor antes de cada escenario
Before({ tags: "@netflix" }, async function () {
    browseTheWeb = await BrowseTheWeb.using('chromium', { headless: false, slowMo: 50 });
    actor = Actor.named('UsuarioBDD').whoCan('browseTheWeb', browseTheWeb);
});

Given('que estoy en la página de inicio de Netflix', async function () {
    const netflixPage = new NetflixPage();
    await actor.attemptsTo(require('../../src/actions/Navigate').to(netflixPage.getUrl()));
    console.log('Navegando a la página de inicio de Netflix...');
});

When('me logueo con el usuario {string} y la contraseña {string}', async function (username, password) {
    const loginTask = NetflixTask.withCredentials(username, password);
    taskResult = await actor.performs(loginTask);
    console.log(`Intentando login con usuario: ${username}`);
});

Then('debería ver la pantalla de selección de perfiles', async function () {
    console.log('Verificando resultado del login exitoso...');
    expect(taskResult.success).toBe(true, 'El resultado de la tarea de login debería ser exitoso.');
});

Then('debería ver un mensaje de error de inicio de sesión', async function () {
    console.log('Verificando resultado del login fallido...');
    expect(taskResult.success).toBe(false, 'El resultado de la tarea de login debería ser fallido.');
});

// Hook para cerrar el navegador después de cada escenario
After({ tags: "@netflix" }, async function () {
    if (browseTheWeb) {
        console.log('Test de Netflix finalizado. El navegador permanecerá abierto para inspección.');
        // Se comenta la siguiente línea para mantener el navegador abierto para depuración.
        // await browseTheWeb.close();
    }
}); 