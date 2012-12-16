ig.module( 'game.main' ) 
.requires( 
  'game.centipedegame',
  'game.eventbus'
)
.defines(function(){

  var $start = $('#start')
    , $game = $('#game')
    , $gameover = $('#gameover')
    , $startbutton = $('#start')
    , $totalflowers = $('#total-flowers')
    , $totalrocks = $('#total-rocks')
    , $longeststreak = $('#longest-streak')
    , $finalscore = $('#final-score')
    , $restartbutton = $('#restart-button')

    $startbutton.on('click', startGame)
    $restartbutton.on('click', restartGame)

    function showSplash() {
      $start.show()
      $game.hide()
      $gameover.hide()
    }

    function showGameOver(stats) {
      $start.hide()
      $game.hide()
      $gameover.show()
      $totalflowers.text(stats.flowercount)
      $totalrocks.text(stats.rockcount)
      $longeststreak.text(stats.longeststreak)
      $finalscore.text(stats.score)
    }

    function restartGame() {
      ig.game.restart()
      $start.hide()
      $game.show()
      $gameover.hide()
      Events.on('game-over', showGameOver)
    }

    function startGame() {
      ig.Sound.channels = 10
      if( ig.ua.mobile ) {
        ig.Sound.enabled = false;
        ig.main( '#canvas', CentipedeGame, 30, 320, 240, 2.5 );
      }
      else {
        ig.main( '#canvas', CentipedeGame, 30, 320, 240, 3 );
      }
      $start.hide()
      $game.show()
      $gameover.hide()
      Events.on('game-over', showGameOver)
    }

    showSplash()
});
