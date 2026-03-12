export const metadata = {
  title: 'HMI Studio',
  description: 'Sanity Studio for HMI',
}

interface StudioLayoutProps {
  readonly children: React.ReactNode
}

export default function StudioLayout({children}: StudioLayoutProps) {
  return (
    <html lang="en">
      <body style={{margin: 0, padding: 0, height: '100vh'}}>{children}</body>
    </html>
  )
}
