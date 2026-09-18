import { Route } from 'react-router-dom'
import { DocsLayout } from './layouts/DocsLayout'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { ComponentIndexPage } from './pages/ComponentIndexPage'
import { ComponentPage } from './pages/ComponentPage'
import { ExperienceModesPage } from './pages/ExperienceModesPage'
import { FoundationPage } from './pages/FoundationPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OverviewPage } from './pages/OverviewPage'
import { ProductDomainsPage } from './pages/ProductDomainsPage'
import { TemplatesPage } from './pages/TemplatesPage'

export const docsRoutes = (
  <Route path="/docs" element={<DocsLayout />}>
    <Route index element={<OverviewPage />} />
    <Route path="architecture" element={<ArchitecturePage />} />
    <Route path="experience-modes" element={<ExperienceModesPage />} />
    <Route path="templates" element={<TemplatesPage />} />
    <Route path="product-domains" element={<ProductDomainsPage />} />
    <Route path="foundations" element={<FoundationPage />} />
    <Route path="foundations/:foundation" element={<FoundationPage />} />
    <Route path="components" element={<ComponentIndexPage />} />
    <Route path="components/:slug" element={<ComponentPage />} />
    <Route path="not-found" element={<NotFoundPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
)
