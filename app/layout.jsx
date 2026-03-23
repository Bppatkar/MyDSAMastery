import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "DSA Master Guide | Hinglish",
  description: "Data Structures aur Algorithms ka complete guide — Hinglish mein",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <Navbar />
        <main style={{ paddingTop: "64px", minHeight: "100vh" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
