ig.module(
	'game.entities.defenceunit'
)
.requires(
  'impact.entity'
)
.defines(function(){

  EntityDefenceUnit = ig.Entity.extend({
    size: {x: 8, y: 8},
    speed: 15,
    collides: ig.Entity.COLLIDES.NONE,
    animSheet: new ig.AnimationSheet('media/defenceunit.png', 8, 8),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.head = settings.head
      this.addAnim( 'idle', 1.0, [0]);
    },
    update: function() {
      this.parent()
      if(this.head.pos.x < this.pos.x)
        this.vel.x = -this.speed
      else if(this.head.pos.x > this.pos.x)
        this.vel.x = this.speed
    },
  })

})
