import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import posthog from 'posthog-js'

posthog.init('phc_koMNeG6EEv5fsZ6iKYCMDLPiugUfpdEJ44L5jaW6KH5f', {
  api_host: 'https://eu.i.posthog.com',
  person_profiles: 'identified_only',
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)