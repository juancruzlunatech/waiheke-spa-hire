import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { OpsApp } from './ops/OpsApp'
import { Book } from './pages/Book'
import { FAQ } from './pages/FAQ'
import { Home } from './pages/Home'
import { HowItWorks } from './pages/HowItWorks'
import { Pricing } from './pages/Pricing'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/ops/*" element={<OpsApp />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="book" element={<Book />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
