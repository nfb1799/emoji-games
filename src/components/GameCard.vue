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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
}

.game-card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.game-card h3 {
  color: #fff;
  margin: 0.5rem 0;
  font-size: 1.5rem;
}

.game-card p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem 0 1rem 0;
}

.play-button {
  display: inline-block;
  background: linear-gradient(45deg, #42b983, #64d8a4);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.2s;
}

.play-button:hover {
  transform: translateY(-2px);
}
</style>