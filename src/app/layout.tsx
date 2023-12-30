import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import db from '@/lib/supabase/db'
import { ThemeProvider } from '@/lib/providers/next-theme-provider'
import { twMerge } from 'tailwind-merge'
import Logo from '../../public/ideaFlow-logo.svg'


const inter = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ideaFlow',
  description: 'Organize your ideas and projects with ideaFlow.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log(db);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={twMerge('bg-background', inter.className)}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}