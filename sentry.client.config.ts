// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://6da85ac450413940b13a1c68c9406b71@o4509405261725696.ingest.de.sentry.io/4509405264674896",
  integrations: [
    Sentry.feedbackIntegration({
      colorScheme: "system",
      isEmailRequired: true,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});
