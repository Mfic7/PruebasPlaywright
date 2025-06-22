const Actor = require('../src/Actor');
const BrowseTheWeb = require('../src/abilities/BrowseTheWeb');
const NetflixTask = require('../src/tasks/NetflixTask');
const GmailTask = require('../src/tasks/GmailTask');

/**
 * Ejemplo de ejecución manual de tests usando el patrón Screenplay
 */
async function runNetflixTest() {
    console.log('\n🎬 === EJECUTANDO TEST NETFLIX ===');
    
    let browseTheWeb;
    try {
        // Crear la habilidad de navegación web
        browseTheWeb = await BrowseTheWeb.using('chromium');
        
        // Crear el actor con la habilidad
        const actor = Actor.named('UsuarioNetflix')
            .whoCan('browseTheWeb', browseTheWeb);
        
        // Ejecutar la tarea de Netflix
        const results = await actor.performs(
            NetflixTask.withoutCredentials()
        );
        
        console.log('\n✅ Test Netflix completado exitosamente');
        console.log('Resultados:', JSON.stringify(results, null, 2));
        
    } catch (error) {
        console.error('❌ Error en test Netflix:', error.message);
    } finally {
        if (browseTheWeb) {
            await browseTheWeb.close();
        }
    }
}

async function runGmailTest() {
    console.log('\n📧 === EJECUTANDO TEST GMAIL ===');
    
    let browseTheWeb;
    try {
        // Crear la habilidad de navegación web para móvil
        browseTheWeb = await BrowseTheWeb.usingMobile('Pixel 5');
        
        // Crear el actor con la habilidad
        const actor = Actor.named('UsuarioGmail')
            .whoCan('browseTheWeb', browseTheWeb);
        
        // Obtener credenciales del entorno o usar valores de prueba
        const email = process.env.GMAIL_EMAIL || 'test@gmail.com';
        const password = process.env.GMAIL_PASSWORD || 'testpassword';
        
        // Ejecutar la tarea de Gmail
        const results = await actor.performs(
            GmailTask.withCredentials(email, password)
        );
        
        console.log('\n✅ Test Gmail completado exitosamente');
        console.log('Resultados:', JSON.stringify(results, null, 2));
        
    } catch (error) {
        console.error('❌ Error en test Gmail:', error.message);
    } finally {
        if (browseTheWeb) {
            await browseTheWeb.close();
        }
    }
}

async function runAllTests() {
    console.log('🚀 === INICIANDO EJECUCIÓN DE TESTS ===');
    
    // Ejecutar test de Netflix
    await runNetflixTest();
    
    // Ejecutar test de Gmail
    await runGmailTest();
    
    console.log('\n🎉 === TODOS LOS TESTS COMPLETADOS ===');
}

// Ejecutar todos los tests si se ejecuta directamente
if (require.main === module) {
    runAllTests().catch(console.error);
}

module.exports = {
    runNetflixTest,
    runGmailTest,
    runAllTests
}; 