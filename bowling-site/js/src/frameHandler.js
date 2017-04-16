// manages the play through of a single bowling frame

function FrameHandler(throwerClass){
  this.thrower= throwerClass
  this.frameNumber = 0
  this.startFrame();
}

FrameHandler.prototype.startFrame = function(){
  this._resetThrowerPins();
  this._resetScores();
  this._resetThrowNumber();
  this._resetCompletion();
}

FrameHandler.prototype.startRound = function(){
  this.preThrowChecks();
  this.throw();
  this.postThrowUpdates();
}

FrameHandler.prototype.postThrowUpdates = function(){
  this._endThrow();
  if(this._isFrameOver()){
    this._endFrame();
    this._incrementFrameNumber();
  }
}
FrameHandler.prototype._resetThrowerPins = function(){
  this.thrower.resetPins();
}

FrameHandler.prototype._resetScores = function(){
  this.result= {
    throw1: 0,
    throw2: 0,
    throw3: 0,
  }
}

FrameHandler.prototype._resetThrowNumber = function(){
  this.throwNumber = 0;
}

FrameHandler.prototype._resetCompletion=function(){
  this.isComplete = false;
}



FrameHandler.prototype.preThrowChecks = function(){
  if (this.isComplete){
    throw new TypeError("Frame is over, can't throw")
  }
}

FrameHandler.prototype.throw= function(){
  var throw_result = this._throwBall();
  this.updateScore(throw_result);

}


FrameHandler.prototype._incrementFrameNumber=function(){
  this.frameNumber ++;
}

FrameHandler.prototype._isFrameOver = function(){
  var strike = this._isStrike();
  var notFrame10 = this._isNotInFrame10();
  var noThrowsLeft = this._isThrowLimitExceeded();
  var normalFrame10 = this._isNormalFrame10();
  return ((notFrame10 && strike) || noThrowsLeft || normalFrame10);
}

FrameHandler.prototype._isThrowLimitExceeded = function(){
  if (this._isNotInFrame10()){
    return (this.throwNumber > 1)
  }else{
    return (this.throwNumber > 2)
  }

}

FrameHandler.prototype._isNormalFrame10 = function(){
  frameTotal = this.result.throw1 + this.result.throw2
  return (frameTotal < 10 && this.throwNumber == 2)
}

FrameHandler.prototype._isNotInFrame10 = function(){
  return this.frameNumber < 9
}


FrameHandler.prototype._endFrame = function (){
  this.isComplete = true;
}

FrameHandler.prototype._endThrow = function(){
  this.throwNumber += 1;
}

FrameHandler.prototype.updateScore= function(score){
  var throwNumber = this.throwNumber
  if(throwNumber === 0){
    this.result.throw1 = score;
  }else if (throwNumber === 1){
    this.result.throw2 = score;
  }else {
    this.result.throw3 = score;
  }

}

FrameHandler.prototype._isStrike = function(){
  return (this.result.throw1 == 10  );
}

FrameHandler.prototype._throwBall = function(){
  return this.thrower.throw();

}