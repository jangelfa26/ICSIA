export default function RootLayout({ children }) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
      </head>
      <body className="bg-light">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
          <div className="container">
            <a className="navbar-brand fw-bold fs-3" href="/">CineDB</a>  {/* ← HOME */}
            <div className="navbar-nav ms-auto">
              <a className="nav-link" href="/movies">Películas</a>
              <a className="nav-link" href="/actors">Actores</a>
            </div>
          </div>
        </nav>
        <main className="container">
          {children}
        </main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  )
}
