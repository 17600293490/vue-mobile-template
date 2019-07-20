<template>
  <div class="home">
    <button @click="handleClick" style="border: 1px solid gray">toast</button>
  </div>
</template>

<script>

export default {
  name: 'home',
  methods: {
    handleClick () {
      this.$toast({ message: 'toast', position: 'bottom', duration: 1500 })
    }
  }
}
</script>
