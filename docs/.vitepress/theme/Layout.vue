<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import SiteBreadcrumb from './components/SiteBreadcrumb.vue'
import DocRelated from './components/DocRelated.vue'
import SiteFooter from './components/SiteFooter.vue'
import ImageLightbox from './components/ImageLightbox.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <SiteBreadcrumb />
    </template>
    <template #doc-after>
      <DocRelated />
    </template>
    <template #layout-bottom>
      <SiteFooter />
      <ImageLightbox />
    </template>
  </Layout>
</template>
