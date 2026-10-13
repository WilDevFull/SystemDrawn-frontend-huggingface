import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, transformWithEsbuild } from 'vite';

export default defineConfig({
  define: {
    __DEV__: 'import.meta.env.DEV',
    global: 'globalThis',
    'process.env.EXPO_OS': JSON.stringify('web'),
    'process.env.NODE_ENV': 'import.meta.env.MODE',
  },
  plugins: [
    {
      name: 'transpile-rn-jsx-in-node-modules',
      enforce: 'pre',
      async transform(code, id) {
        if (id.endsWith('.json')) {
          return;
        }

        const isReactNativeModule =
          id.includes('/node_modules/') &&
          (
            id.includes('/@expo/') ||
            id.includes('/@react-navigation/') ||
            id.includes('/@react-native-') ||
            id.includes('/react-native-') ||
            id.includes('/react-native/')
          );

        if (isReactNativeModule) {
          return transformWithEsbuild(code, id, { loader: 'tsx' });
        }
      },
    },
    react(),
  ],
  optimizeDeps: {
    noDiscovery: true,
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'react-native-web',
      '@react-native/normalize-colors',
      'zustand',
      'axios',
    ],
    exclude: [
      '@expo/vector-icons',
      '@react-native-community/datetimepicker',
      'react-native-paper',
      'react-native-calendars',
      'react-native-vector-icons',
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('.', import.meta.url)),
      },
      {
        find: '@react-native-community/datetimepicker',
        replacement: fileURLToPath(
          new URL('./web/DateTimePicker.tsx', import.meta.url),
        ),
      },
      {
        find: '@expo/vector-icons',
        replacement: fileURLToPath(new URL('./web/VectorIcons.tsx', import.meta.url)),
      },
      {
        find: 'react-native-paper',
        replacement: fileURLToPath(new URL('./web/react-native-paper.tsx', import.meta.url)),
      },
      {
        find: 'react-native-calendars',
        replacement: fileURLToPath(new URL('./web/Calendar.tsx', import.meta.url)),
      },
      {
        find: 'expo-router',
        replacement: fileURLToPath(
          new URL('./web/expo-router-compat.tsx', import.meta.url),
        ),
      },
      {
        find: 'react-native/Libraries/Utilities/codegenNativeComponent',
        replacement: fileURLToPath(
          new URL('./web/codegenNativeComponent.ts', import.meta.url),
        ),
      },
      {
        find: 'react-native-web/Libraries/Utilities/codegenNativeComponent',
        replacement: fileURLToPath(
          new URL('./web/codegenNativeComponent.ts', import.meta.url),
        ),
      },
      {
        find: 'react-native',
        replacement: fileURLToPath(
          new URL('./web/react-native-compat.ts', import.meta.url),
        ),
      },
    ],
  },
});