import MySessionProvider from "@/components/SessionProvider";
import NavMenu from "@/components/NavMenu";
import "./globals.css";

export const metadata = {
  title: "CS391 OAuth",
  description: "Demo for CS391 OAuth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MySessionProvider>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <NavMenu />
          </header>
          {children}
        </MySessionProvider>
      </body>
    </html>
  );
}
