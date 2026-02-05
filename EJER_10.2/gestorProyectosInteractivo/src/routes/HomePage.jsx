export default function HomePage() {
  return (
    <section className="card">
      <h1>¡Bienvenido!</h1>
      <p>
        Esta es una aplicación de demostración para enseñar conceptos avanzados
        de React Router.
      </p>
      <p>
        Usa la navegación de arriba para explorar los diferentes ejemplos que
        implementan <code>loader</code>, <code>action</code>,{' '}
        <code>useNavigation</code>, <code>useActionData</code>,{' '}
        <code>useSubmit</code>, <code>useFetcher</code>, y carga diferida de
        datos con <code>Await</code>.
      </p>
    </section>
  );
}
