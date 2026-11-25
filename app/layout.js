import "./globals.css";
import Cabecalho from "../components/Cabecalho/Cabecalho";

export const metadata = { title: "Help Desk", description: "Controle de chamados de TI" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Cabecalho />
        <main>{children}</main>
      </body>
    </html>
  );
}