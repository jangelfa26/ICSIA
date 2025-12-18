# Ejercicio 2 – Tareas

## 1. **Decisiones de Estado vs. *Memoización*:** En el componente `CardPreview`, necesitas un color de sombra que sea una versión ligeramente más oscura del `primaryColor` del tema. Tienes dos opciones:

### a- añadir `shadowColor` al estado del reducer y calcularlo allí cada vez que `primaryColor` cambie;

### b- calcularlo dentro de `CardPreview` usando `useMemo`.

## Defiende la opción (b), explicando por qué mantiene el estado del `Context` más limpio y cuál es la responsabilidad de `useMemo` en este escenario.

La opción de calcular el color de la sombra dentro de CardPreview usando useMemo es mejor porque evita añadir datos derivados al estado global del ThemeContext. El contexto debe almacenar solo la información base del tema, no valores que se pueden calcular a partir de ella. useMemo se encarga de recalcular el color de la sombra únicamente cuando cambia primaryColor, evitando cálculos innecesarios y manteniendo el estado más limpio y fácil de mantener.