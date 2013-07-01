(function(){
  var game = new BubbleGame('bubble-game-main')

  game.initPage()
  game.initCanvas()
  game.bindEvents()
  game.initTimer()

  window.gameInstance = game

})()
