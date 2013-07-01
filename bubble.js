(function(){
  window.Bubble = Bubble

  var MOVEMENT_MAX  = 30
  var MAX_LIFESPAN  = 400
  var MIN_LIFESPAN  = 25
  var MAX_INIT_SIZE = 100
  var MAX_SIZE      = 200
  var MIN_SIZE      = 10
  var SIZE_INCR     = 5

  function Bubble(x, y){
    this.x = x
    this.y = y
    this.size = Math.random() * (MAX_INIT_SIZE - MIN_SIZE) + MIN_SIZE
    this.dx = (Math.random() - .5) * MOVEMENT_MAX * 2
    this.dy = (Math.random() - .5) * MOVEMENT_MAX * 2
    this.lifespan = Math.random() * (MAX_LIFESPAN - MIN_LIFESPAN) + MIN_LIFESPAN
  }

  Bubble.prototype.inflate = function(){
    this.size += SIZE_INCR
    if(this.size > MAX_SIZE)
      this.popped = true
  }

  Bubble.prototype.update = function(timeDiff){
    if(!this.held){
      var timeRatio = timeDiff / 1000
      this.x += this.dx * timeRatio
      this.y += this.dy * timeRatio
      this.lifespan--
      if(this.lifespan < 0){
        this.popped = true
      }
    }
  }
    
})()
