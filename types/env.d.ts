export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NOTION_ACCESS_TOKEN: string;
      NOTION_DATABASE_ID: string;
    }
  }
}
