import "./globals.scss";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
