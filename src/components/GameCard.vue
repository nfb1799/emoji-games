<template>
  <div class="game-card">
    <img :src="game.thumbnail" :alt="game.name">
    <h3>{{ game.name }}</h3>
    <p>{{ game.description }}</p>
    <router-link :to="game.link" class="play-button">Play Now</router-link>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    game: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.game-card {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.game-card:hover {
  transform: translateY(-4px);
}

.game-card img {
  width: 100%;
  border-radius: 4px;
}

.play-button {
  display: inline-block;
  background: #42b983;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
}
</style>