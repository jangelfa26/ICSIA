# Proyecto React con Vite - Ejercicios API REST
## Preguntas de Reflexión
### ¿Qué pasaría si no usaras useCallback para envolver addPost? ¿Por qué el useEffect que depende de addPost se ejecutaría en cada renderizado del componente?
Si no usamos useCallback, la funcion addPost se crea de nuevo cada vez que el componente se renderiza, udseEffecy depende de addPost se ejecutaa siempre que se renderiza, aunque no pase nada. useCallback guarda la misma función mientras sus dependencias no cambian, evitando que el efecto se ejecute sin necesidad.