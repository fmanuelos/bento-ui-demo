import { Route } from 'react-router-dom'
import { DocsLayout } from './layouts/DocsLayout'
import { ComponentIndexPage } from './pages/ComponentIndexPage'
import { ComponentPage } from './pages/ComponentPage'
import { FoundationPage } from './pages/FoundationPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OverviewPage } from './pages/OverviewPage'

export const docsRoutes = (
  <Route path="/docs" element={<DocsLayout />}>
    <Route index element={<OverviewPage />} />
    <Route path="foundations" element={<FoundationPage />} />
    <Route path="foundations/:foundation" element={<FoundationPage />} />
    <Route path="components" element={<ComponentIndexPage />} />
    <Route path="components/:slug" element={<ComponentPage />} />
    <Route path="not-found" element={<NotFoundPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
)
