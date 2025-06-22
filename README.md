# Framework de Automatización de QA

Este proyecto implementa un framework de automatización de QA usando **Node.js**, **Playwright** y el **patrón Screenplay**, siguiendo los principios SOLID y las mejores prácticas de POO.

## 🎯 Objetivos del Proyecto

### Ejercicio #1: Framework BDD
- Implementación de escenarios BDD usando Cucumber
- Automatización de inicio de sesión en una URL

### Ejercicio #2: Estructura de Automatización
- **Netflix (Web)**: Navegación, maximización de pantalla, extracción de títulos de películas de suspenso
- **Gmail (Móvil)**: Login en aplicación móvil, validación de mensajes de éxito

## 🏗️ Arquitectura del Proyecto

### Patrón Screenplay Implementado

```
src/
├── Actor.js                    # Clase central del patrón Screenplay
├── abilities/
│   └── BrowseTheWeb.js         # Habilidad para navegar en la web
├── actions/
│   ├── Action.js               # Clase base para acciones
│   ├── Navigate.js             # Acción de navegación
│   └── MaximizeWindow.js       # Acción de maximizar ventana
├── questions/
│   ├── Question.js             # Clase base para preguntas
│   └── CurrentUrl.js           # Pregunta para obtener URL actual
├── tasks/
│   ├── Task.js                 # Clase base para tareas
│   ├── NetflixTask.js          # Tarea para automatizar Netflix
│   └── GmailTask.js            # Tarea para automatizar Gmail
└── pages/
    ├── NetflixPage.js          # Page Object para Netflix
    └── GmailPage.js            # Page Object para Gmail
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd qa-automation-framework

# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npm run test:install
```

## 📋 Scripts Disponibles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con navegador visible
npm run test:headed

# Ejecutar tests en modo debug
npm run test:debug

# Ejecutar tests específicos
npm run test:netflix
npm run test:gmail

# Ejecutar tests BDD con Cucumber
npm run test:bdd

# Generar y mostrar reportes
npm run test:report

# Generar código con Playwright
npm run test:codegen

# Ejecutar tests con UI de Playwright
npm run test:ui
```

## 🎭 Patrón Screenplay

### Conceptos Implementados

1. **Actor**: Representa al usuario que ejecuta las acciones
2. **Abilities (Habilidades)**: Capacidades que tiene el actor (ej: navegar en la web)
3. **Actions (Acciones)**: Comportamientos que el actor puede realizar
4. **Questions (Preguntas)**: Información que el actor puede obtener
5. **Tasks (Tareas)**: Combinaciones de acciones para lograr un objetivo

### Ejemplo de Uso

```javascript
// Crear un actor con habilidades
const actor = Actor.named('UsuarioPrueba')
    .whoCan('browseTheWeb', browseTheWeb);

// Ejecutar una tarea
const resultados = await actor.performs(
    NetflixTask.withoutCredentials()
);

// Hacer una pregunta
const urlActual = await actor.asks(CurrentUrl.value());
```

## 🎬 Escenarios Implementados

### Netflix (Web)
- ✅ Navegar a www.netflix.com
- ✅ Maximizar la pantalla
- ✅ Extraer e imprimir URL actual
- ✅ Extraer títulos de tres películas de suspenso
- ✅ Soporte para login con credenciales

### Gmail (Móvil)
- ✅ Acceder a Gmail desde dispositivo móvil
- ✅ Realizar login con credenciales
- ✅ Capturar mensaje de inicio de sesión exitoso
- ✅ Validar acceso exitoso

### BDD con Cucumber
- ✅ Escenarios de login exitoso y fallido
- ✅ Definiciones de pasos en JavaScript
- ✅ Integración con Playwright

## 🔧 Configuración de Credenciales

Para ejecutar tests con credenciales reales, configurar variables de entorno:

```bash
# Para Netflix
export NETFLIX_EMAIL="tu-email@ejemplo.com"
export NETFLIX_PASSWORD="tu-contraseña"

# Para Gmail
export GMAIL_EMAIL="tu-email@gmail.com"
export GMAIL_PASSWORD="tu-contraseña"
```

## 📊 Reportes

El framework genera múltiples tipos de reportes:

- **HTML**: Reporte visual detallado
- **JSON**: Datos estructurados para análisis
- **JUnit**: Compatible con CI/CD
- **Cucumber**: Reportes BDD

### Ver Reportes
```bash
npm run test:report
```

## 🏛️ Principios SOLID Implementados

### 1. Principio de Responsabilidad Única (SRP)
- Cada clase tiene una responsabilidad única
- `BrowseTheWeb` solo maneja navegación
- `NetflixPage` solo maneja elementos de Netflix

### 2. Principio Abierto/Cerrado (OCP)
- Las clases base están abiertas para extensión
- Nuevas acciones pueden extenderse sin modificar código existente

### 3. Principio de Sustitución de Liskov (LSP)
- Las subclases pueden sustituir a las clases base
- `NetflixTask` y `GmailTask` pueden usarse donde se espera `Task`

### 4. Principio de Segregación de Interfaces (ISP)
- Interfaces pequeñas y específicas
- `Action`, `Question`, `Task` son interfaces específicas

### 5. Principio de Inversión de Dependencias (DIP)
- Dependencias se inyectan a través del constructor
- El `Actor` depende de abstracciones, no de implementaciones

## 🎨 Principios POO Implementados

### Encapsulamiento
- Datos privados en clases
- Métodos públicos para interacción

### Herencia
- `NetflixTask` y `GmailTask` heredan de `Task`
- `Navigate` y `MaximizeWindow` heredan de `Action`

### Polimorfismo
- Diferentes implementaciones de `performAs()`
- Métodos que trabajan con tipos base

### Abstracción
- Interfaces claras entre componentes
- Ocultamiento de complejidad de implementación

## 🧪 Esperas Implementadas

### Esperas Explícitas
```javascript
await page.waitForSelector(selector, { timeout: 10000 });
await page.waitForLoadState('networkidle');
```

### Esperas Implícitas
```javascript
await page.goto(url, { waitUntil: 'networkidle' });
```

## 🔄 Listo para CI/CD

El framework está preparado para integración continua:

- Configuración de Playwright para CI
- Reportes compatibles con Jenkins/GitHub Actions
- Variables de entorno para credenciales
- Tests paralelos y reintento automático

## 📝 Próximas Mejoras

- [ ] Soporte para múltiples navegadores
- [ ] Integración con Allure para reportes avanzados
- [ ] Tests de API
- [ ] Soporte para base de datos
- [ ] Configuración de diferentes entornos

## 🤝 Contribución

1. Hacer fork del proyecto
2. Crear una rama para tu funcionalidad
3. Hacer commit de tus cambios
4. Hacer push a la rama
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. 