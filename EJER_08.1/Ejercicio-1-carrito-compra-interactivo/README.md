# Ejercicio 1 – Tareas

## Justificación de Arquitectura: Argumenta por qué useReducer es una mejor opción aquí que usar múltiples useState (ej. useState para los items, useState para el total). ¿Qué problema específico encontrarías durante la implementación de la función “incrementar cantidad” si usaras useState para los items y otro useState para el precio total? 

Se ha utilizado useReducer porque el carrito maneja varias cosas relacionadas entre sí, como los productos y sus cantidades, y es más cómodo tener toda la lógica en un solo sitio. Si se usaran varios useState, por ejemplo uno para los productos y otro para el total, al incrementar la cantidad de un producto habría que actualizar ambos estados a la vez, lo que puede provocar errores o que el total no se calcule bien. Con useReducer y calculando el total a partir del carrito se evita que los datos se desincronicen.

## Análisis de Rendimiento: Si un componente BotonPromocion que no tiene nada que ver con el carrito se re-renderiza cada vez que añades un producto, ¿cuál sería tu primera hipótesis sobre la causa del problema y cómo usarías las React DevTools para confirmarlo?

Si un componente como BotonPromocion se vuelve a renderizar al añadir productos al carrito, lo más probable es que el componente padre se esté renderizando de nuevo y arrastre a los hijos. Para comprobarlo usaría las React DevTools para ver qué componentes se renderizan y revisar si sus props cambian. Normalmente esto pasa por pasar funciones sin memoizar, por lo que usar useCallback ayudaría a evitar renders innecesarios. 

