(function(){

  window.BubbleGame = BubbleGame

  var FRAME_RATE = 1000 / 20
  var TWO_PI = Math.PI * 2

  function BubbleGame(id){
    this.element = document.getElementById(id)
    this.bubbles = []
    this.frame_rate = FRAME_RATE
    this.boundTimerHandler = this.timerHandler.bind(this)
    this.heldBubble = null
  }

  BubbleGame.prototype.initPage = function(){
    document.body.style.margin = '0'
  }

  BubbleGame.prototype.initCanvas = function(){
    var canvas = this.canvas = document.createElement('canvas')
    var context = this.context = canvas.getContext('2d')
    canvas.style.display = "block"
    context.save()
    this.element.appendChild(canvas);
    window.addEventListener('resize', this.resizeCanvas.bind(this))
    this.resizeCanvas()
  }

  BubbleGame.prototype.resizeCanvas = function(){
    var height = window.innerHeight
    var width = window.innerWidth
    this.canvas.height = height
    this.canvas.width = width

    this.draw()
  }

  BubbleGame.prototype.initTimer = function(){
    var ticks = Date.now
    this._timeout = setTimeout(this.boundTimerHandler, this.frame_rate)
  }

  BubbleGame.prototype.timerHandler = function(){
    var ticks = Date.now()
    this._timeout = setTimeout(this.boundTimerHandler, this.frame_rate)
    this.update(ticks - this._lastTicks)
    this.draw()
    this._lastTicks = Date.now()
  }

  BubbleGame.prototype.update = function(timeDiff){

    var popped = []
    var bubbles = this.bubbles

    if(this.heldBubble){
      this.heldBubble.inflate()
    }

    bubbles.forEach(function(bubble, i){
      bubble.update(timeDiff)
      if(bubble.popped){
        popped.push(i)
      }
    })

    for(var i = popped.length - 1 ; i >= 0 ; i--){
      bubbles.splice(popped[i], 1)
    }
  }

  BubbleGame.prototype.bindEvents = function(){
    this.bindMouseEvents()
  }

  BubbleGame.prototype.createBubble = function(x, y){
    var bubble = new Bubble(x, y)
    this.bubbles.push(bubble)
    this.heldBubble = bubble
    bubble.held = true
  }

  BubbleGame.prototype.freeBubble = function(){
    var bubble = this.heldBubble
    if(bubble){
      bubble.held = false
      this.heldBubble = null
    }
  }

  BubbleGame.prototype.detectBubbleHit = function(x,y){
    for(var i = this.bubbles.length - 1 ; i >= 0 ; i--){
      var bubble =  this.bubbles[i]
      var distance = Math.sqrt(Math.pow(x - bubble.x, 2) + Math.pow(y - bubble.y, 2))
      if(distance < bubble.size){
        return bubble
      }
    }
  }

  BubbleGame.prototype.bindMouseEvents = function(){
    this.element.onmousemove = (function(e){
      if(this.heldBubble){
        this.freeBubble()
        this.createBubble(e.pageX, e.pageY)
      }
    }.bind(this))

    this.element.onmousedown = (function(e){
      var hitBubble = this.detectBubbleHit(e.pageX, e.pageY)
      if(hitBubble){
        hitBubble.popped = true  
      } else {
        this.createBubble(e.x, e.y)
      }
    }.bind(this))

    this.element.onmouseup =(function(e){
      this.freeBubble()
    }.bind(this))
  }

  BubbleGame.prototype.draw = function(){
    var height = this.canvas.height
    var width = this.canvas.width
    var ctx = this.context

    ctx.restore()

    ctx.fillStyle = "#000000"
    ctx.fillRect(0,0,width,height)

    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 0


    this.bubbles.forEach(function(bubble){
      ctx.restore()

      var gradient = ctx.createRadialGradient(bubble.x - (bubble.size / 3),bubble.y - (bubble.size / 3), bubble.size / 6, bubble.x, bubble.y, bubble.size)

      gradient.addColorStop(0, "rgba(255,255,255,.75)")
      gradient.addColorStop(1, "rgba(32,128,255,.1)")
      ctx.beginPath()
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, TWO_PI)
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.closePath()
      ctx.stroke()
    })

    ctx.restore()
  }
})()
