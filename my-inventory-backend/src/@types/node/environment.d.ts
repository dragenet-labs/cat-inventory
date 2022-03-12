declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
      INVITATION_CODE_LENGTH: number;
    }
  }
}
export {};
