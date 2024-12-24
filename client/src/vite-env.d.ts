/// <reference types="vite/client" />
VITE_CLERK_PUBLISHABLE_KEY =
  pk_test_cmVsaWV2ZWQtbWFzdG9kb24tMjYuY2xlcmsuYWNjb3VudHMuZGV2JA;
CLERK_SECRET_KEY = sk_test_MWEHEC0tO5rPiWxCOy7IPy6WOpQjj6w2vFHMldQheq;
interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
