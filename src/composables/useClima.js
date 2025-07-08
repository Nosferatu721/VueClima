import axios from 'axios'
import { ref, computed } from 'vue'

export default function useClima() {
  const clima = ref({})
  const buscandoClima = ref(false)

  const obtenerClima = async ({ ciudad, pais }) => {
    buscandoClima.value = true
    clima.value = {}
    const apiKey = import.meta.env.VITE_API_KEY
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${apiKey}`

    try {
      const response = await axios.get(url)
      // Obtener las coordenadas de la ciudad
      const { lat, lon } = response.data[0]
      if (!lat || !lon) throw new Error('No se encontraron coordenadas para la ciudad proporcionada.')
      // Hacer una segunda petición para obtener el clima
      const climaUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      const climaResponse = await axios.get(climaUrl)
      await new Promise(resolve => setTimeout(resolve, 2000))
      clima.value = climaResponse.data
      // hacer que se demore un poco la respuesta para simular una carga
      buscandoClima.value = false
    } catch (error) {
      console.error('Error al obtener el clima:', error)
      throw error
    }
  }

  const mostrarClima = computed(() => {
    if (!clima.value || Object.keys(clima.value).length === 0) {
      return false
    }
    return clima.value
  })


  const formatearTemperatura = (temperatura) => {
    if (temperatura === undefined || temperatura === null) {
      return '--'
    }
    return `${temperatura.toFixed(1)}°C`
  }

  return {
    obtenerClima,
    clima,
    mostrarClima,
    formatearTemperatura,
    buscandoClima,
  }
}
