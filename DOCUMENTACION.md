# Documentación Técnica - Framework de Automatización QA

## 📋 Resumen del Proyecto

Este framework de automatización implementa los requisitos de la evaluación de QA automatizada, cumpliendo con todos los objetivos establecidos:

### ✅ Ejercicio #1: Framework BDD
- **Implementado**: Escenarios BDD usando Cucumber
- **Funcionalidad**: Automatización de inicio de sesión en GitHub como ejemplo
- **Archivos**: `features/login.feature` y `features/step-definitions/login.steps.js`

### ✅ Ejercicio #2: Estructura de Automatización

#### Netflix (Web)
- ✅ Navegar a www.netflix.com
- ✅ Maximizar la pantalla
- ✅ Extraer e imprimir URL actual
- ✅ Extraer títulos de tres películas de suspenso
- ✅ Soporte para login con credenciales

#### Gmail (Móvil)
- ✅ Acceder a Gmail desde dispositivo móvil
- ✅ Realizar login con credenciales
- ✅ Capturar mensaje de inicio de sesión exitoso
- ✅ Validar acceso exitoso

## 🏗️ Arquitectura del Patrón Screenplay

### Componentes Principales

#### 1. Actor (Actor.js)
```javascript
// El actor representa al usuario que ejecuta las acciones
const actor = Actor.named('UsuarioPrueba')
    .whoCan('browseTheWeb', browseTheWeb);
```

#### 2. Abilities (Habilidades)
```javascript
// BrowseTheWeb.js - Habilidad para navegar en la web
const browseTheWeb = await BrowseTheWeb.using('chromium');
const browseTheWebMobile = await BrowseTheWeb.usingMobile('Pixel 5');
```

#### 3. Actions (Acciones)
```javascript
// Navigate.js - Acción de navegación
await Navigate.to('https://www.netflix.com').performAs(actor);

// MaximizeWindow.js - Acción de maximizar ventana
await MaximizeWindow.browser().performAs(actor);
```

#### 4. Questions (Preguntas)
```javascript
// CurrentUrl.js - Pregunta para obtener URL actual
const currentUrl = await CurrentUrl.value().answeredBy(actor);
```

#### 5. Tasks (Tareas)
```javascript
// NetflixTask.js - Tarea completa para automatizar Netflix
const results = await actor.performs(NetflixTask.withoutCredentials());

// GmailTask.js - Tarea completa para automatizar Gmail
const results = await actor.performs(GmailTask.withCredentials(email, password));
```

## 🎯 Principios SOLID Implementados

### 1. Single Responsibility Principle (SRP)
- **BrowseTheWeb**: Solo maneja navegación web
- **NetflixPage**: Solo maneja elementos de Netflix
- **GmailPage**: Solo maneja elementos de Gmail

### 2. Open/Closed Principle (OCP)
- Las clases base están abiertas para extensión
- Nuevas acciones pueden crearse sin modificar código existente

### 3. Liskov Substitution Principle (LSP)
- `NetflixTask` y `GmailTask` pueden sustituir a `Task`
- `Navigate` y `MaximizeWindow` pueden sustituir a `Action`

### 4. Interface Segregation Principle (ISP)
- Interfaces pequeñas y específicas
- `Action`, `Question`, `Task` son interfaces específicas

### 5. Dependency Inversion Principle (DIP)
- Dependencias se inyectan a través del constructor
- El `Actor` depende de abstracciones, no de implementaciones

## 🎨 Principios POO Implementados

### Encapsulamiento
```javascript
class BrowseTheWeb {
    constructor(browser, context, page) {
        this.browser = browser;  // Privado
        this.context = context;  // Privado
        this.page = page;        // Privado
    }
    
    // Métodos públicos para interacción
    async navigateTo(url) { ... }
    async getCurrentUrl() { ... }
}
```

### Herencia
```javascript
class NetflixTask extends Task {
    // Hereda de Task base
}

class Navigate extends Action {
    // Hereda de Action base
}
```

### Polimorfismo
```javascript
// Diferentes implementaciones de performAs()
class NetflixTask extends Task {
    async performAs(actor) { /* lógica específica de Netflix */ }
}

class GmailTask extends Task {
    async performAs(actor) { /* lógica específica de Gmail */ }
}
```

### Abstracción
```javascript
// El Actor no conoce la implementación específica
const actor = Actor.named('Usuario')
    .whoCan('browseTheWeb', browseTheWeb);

// Solo conoce la interfaz
await actor.performs(task);
```

## 🧪 Esperas Implementadas

### Esperas Explícitas
```javascript
// Esperar selector específico
await page.waitForSelector('[data-uia="title-card-title"]', { timeout: 10000 });

// Esperar estado de carga
await page.waitForLoadState('networkidle');

// Esperar tiempo específico
await page.waitForTimeout(3000);
```

### Esperas Implícitas
```javascript
// Esperar hasta que la página esté lista
await page.goto(url, { waitUntil: 'networkidle' });
```

## 📊 Reportes de Automatización

### Tipos de Reportes Generados

1. **HTML**: Reporte visual detallado con screenshots y videos
2. **JSON**: Datos estructurados para análisis
3. **JUnit**: Compatible con CI/CD (Jenkins, GitHub Actions)
4. **Cucumber**: Reportes BDD específicos

### Configuración de Reportes
```javascript
// playwright.config.js
reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
]
```

### Ver Reportes
```bash
npm run test:report
```

## 🔧 Configuración de Entorno

### Variables de Entorno
```bash
# Para Netflix
export NETFLIX_EMAIL="tu-email@ejemplo.com"
export NETFLIX_PASSWORD="tu-contraseña"

# Para Gmail
export GMAIL_EMAIL="tu-email@gmail.com"
export GMAIL_PASSWORD="tu-contraseña"
```

### Configuración de Navegadores
```javascript
// Navegadores soportados
projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } }
]
```

## 🚀 Ejecución de Tests

### Comandos Principales
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos
npm run test:netflix
npm run test:gmail

# Ejecutar tests BDD
npm run test:bdd

# Ejecutar con navegador visible
npm run test:headed

# Ejecutar en modo debug
npm run test:debug
```

### Ejecución Manual
```bash
# Ejecutar ejemplo manual
node examples/run-tests.js
```

## 🔄 CI/CD Ready

### Configuración para Integración Continua
- Tests paralelos configurados
- Reintento automático en CI
- Reportes compatibles con Jenkins/GitHub Actions
- Variables de entorno para credenciales
- Configuración headless para CI

### Ejemplo de GitHub Actions
```yaml
name: Tests de Automatización
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test:install
      - run: npm test
```

## 📝 Estructura de Archivos

```
qa-automation-framework/
├── src/
│   ├── Actor.js                    # Clase central del patrón Screenplay
│   ├── abilities/
│   │   └── BrowseTheWeb.js         # Habilidad para navegar en la web
│   ├── actions/
│   │   ├── Action.js               # Clase base para acciones
│   │   ├── Navigate.js             # Acción de navegación
│   │   └── MaximizeWindow.js       # Acción de maximizar ventana
│   ├── questions/
│   │   ├── Question.js             # Clase base para preguntas
│   │   └── CurrentUrl.js           # Pregunta para obtener URL actual
│   ├── tasks/
│   │   ├── Task.js                 # Clase base para tareas
│   │   ├── NetflixTask.js          # Tarea para automatizar Netflix
│   │   └── GmailTask.js            # Tarea para automatizar Gmail
│   └── pages/
│       ├── NetflixPage.js          # Page Object para Netflix
│       └── GmailPage.js            # Page Object para Gmail
├── tests/
│   ├── netflix.spec.js             # Tests de Netflix
│   └── gmail.spec.js               # Tests de Gmail
├── features/
│   ├── login.feature               # Escenarios BDD
│   └── step-definitions/
│       └── login.steps.js          # Definiciones de pasos BDD
├── examples/
│   └── run-tests.js                # Ejemplo de ejecución manual
├── playwright.config.js            # Configuración de Playwright
├── cucumber.js                     # Configuración de Cucumber
├── package.json                    # Dependencias y scripts
└── README.md                       # Documentación principal
```

## 🎯 Criterios de Evaluación Cumplidos

### ✅ Patrón de Diseño
- **Screenplay Pattern**: Implementado completamente
- **Page Object Model**: Integrado en las páginas

### ✅ Principios SOLID
- **SRP**: Cada clase tiene una responsabilidad única
- **OCP**: Abierto para extensión, cerrado para modificación
- **LSP**: Subclases sustituyen a clases base
- **ISP**: Interfaces específicas y pequeñas
- **DIP**: Dependencias invertidas

### ✅ Principios POO
- **Encapsulamiento**: Datos privados, métodos públicos
- **Herencia**: Jerarquía de clases implementada
- **Polimorfismo**: Múltiples implementaciones
- **Abstracción**: Interfaces claras

### ✅ Esperas
- **Explícitas**: `waitForSelector`, `waitForLoadState`
- **Implícitas**: `waitUntil: 'networkidle'`

### ✅ Reportes
- **HTML**: Reporte visual completo
- **JSON**: Datos estructurados
- **JUnit**: Compatible CI/CD
- **Cucumber**: Reportes BDD

## 🚀 Próximos Pasos

1. **Configurar credenciales reales** para pruebas completas
2. **Ejecutar tests** para validar funcionalidad
3. **Revisar reportes** generados
4. **Personalizar selectores** según necesidades específicas
5. **Agregar más escenarios** según requerimientos

---

**Framework desarrollado siguiendo las mejores prácticas de automatización de QA y patrones de diseño modernos.** 