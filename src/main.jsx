import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import posthog from 'posthog-js'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: "https://9529dec6bba54ee9994ac8c8ff3d8e8f@o4511274182574080.ingest.de.sentry.io/4511274201645136",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  environment: "development",
  sendDefaultPii: true,
})

posthog.init('phc_koMNeG6EEv5fsZ6iKYCMDLPiugUfpdEJ44L5jaW6KH5f', {
  api_host: 'https://eu.i.posthog.com',
  person_profiles: 'identified_only',
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)