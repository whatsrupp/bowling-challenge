describe('Throw',function(){
  var ballThrow;
  var normalThrowScore = 7
  beforeEach(function(){
    ballThrow = new Throw();
  });

  describe('Initalize',function(){
    it('defaults to full frame unless specified',function(){
      expect(ballThrow.pinsLeft).toEqual(10);
      ballThrow = new Throw(2);
      expect(ballThrow.pinsLeft).toEqual(2);
    });
  });

  describe('#rollBall', function(){
    it('uses Math.random to return a number between 1 and 10', function(){
      spyOn(Math,'random');
      ballThrow.throwBall();
      expect(Math.random).toHaveBeenCalled();
    });
    it("Can't return a number greater than the amount of pins left", function(){
      spyOn(Math,'random').and.returnValue(0.99);
      ballThrow.pinsLeft = normalThrowScore
      expect(ballThrow.throwBall()).toEqual(normalThrowScore);
    });
  });

  describe('#updatePins',function(){
    it('changes the number of pins when called',function(){
        ballThrow.updatePins(normalThrowScore)
        expect(ballThrow.pinsLeft).toEqual(10-normalThrowScore)
    });
  });

  describe('#resetPins',function(){
    it('sets the pins back to 10',function(){
      this.pinsLeft = 5
      ballThrow.resetPins()
      expect(ballThrow.pinsLeft).toEqual(10);
    });
  });

});