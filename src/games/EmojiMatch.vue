<template>
  <div class="game-container">
    <div class="game-header">
      <div class="header-left">
        <router-link to="/" class="back-button">Back to Games</router-link>
        <h2>Emoji Match</h2>
      </div>
      <div class="stats">
        <span>Moves: {{ moves }}</span>
        <span>Matches: {{ matches }}/{{ totalPairs }}</span>
      </div>
      <button @click="resetGame" class="reset-btn">New Game</button>
    </div>

    <div class="game-grid">
      <div 
        v-for="(card, index) in cards" 
        :key="index"
        class="card"
        :class="{ flipped: card.isFlipped }"
        @click="flipCard(index)"
      >
        <div class="card-inner">
          <div class="card-front">❓</div>
          <div class="card-back">{{ card.emoji }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']

export default {
  name: 'EmojiMatch',
  data() {
    return {
      cards: [],
      flippedCards: [],
      moves: 0,
      matches: 0,
      totalPairs: EMOJIS.length
    }
  },
  created() {
    this.resetGame()
  },
  methods: {
    resetGame() {
      const duplicatedEmojis = [...EMOJIS, ...EMOJIS]
      this.cards = duplicatedEmojis
        .sort(() => Math.random() - 0.5)
        .map(emoji => ({
          emoji,
          isFlipped: false,
          isMatched: false
        }))
      this.flippedCards = []
      this.moves = 0
      this.matches = 0
    },
    async flipCard(index) {
      if (
        this.flippedCards.length === 2 ||
        this.cards[index].isFlipped ||
        this.cards[index].isMatched
      ) return

      this.cards[index].isFlipped = true
      this.flippedCards.push(index)

      if (this.flippedCards.length === 2) {
        this.moves++
        const [firstIndex, secondIndex] = this.flippedCards
        
        if (this.cards[firstIndex].emoji === this.cards[secondIndex].emoji) {
          this.cards[firstIndex].isMatched = true
          this.cards[secondIndex].isMatched = true
          this.matches++
          this.flippedCards = []
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000))
          this.cards[firstIndex].isFlipped = false
          this.cards[secondIndex].isFlipped = false
          this.flippedCards = []
        }
      }
    }
  }
}
</script>

<style scoped>
.game-container {
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  padding: 0;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  height: calc(100% - 100px);
}

.card {
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-back {
  transform: rotateY(180deg);
}

.reset-btn {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button {
  display: inline-block;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

@media (max-width: 600px) {
  .game-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>