# Ejercicio 2: Refactorización y Mejora de un Feed de Noticias

## Problemas en el código original

1. **Lógica de filtrado dentro del JSX:**  
   El filtrado se hacía directamente dentro del `.map()`, lo que mezcla la presentación y la lógica.

2. **Uso de `index` como key:**  
   Esto puede causar errores cuando la lista cambia de orden (por ejemplo, al fijar un artículo).

3. **Código poco modular:**  
   Todo estaba en un solo archivo `App.jsx`, lo que lo hace difícil de mantener y leer.

4. **Estilos sin consistencia:**  
   Se usaban estilos inline repetidos en lugar de una estructura con clases o Bootstrap.

## ¿Por qué es fundamental el uso de `key` en React?

Las `key` sirven para que React identifique qué elementos han cambiado, se agregaron o se eliminaron.  
Esto permite reutilizar componentes sin re-renderizar toda la lista, mejorando el rendimiento y manteniendo la identidad visual y funcional de cada elemento.

Sin una key única, React puede confundir los elementos de la lista, causando errores visuales o pérdida de estado interno.


## Despliegue en Netlify
-> https://seccion-noticias-jangelfa26.netlify.app/ 



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
