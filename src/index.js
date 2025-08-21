// ** React Imports
import { lazy, Suspense, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// ** Redux Imports
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

// ** Intl, CASL & ThemeColors Context
import { AbilityProvider } from '@contexts/ability'
import { ThemeContext } from '@contexts/ThemeColors'

// ** ThemeConfig
import themeConfig from './configs/themeConfig'

// ** Toast
import { Toaster } from 'react-hot-toast'

// ** i18n
// import './configs/i18n'

// ** Spinner (Splash Screen)
import Spinner from '@src/components/theme/spinner/FallbackSpinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Hot Toast Styles
import '@core/scss/react/libs/react-hot-toasts/react-hot-toasts.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

// ** Service Worker
import * as serviceWorker from './serviceWorker'

// ** Lazy load app
const LazyApp = lazy(() => import('./App'))

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  // <StrictMode>
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AbilityProvider>
        <BrowserRouter>
          <ThemeContext>
            <Suspense fallback={<Spinner />}>
              <LazyApp />
              <Toaster position={themeConfig.layout.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
            </Suspense>
          </ThemeContext>
        </BrowserRouter>
      </AbilityProvider>
    </PersistGate>
  </StoreProvider>
  // </StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
