ig.module(
	'game.entities.scoredisplay'
)
.requires(
  'impact.entity',
  'game.eventbus'
)
.defines(function(){

  EntityScoreDisplay = ig.Entity.extend({
    font: new ig.Font( 'media/04b03.font.png' ),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.world = settings.world
      this.score = 0
      this.totalrocks = 0
      this.totalflowers = 0
      this.longeststreak = 0
      this.currentstreak = 0
      Events.on('flower-eaten', this.onFlowerEaten, this)
      Events.on('rock-destroyed', this.onRockDestroyed, this)
      Events.on('player-damaged', this.onPlayerDamaged, this)
    },
    getStats: function() {
      return {
        score: this.score,
        rockcount: this.totalrocks,
        flowercount: this.totalflowers,
        longeststreak: this.longeststreak
      }
    },
    onFlowerEaten: function(flower) {
      this.currentstreak++
      this.totalflowers++
      var change = this.world.level * this.currentstreak
      this.score += change
      Events.raise('score-changed', {
        amount: change,
        x: flower.pos.x,
        y: flower.pos.y
      })
    },
    onRockDestroyed: function(rock) {
      this.totalrocks++
    },
    onPlayerDamaged: function() {
      if(this.currentstreak > this.longeststreak)
        this.longeststreak = this.currentstreak
      this.currentstreak = 0
    },
    draw: function() {
      this.font.draw('Score: ' + this.score, 0, 232,  ig.Font.ALIGN_LEFT)
    }
  })
})
