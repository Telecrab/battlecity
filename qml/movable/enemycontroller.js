.import "controller.js" as Base
.import "../base/class.js" as Class

function EnemyController() {
    console.log("EnemyController()")
    Base.Controller.call(this)

    this.currentMovement    = null
    this.framesToMove       = 0

    this.decideToShoot = function() {
        var decision = Math.random()

        if (decision > 0.97) this.controllable.shoot()
    }

    this.moveControllable = function() {
        this.currentMovement.call(this.controllable, 1)
        this.framesToMove--
    }

    this.classNames.push("EnemyController")
}

Class.inheritPrototype(EnemyController, Base.Controller)

EnemyController.prototype.think = function(deltaTime) {
//    console.log("EnemyController.think()")
    if ( !Class.implementsClass(this.controllable, "Tank") ) return

    this.decideToShoot()

    if (this.framesToMove > 0) {
        this.moveControllable()
        return
    }

    var action        = Math.floor( Math.random() * (4)       )
    this.framesToMove = Math.floor( Math.random() * (50) + 3 )

    switch (action) {
    case 0:
        this.currentMovement = this.controllable.moveDown
        break

    case 1:
        this.currentMovement = this.controllable.moveLeft
        break

    case 2:
        this.currentMovement = this.controllable.moveUp
        break

    case 3:
        this.currentMovement = this.controllable.moveRight
        break

    default:
        break
    }

    this.moveControllable()
}
