import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './components/pages/HomePage.jsx'
import PricingPage from './components/pages/Pricing.jsx'
import TalkToSales from './components/pages/TalkToSales.jsx'
import StartFreeTrial from './components/pages/StartFreeTrial.jsx'
import BookMeeting from './components/pages/BookMeeting.jsx'
import Status from './pages/Status.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import CookiePolicy from './pages/CookiePolicy.jsx'
import Layout from './components/Layout.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'pricing',
        element: <PricingPage />
      }
    ]
  },
  {
    path: '/talk-to-sales',
    element: <TalkToSales />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/start-free-trial',
    element: <StartFreeTrial />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/book-meeting',
    element: <BookMeeting />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/status',
    element: <Status />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/cookie-policy',
    element: <CookiePolicy />,
    errorElement: <ErrorBoundary />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)