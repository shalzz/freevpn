import { Analytics } from '@vercel/analytics/react';
import AuthProvider from '@/components/AuthProvider';

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Analytics />
    </AuthProvider>
  );
}
