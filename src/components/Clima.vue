<script setup>
import useClima from '../composables/useClima'

const { formatearTemperatura } = useClima()
defineProps({
  clima: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="resultado">
    <h2>Clima de: {{ clima.name }}</h2>
    <p class="actual">{{ formatearTemperatura(clima.main.temp) }}</p>
    <div class="temperaturas">
      <p>
        Min: <span>{{ formatearTemperatura(clima.main.temp_min) }}</span>
      </p>
      <p>
        Max: <span>{{ formatearTemperatura(clima.main.temp_max) }}</span>
      </p>
    </div>
  </div>
</template>
