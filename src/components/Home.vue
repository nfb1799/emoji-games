<template>
  <div class="home-container">
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
          thumbnail: '/game-thumbnails/emoji-match.png',
          link: '/emoji-match'
        },
        {
          id: 2,
          name: 'Wanted!',
          description: 'Find the target emoji before time runs out!',
          thumbnail: '/game-thumbnails/emoji-match.png',
          link: '/wanted-game'
        },
      ]
    }
  }
}
</script>

<style>
.home-container {
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

header {
  text-align: center;
  flex-shrink: 0;
}

header h1 {
  font-size: 3rem;
  margin: 0;
  background: linear-gradient(45deg, #42b983, #64d8a4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
}

@media (max-width: 600px) {
  .home-container {
    padding: 1rem;
  }
  
  header h1 {
    font-size: 2rem;
  }
  
  .games-grid {
    grid-template-columns: 1fr;
  }
}
</style>