import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'

import { History } from './pages/History'
import { Home } from './pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/IgnitePomodoro/" element={<Home />} />
        <Route path="/IgnitePomodoro/history" element={<History />} />
      </Route>
    </Routes>
  )
}
