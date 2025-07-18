<template>
  <div class="game-container">
    <div class="game-header">
      <h2>Wanted!</h2>
      <div class="target-container">
        <p>Find this emoji:</p>
        <div class="target-emoji">{{ targetEmoji }}</div>
      </div>
      <div class="stats">
        <span>Score: {{ score }}</span>
        <span>Time: {{ timeLeft }}s</span>
      </div>
    </div>

    <div class="game-grid">
      <div 
        v-for="(emoji, index) in currentEmojis" 
        :key="index"
        class="emoji-card"
        @click="checkEmoji(emoji)"
      >
        {{ emoji }}
      </div>
    </div>

    <div v-if="gameOver" class="game-over">
      <h3>Game Over!</h3>
      <p>Final Score: {{ score }}</p>
      <button @click="startGame" class="reset-btn">Play Again</button>
    </div>
    
    <router-link to="/" class="back-button">Back to Games</router-link>
  </div>
</template>

<script>
const EMOJI_SETS = [
  ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰'],
  ['🐶', '🐕', '🦮', '🐕‍🦺', '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', '🐈‍⬛', '🦁', '🐯', '🐅'],
  ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍'],
]

export default {
  name: 'WantedGame',
  data() {
    return {
      targetEmoji: '',
      currentEmojis: [],
      score: 0,
      timeLeft: 30,
      gameOver: false,
      timer: null,
      currentSet: []
    }
  },
  created() {
    this.startGame()
  },
  beforeUnmount() {
    this.clearGameTimer()
  },
  methods: {
    startGame() {
      this.score = 0
      this.timeLeft = 30
      this.gameOver = false
      this.startRound()
      this.startTimer()
    },
    startTimer() {
      this.clearGameTimer()
      this.timer = setInterval(() => {
        this.timeLeft--
        if (this.timeLeft <= 0) {
          this.endGame()
        }
      }, 1000)
    },
    clearGameTimer() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    startRound() {
      // Pick a random emoji set
      this.currentSet = EMOJI_SETS[Math.floor(Math.random() * EMOJI_SETS.length)]
      // Pick target emoji
      this.targetEmoji = this.currentSet[Math.floor(Math.random() * this.currentSet.length)]
      
      // Create grid with multiple copies of similar emojis
      this.currentEmojis = Array(16).fill(null).map(() => {
        return Math.random() < 0.2 ? 
          this.targetEmoji : 
          this.currentSet[Math.floor(Math.random() * this.currentSet.length)]
      })
      
      // Ensure at least one target emoji exists
      if (!this.currentEmojis.includes(this.targetEmoji)) {
        this.currentEmojis[Math.floor(Math.random() * this.currentEmojis.length)] = this.targetEmoji
      }
    },
    checkEmoji(emoji) {
      if (this.gameOver) return
      
      if (emoji === this.targetEmoji) {
        this.score += 100
        this.timeLeft = Math.min(this.timeLeft + 2, 30)
        this.startRound()
      } else {
        this.score = Math.max(0, this.score - 50)
        this.timeLeft = Math.max(0, this.timeLeft - 2)
      }
    },
    endGame() {
      this.gameOver = true
      this.clearGameTimer()
    }
  }
}
</script>

<style scoped>
.game-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.game-header {
  text-align: center;
  margin-bottom: 2rem;
}

.target-container {
  margin: 1rem 0;
}

.target-emoji {
  font-size: 4rem;
  margin: 1rem 0;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.emoji-card {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.emoji-card:hover {
  transform: scale(1.05);
}

.game-over {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  text-align: center;
}

.reset-btn, .back-button {
  display: inline-block;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  margin: 0.5rem;
}

@media (max-width: 600px) {
  .game-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .emoji-card {
    font-size: 2rem;
  }
  
  .target-emoji {
    font-size: 3rem;
  }
}
</style>