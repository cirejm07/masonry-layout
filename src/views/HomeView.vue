<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useGalleryStore } from '../stores/gallery'

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
            <div>
              <img v-lazy="image.download_url" loading="lazy" :alt="image.author" />
              <span aria-label="author">{{ image.author }}</span>
              <a :href="image.url" target="_blank" title="download image - opens in a new tab"
                ><i class="fa-solid fa-download"></i
              ></a>
            </div>
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

.images-container__card div {
  overflow: hidden;
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}
.images-container__card div a {
  color: var(--bs-gray-dark);
  font-size: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: all 0.35s ease-in-out;
  opacity: 0;
  visibility: visible;
  z-index: 1;
  color: #fff;
}

.images-container__card div span {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 1;
  color: #fff;
  letter-spacing: 0.125rem;
  font-size: 16px;
  transition: all 0.35s ease-in-out;
  opacity: 0;
  visibility: visible;
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

.images-container__card div:hover img {
  transform: scale(1.1);
  filter: brightness(0.7);
}

.images-container__card div:hover img ~ a,
.images-container__card div:hover img ~ span {
  opacity: 1;
  visibility: visible;
}

.images-container:has(.images-container__card div:hover img)
  .images-container__card
  div:not(:hover)
  img {
  filter: blur(10px) !important;
}

img[lazy='loading'] {
  filter: blur(10px);
  background: rgba(0, 0, 0, 0.1);
}
</style>
