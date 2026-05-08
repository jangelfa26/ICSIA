import "./globals.css";

export const metadata = {
  title: "App de hospital",
  description: "Sistema hospitalario",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <nav className="nav">
          <a href="/">Dashboard</a>
          <a href="/pacientes">Pacientes</a>
          <a href="/medicos">Médicos</a>
          <a href="/citas">Citas</a>
          <a href="/consultas">Consultas</a>
          <a href="/historial">Historial</a>
          <a href="/medicamentos">Medicamentos</a>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}