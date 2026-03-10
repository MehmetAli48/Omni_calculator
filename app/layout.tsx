import '../styles/globals.css';

export const metadata = {
  title: 'Omni-Calc v2.0',
  description: 'High-Tech scientific calculator with industrial aesthetic.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
