(function(){
  window.BubbleGame = BubbleGame
  function BubbleGame(){
    this.initPage()
    this.initCanvas()
  }

  BubbleGame.prototype.initPage = function(){
    document.body.style.margin = '0'
  }

  BubbleGame.prototype.initCanvas = function(){
    var canvas = this.canvas
    var context = this.context = canvas.getContext('2d')
    document.body.appendChild(canvas);
    this.resizeCanvas()
  }

  BubbleGame.prototype.resizeCanvas = function(){
    var height = window.innerHeight
    var width = window.innerWidth
    this.canvas.height = height
    this.canvas.width = width

    this.draw()
  }

  BubbleGame.prototype.draw = function(){
    var ctx = this.context

    ctx.clear()

    ctx.strokeStyle = "#000000"
    ctx.fillStyle = "#ff0000"

    ctx.fillRect(0,0,this.canvas.width, this.canvas.height)

    ctx.strokeStyle = "#FFFF00"
    ctx.fillStyle = "#00FFFF"


    ctx.fillRect(3,3,this.canvas.width - 3, this.canvas.height - 3)
  }
})()
