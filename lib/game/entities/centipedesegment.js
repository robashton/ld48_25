ig.module(
	'game.entities.centipedesegment'
)
.requires(
  'impact.entity',
  'game.entities.bullet',
  'game.entities.deadsegment'
)
.defines(function(){

  EntityCentipedeSegment = ig.Entity.extend({
    size: {x: 8, y: 8},
    collides: ig.Entity.COLLIDES.LITE,
    checkAgainst: ig.Entity.TYPE.B,
    type: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/centipede.png', 8, 8),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'walkleft', 0.1, [12,13]);
      this.addAnim( 'walkright', 0.1, [12,13]);
      this.addAnim( 'walkdown', 0.1, [10,11]);
      this.addAnim( 'walkup', 0.1, [10,11]);
      this.head = settings.head
      this.index = settings.index
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
      ig.game.spawnEntity( EntityDeadSegment, this.pos.x, this.pos.y )
    }
  })

})
