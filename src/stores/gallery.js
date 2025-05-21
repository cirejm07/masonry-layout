import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGalleryStore = defineStore('gallery', () => {
  const images = ref([])
  const loading = ref(false)

  const fetchImages = async (randomNumber = 1) => {
    loading.value = true
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${randomNumber}&limit=999`)
      if (!response.ok) throw new Error('Failed to fetch images')
      const data = await response.json()
      // console.log(data)
      images.value = [...images.value, ...data]
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { images, loading, fetchImages }
})
