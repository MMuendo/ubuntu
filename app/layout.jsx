import "./globals.css";

export const metadata = {
  title: "Ubuntu Analytiq",
  description: "Africa-first data and AI learning, mentorship, projects, datasets, consulting, and automation."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
