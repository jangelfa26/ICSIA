import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Blog de Recetas",
  description: "Aplicación de recetas"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>

        <header className="header">
          <div className="contenedor header-contenido">
            <Link href="/" className="logo">
              Blog de Recetas
            </Link>
          </div>
        </header>

        <main className="contenedor">
          {children}
        </main>

      </body>
    </html>
  );
}