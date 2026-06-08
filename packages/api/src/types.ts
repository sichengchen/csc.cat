export type AppEnv = {
  Bindings: {
    SURL_KV: KVNamespace;
    ASSETS: Fetcher;
    CLERK_SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
};
