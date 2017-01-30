.import "../base/gameobject.js" as Base
.import "../base/class.js" as Class

function MovableObject(width, height, level, sprite) {
    console.log("MovableObject()")
    Base.GameObject.call(this, width, height, level, sprite)

    this.controller = null
    this.speed      = 1

    var checkCollisions = function() {
        var collisions = level.collidedWith(this)
        //        console.log(collisions.length)

        if ( collisions.length > 0 ) {
            this.processCollisions(collisions)
        }
    }

    this.tryMove = function(vector) {
//        console.log("MovableObject.tryMove()")

        this.x += vector.x * this.level.xPixelRatio
        this.y += vector.y * this.level.yPixelRatio

        this.dynamicObject.sprite.paused = false

        if (vector.x > 0) this.dynamicObject.state = "moveRight"
        else if (vector.x < 0) this.dynamicObject.state = "moveLeft"
        else if (vector.y < 0) this.dynamicObject.state = "moveUp"
        else if (vector.y > 0) this.dynamicObject.state = "moveDown"
        else this.dynamicObject.sprite.paused = true

        if ( (vector.x != 0) || (vector.y !== 0) ) {
            checkCollisions.call(this)
        }
    }

    var updateMovement = function(state) {
        this.dynamicObject.sprite.paused = false
        this.dynamicObject.state = state

        checkCollisions.call(this)
    }

    this.moveLeft = function(speedCoef) {
        this.x -= this.speed * speedCoef * this.level.xPixelRatio
        updateMovement.call(this, "moveLeft")
    }

    this.moveRight = function(speedCoef) {
        this.x += this.speed * speedCoef * this.level.xPixelRatio
        updateMovement.call(this, "moveRight")
    }

    this.moveUp = function(speedCoef) {
        this.y -= this.speed * speedCoef * this.level.yPixelRatio
        updateMovement.call(this, "moveUp")
    }

    this.moveDown = function(speedCoef) {
        this.y += this.speed * speedCoef * this.level.yPixelRatio
        updateMovement.call(this, "moveDown")
    }

    this.dontMove = function() {
        this.dynamicObject.sprite.paused = true
    }

    this.classNames.push("MovableObject")
}

Class.inheritPrototype(MovableObject, Base.GameObject)

MovableObject.prototype.think = function(deltaTime) {
//    console.log("MovableObject.think()")
    if ( (this.controller !== null) && (this.dynamicObject.state !== "die") ) {
        this.controller.think(deltaTime)
    }

    Base.GameObject.prototype.think.call(this)
}

MovableObject.prototype.processCollisions = function(collisions) {
    //    console.log("MovableObject.processCollisions()")
    for (var i = 0; i < collisions.length; i++) {
        var object = collisions[i]

        if ( this.isSolid() || object.isSolid() ) {
            this.processCollision(object)
        }
    }
}

MovableObject.prototype.processCollision = function(other) {
//    console.log("MovableObject.processCollision()")

    switch (this.dynamicObject.state) {
    case "moveRight":
        this.setX( this.X() - ( this.right() - other.left() ) - 0.1 )
        break

    case "moveLeft":
        this.setX( this.X() + ( other.right() - this.left() ) + 0.1 )
        break

    case "moveUp":
        this.setY( this.Y() + ( other.bottom() - this.top() ) + 0.1 )
        break

    case "moveDown":
        this.setY( this.Y() - ( this.bottom() - other.top() ) - 0.1 )
        break

    default:
        break
    }
}

MovableObject.prototype.setController = function(newController) {
    if (newController == null) {
        this.controller = null
        return
    }

    if ( !Class.implementsClass(newController, "Controller") ) return

//    console.log("MovableObject.setController()")
    this.controller = newController
    this.controller.setControllable(this)
}
