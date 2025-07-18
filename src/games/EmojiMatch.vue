<template>
  <div class="game-container">
    <div class="game-header">
      <div class="header-left">
        <router-link to="/" class="back-button">Back to Games</router-link>
        <h2>Emoji Match</h2>
      </div>
      <div class="stats">
        <div class="stat-box">
          <span class="stat-label">Moves</span>
          <span class="stat-value">{{ moves }}</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Matches</span>
          <span class="stat-value">{{ matches }}/{{ totalPairs }}</span>
        </div>
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
    <div v-if="isGameComplete" class="victory-overlay">
      <div class="victory-modal">
        <h2>🎉 Congratulations! 🎉</h2>
        <p>You completed the game in {{ moves }} moves!</p>
        <div class="victory-buttons">
          <button @click="resetGame" class="reset-btn">Play Again</button>
          <router-link to="/" class="back-button">Back to Games</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']

export default {
  name: 'EmojiMatch',
  computed: {
    isGameComplete() {
      return this.matches === this.totalPairs;
    }
  },
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
  height: 100%;
  margin: 16px;
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

.stats {
  display: flex;
  gap: 1.5rem;
}

.stat-box {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.stat-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.2rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #42b983;
}

.reset-btn,
.back-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: linear-gradient(45deg, #42b983, #64d8a4);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  font-family: inherit;
  width: 120px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.reset-btn:hover,
.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.reset-btn:active,
.back-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.victory-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 0.3s ease-out;
}

.victory-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.victory-modal .reset-btn,
.victory-modal .back-button {
  margin: 0;
}

.victory-modal {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: scaleIn 0.3s ease-out;
}

.victory-modal h2 {
  color: #fff;
  font-size: 2rem;
  margin: 0 0 1rem 0;
}

.victory-modal p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { 
    transform: scale(0.8);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 600px) {
  .game-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>