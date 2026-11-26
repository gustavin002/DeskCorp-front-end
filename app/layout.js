import { Suspense } from "react";
import "./globals.css";
import Cabecalho from "../components/Cabecalho/Cabecalho";

export const metadata = { title: "DeskCorp", description: "Controle de chamados de TI" };
export const instant = false;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Cabecalho />
        <main>
          <Suspense fallback={<p>Carregando...</p>}>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}