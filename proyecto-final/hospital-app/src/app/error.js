"use client";

export default function Error({
  error,
  reset
}) {

  return (
    <div className="error-page">

      <div className="error-card">

        <h1>⚠️ Ha ocurrido un error</h1>

        <p>
          Se produjo un problema cargando la información.
        </p>

        <details>
          <summary>Detalles técnicos</summary>

          <pre>
            {error.message}
          </pre>
        </details>

        <div className="form-actions">

          <button onClick={() => reset()}>
            Reintentar
          </button>

          <button
            className="btn-cancel"
            onClick={() => window.location.href = "/"}
          >
            Ir al inicio
          </button>

        </div>

      </div>

    </div>
  );
}