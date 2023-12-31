class Ship extends PIXI.Sprite {
    constructor(x = 0, y = 0) {
        super(app.loader.resources["images/spaceship.png"].texture);
        this.anchor.set(.5, .5); // centered on sprite
        this.scale.set(0.1);
        this.x = x;
        this.y = y;
    }
}

class Circle extends PIXI.Graphics{
	constructor(radius, color=0xFF0000, x=0, y=0){
		super();
		this.beginFill(color);
		this.drawCircle(0,0,radius);
		this.endFill();
		this.x = x;
		this.y = y;
		this.radius = radius;

		// variables
		this.fwd = getRandomUnitVector();
		this.speed = 50;
		this.isAlive = true;
	}
	
	// abstract method - declared, but no implementation
	activate(){
	  
	}
	
	// public methods to be called from main.js
	move(dt=1/60){
		this.x += this.fwd.x * this.speed * dt;
		this.y += this.fwd.y * this.speed * dt;
	}
	
	reflectX(sceneWidth){
		this.fwd.x *= -1;
	}
	
	reflectY(sceneHeight){
		this.fwd.y *= -1;
	}
	
	// protected methods
	_wrapX(sceneWidth){
		if (this.fwd.x < 0 && this.x < 0 - this.radius){
			this.x = sceneWidth + this.radius;
		}
		if(this.fwd.x > 0 && this.x > sceneWidth + this.radius){
			this.x = 0 -  this.radius;
		}
	}
	
	_wrapY(sceneHeight){
		if (this.fwd.y < 0 && this.y < 0 - this.radius){
			this.y = sceneHeight + this.radius;
		}
		if(this.fwd.y > 0 && this.y > sceneHeight + this.radius){
			this.y = 0 - this.radius;
		}
	}
}

class WrappingCircle extends Circle {
    reflectX(sceneWidth) {
        this._wrapX(sceneWidth);
    }

    reflectY(sceneHeight) {
        this._wrapY(sceneHeight);
    }
}

class Bullet extends PIXI.Graphics {
    constructor(color=0xFFFFFF, x = 0, y = 0) {
        super();
        this.beginFill(color);
        this.drawCircle(-2, -3, 4, 6);
        this.endFill();
        this.x = x;
        this.y = y;

        // variables
        this.fwd = {x: 0, y: -1}
        this.speed = 400;
        this.isAlive = true;
        Object.seal(this);
    }

    move(dt = 1 / 60) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }
}