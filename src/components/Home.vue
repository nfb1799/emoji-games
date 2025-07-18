<template>
  <div id="app">
    <header>
      <h1>🎮 Emoji Games</h1>
    </header>
    
    <main class="games-grid">
      <GameCard 
        v-for="game in games" 
        :key="game.id" 
        :game="game"
      />
    </main>
  </div>
</template>

<script>
import GameCard from './GameCard.vue'

export default {
  name: 'App',
  components: {
    GameCard
  },
  data() {
    return {
      games: [
        {
          id: 1,
          name: 'Emoji Match',
          description: 'Match pairs of emojis in this fun memory game!',
          thumbnail: '/game-thumbnails/match.jpg',
          link: '/emoji-match'
        },
        {
          id: 2,
          name: 'Wanted!',
          description: 'Find the target emoji before time runs out!',
          thumbnail: '/game-thumbnails/match.jpg',
          link: '/wanted-game'
        },
      ]
    }
  }
}
</script>

<style>
#app {
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  #app {
    padding: 1rem;
  }
  
  .games-grid {
    grid-template-columns: 1fr;
  }
}
</style>