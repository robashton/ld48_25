ig.module(
	'game.entities.messaging'
)
.requires(
  'impact.entity',
  'game.eventbus'
)
.defines(function(){

  EntityMessaging = ig.Entity.extend({
    messages: [],
    font: new ig.Font( 'media/04b03.font.png' ),

    init: function(x,y, settings) {
      this.parent(x,y,settings)
      Events.on('level-started', this.onLevelStarted, this)
      Events.on('score-changed', this.onScoreChanged, this)
    },
    onLevelStarted: function(level) {
      this.addMessage("Level " + level)
    },
    onScoreChanged: function(ev) {
      this.addMessage(ev.amount, ev.x, ev.y)
    },
    addMessage: function(text, x, y) {
      this.messages.push({
        ticks: 0,
        text: text,
        x: x || 160,
        y: y || 120
      })
    },
    update: function() {
      var newMessages = []
      for(var i = 0 ; i < this.messages.length; i++) {
        var message = this.messages[i]
        if(message.ticks++ < 120) {
          newMessages.push(message)
          message.y -= 0.2
        }
      }
      this.messages = newMessages
    },
    draw: function() {
      for(var i = 0 ; i < this.messages.length; i++) {
        var message = this.messages[i]
        this.font.draw(message.text, message.x, message.y,  ig.Font.ALIGN_CENTER)
        console.log(message)
      }
    }
  })
})
