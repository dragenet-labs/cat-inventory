declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
      INVITATION_CODE_LENGTH: number;
      PASSWORD_HASH_ROUNDS: string;
      SESSION_SECRET: string;
      SESSION_SECURE: string;
      SESSION_MAX_AGE: string;
      SESSION_HTTP_ONLY: string;
    }
  }
}
export {};
