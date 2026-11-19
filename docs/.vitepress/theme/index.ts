import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import HomeKnowledgeBase from './components/HomeKnowledgeBase.vue'
import BrandDatabaseExplorer from './components/BrandDatabaseExplorer.vue'
import NetworkPerformanceReport from './components/NetworkPerformanceReport.vue'
import StreamingAvailabilityMatrix from './components/StreamingAvailabilityMatrix.vue'
import NetworkTopology from './components/NetworkTopology.vue'
import BrandInfrastructureSnapshot from './components/BrandInfrastructureSnapshot.vue'
import BrandScreenshots from './components/BrandScreenshots.vue'
import BrandRecommendation from './components/BrandRecommendation.vue'
import BrandPricingTable from './components/BrandPricingTable.vue'
import BrandComparison from './components/BrandComparison.vue'
import BrandCTA from './components/BrandCTA.vue'
import RelatedBrand from './components/RelatedBrand.vue'
import RegistrationButton from './components/RegistrationButton.vue'
import ClientMatrixTable from './components/ClientMatrixTable.vue'
import AirportMatcher from './components/AirportMatcher.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomeKnowledgeBase', HomeKnowledgeBase)
    app.component('BrandDatabaseExplorer', BrandDatabaseExplorer)
    app.component('NetworkPerformanceReport', NetworkPerformanceReport)
    app.component('StreamingAvailabilityMatrix', StreamingAvailabilityMatrix)
    app.component('NetworkTopology', NetworkTopology)
    app.component('BrandInfrastructureSnapshot', BrandInfrastructureSnapshot)
    app.component('BrandScreenshots', BrandScreenshots)
    app.component('BrandRecommendation', BrandRecommendation)
    app.component('BrandPricingTable', BrandPricingTable)
    app.component('BrandComparison', BrandComparison)
    app.component('BrandCTA', BrandCTA)
    app.component('RelatedBrand', RelatedBrand)
    app.component('RegistrationButton', RegistrationButton)
    app.component('ClientMatrixTable', ClientMatrixTable)
    app.component('AirportMatcher', AirportMatcher)
  }
} satisfies Theme
