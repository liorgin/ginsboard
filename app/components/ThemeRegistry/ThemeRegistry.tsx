'use client';
import useModalStore from '@/app/hooks/useModalStore';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { Modal } from '../modal/Modal';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import theme from './theme';





export default function ThemeRegistry({ children }: { children: React.ReactNode }) {


  const {openModal} = useModalStore()

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Modal />
          
        
          
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
