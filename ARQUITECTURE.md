# ARQUITECTURA DEL PROYECTO

Este documento describe la estructura del proyecto basada en **Next.js 15**, utilizando el **App Router**, **TypeScript**, **ESLint + Prettier** para control de calidad, y **Jest + Testing Library** para pruebas. La arquitectura está diseñada para ser moderna, escalable y fácil de mantener.

---

## Estructura de Directorios

El proyecto sigue una organización clara que separa el código fuente de los archivos de configuración y los assets públicos.

### 📁 src/

Es el directorio raíz de la aplicación. Contiene todo el código fuente del proyecto, lo que ayuda a mantener la raíz del proyecto limpia y organizada.

### 📁 src/app/

El corazón de la nueva arquitectura de Next.js. Los archivos dentro de este directorio definen las rutas de tu aplicación. A diferencia del antiguo `pages/` (Page Router), el `app/` (App Router) permite usar **Server Components** por defecto y manejar estados compartidos y layouts de forma más eficiente.

* **`layout.tsx`**: Define la estructura de la interfaz de usuario que es compartida a través de múltiples rutas. Aquí se definen las etiquetas `<html>` y `<body>`, y componentes como barras de navegación o pies de página que se repiten en toda la aplicación.
* **`page.tsx`**: El archivo que define la interfaz de usuario para una ruta específica. En este caso, **`app/page.tsx`** es la página principal (homepage).
* **`globals.css`**: Contiene los estilos CSS globales que se aplican a toda la aplicación.

### 📁 src/**tests**/

Carpeta destinada a los tests unitarios e integraciones. Contiene archivos `.test.tsx` o `.spec.tsx` que validan el correcto funcionamiento de componentes y páginas usando **Jest** y **React Testing Library**.

Ejemplo: `src/__tests__/page.test.tsx` valida que `Home` renderice correctamente un `<h1>`.

### 📁 public/

Este directorio se usa para servir archivos estáticos, como imágenes, fuentes o el archivo `favicon.ico`. Los archivos aquí se sirven en la raíz del proyecto. Por ejemplo, `public/vercel.svg` se puede acceder en la URL `/vercel.svg`.

---

## Archivos Clave de Configuración

En la raíz del proyecto, varios archivos de configuración controlan el comportamiento de la aplicación y las herramientas de desarrollo.

* **`tsconfig.json`**: El archivo de configuración principal de **TypeScript**. Incluye `types: ["node", "jest"]` para habilitar las definiciones de tipos en tests. También define alias como `@/*` que apunta a `src/*`.
* **`tsconfig.test.json`**: Extiende `tsconfig.json` para el entorno de pruebas, habilitando las opciones necesarias para Jest.
* **`package.json`**: Define las dependencias del proyecto y los scripts, como:

    * `dev`: levanta el servidor de desarrollo (por defecto con **Turbopack**).
    * `dev:webpack`: levanta el servidor de desarrollo usando Webpack.
    * `build`: compila la aplicación para producción.
    * `lint`: corre ESLint y Prettier.
    * `test`: ejecuta Jest.
* **`jest.config.js`**: Configuración de Jest. Define `testEnvironment: "jsdom"`, el archivo de setup (`jest.setup.ts`) y reglas de transformación (`babel-jest` con `next/babel`) para que Jest procese JSX y TS igual que Next.
* **`jest.setup.ts`**: Se ejecuta antes de cada test, importando `@testing-library/jest-dom` para extender los matchers de Jest.
* **`.babelrc`**: Configuración de Babel, usando el preset `next/babel` con `runtime: "automatic"` para habilitar el **nuevo JSX transform**.
* **`.gitignore`**: Le dice a Git qué archivos y directorios debe ignorar, como el directorio `node_modules/` o los logs de compilación.

---

## Herramientas de Calidad y Formato

* **ESLint**: Configurado con `eslint:recommended`, reglas de React, TypeScript y Next.js (`next/core-web-vitals`).
* **Prettier**: Integrado con ESLint (`plugin:prettier/recommended`) para formateo automático y consistente del código.
* **Testing**: Jest + React Testing Library (`@testing-library/react` y `@testing-library/jest-dom`) para unit e integration tests.

---

## Flujo de Desarrollo

1. **Desarrollo**: Ejecutar `npm run dev` para levantar el proyecto con **Turbopack**, o `npm run dev:webpack` si se prefiere usar Webpack.
2. **Linting y formato**: Ejecutar `npm run lint` para detectar problemas de calidad y aplicar formato.
3. **Testing**: Ejecutar `npm test` para correr todos los tests en `src/__tests__`.
4. **Build**: Ejecutar `npm run build` para preparar el proyecto para producción.

---

Con esta configuración, el proyecto está preparado para un flujo moderno con Next.js 15, React 19, TypeScript, ESLint + Prettier y Jest.
