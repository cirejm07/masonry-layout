<script setup>
import { onMounted, ref, nextTick } from 'vue'
import 'lightbox2'
import { useGalleryStore } from '../stores/gallery'
// import 'lightbox2/dist/css/lightbox.css'
import 'lightbox2/dist/js/lightbox-plus-jquery.min.js'
import Lightbox from 'lightbox2'

// data
const images = ref([])
const loading = ref(null)
const store = useGalleryStore()
// methods

// computed

// lifecycle
onMounted(async () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1
  await store.fetchImages(randomNumber)
  nextTick(() => {
    Lightbox.init()
  })
})
</script>

<template>
  <main>
    <div class="container">
      <header>
        <h1 class="text-center text-uppercase">Masonry Layout</h1>
      </header>

      <div v-if="!store.loading">
        <ul class="images-container">
          <li class="images-container__card" v-for="image in store.images" :key="image.id">
            <a
              :href="image.download_url"
              data-lightbox="gallery"
              :data-title="image.author"
              :title="image.author"
            >
              <img v-lazy="image.download_url" loading="lazy" :alt="image.author" />
            </a>
          </li>
        </ul>
      </div>
      <div v-else>
        <h3 class="py-5 text-center">Loading...</h3>
      </div>
      <!-- <button @click="loadMore">Load more...</button> -->
    </div>
  </main>
</template>

<style>
header {
  margin: 50px auto;
  letter-spacing: 0.35rem;
}

.images-container {
  columns: 300px 3;
  list-style: none;
  padding: 0;
}

.images-container__card a {
  overflow: hidden;
  display: block;
  width: 100%;
  height: 100%;
}

.images-container__card {
  margin-bottom: 13px;
}

.images-container__card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.35s ease-in-out;
}

.images-container__card img:hover {
  transform: scale(1.1);
}

.images-container:has(.images-container__card img:hover) .images-container__card img:not(:hover) {
  filter: blur(10px) !important;
}

img[lazy='loading'] {
  filter: blur(10px);
  background: rgba(0, 0, 0, 0.1);
}
</style>
