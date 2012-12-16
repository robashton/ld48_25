ig.module(
	'game.entities.centipedesegment'
)
.requires(
  'impact.entity',
  'game.entities.bullet',
  'game.entities.deadsegment',
  'game.entities.rock'
)
.defines(function(){

  EntityCentipedeSegment = ig.Entity.extend({
    size: {x: 8, y: 8},
    collides: ig.Entity.COLLIDES.LITE,
    checkAgainst: ig.Entity.TYPE.B,
    type: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/centipede.png', 8, 8),
    sound: new ig.Sound('media/hurt.*'),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'walkleft', 0.1, [12,13]);
      this.addAnim( 'walkright', 0.1, [12,13]);
      this.addAnim( 'walkdown', 0.1, [10,11]);
      this.addAnim( 'walkup', 0.1, [10,11]);
      this.head = settings.head
      this.index = settings.index
      this.sound.volume = 0.2
      this.calculatePosition()
    },
    calculatePosition: function() {
      var position = this.head.getPositionForSegment(this.index)
      this.pos.x = position.x
      this.pos.y = position.y
      this.direction = position.direction
    },
    update: function() {
      this.parent()
      this.calculatePosition()
      this.currentAnim = this.anims['walk' + this.direction]
    },
    check: function(other) {
      this.parent(other)
      if(other instanceof EntityBullet) {
        this.head.damage()
        other.kill()
      }
    },
    kill: function() {
      this.parent()
      this.sound.play()
      ig.game.spawnEntity( EntityDeadSegment, this.pos.x, this.pos.y )
      if(Math.random() < 0.3)
        setTimeout(function() {
            ig.game.spawnEntity( EntityRock, this.pos.x, this.pos.y )
        }, 1000)
    }
  })

})
