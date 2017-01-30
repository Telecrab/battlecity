.import "controller.js" as Base
.import "../base/class.js" as Class

function LocalPlayerController(keyboard) {
    console.log("LocalPlayerController()")
    Base.Controller.call(this)

    this.keyboard = keyboard
    this.classNames.push("LocalPlayerController")
}

Class.inheritPrototype(LocalPlayerController, Base.Controller)

LocalPlayerController.prototype.think = function(deltaTime) {
//    console.log("LocalPlayerController.think()")
    if ( !Class.implementsClass(this.controllable, "Tank") ) return
    if (this.keyboard == undefined) return

    if ( this.keyboard.isKeyDown(Qt.Key_D) ) {
        this.controllable.die()
    }

    if ( this.keyboard.isKeyDown(Qt.Key_Space) ) {
        this.controllable.shoot()
    }

    var dx = 0
    if ( this.keyboard.isKeyDown(Qt.Key_Left) ) {
//        dx -= 0.6
        this.controllable.moveLeft(1)
        return
    }

    if ( this.keyboard.isKeyDown(Qt.Key_Right) ) {
//        dx += 0.6
        this.controllable.moveRight(1)
        return
    }

//    if (dx !== 0) {
//        this.controllable.tryMove({x: dx, y: 0})
//        return
//    }

    var dy = 0
    if ( this.keyboard.isKeyDown(Qt.Key_Up) ) {
//        dy -= 0.6
        this.controllable.moveUp(1)
        return
    }

    if ( this.keyboard.isKeyDown(Qt.Key_Down) ) {
//        dy += 0.6
        this.controllable.moveDown(1)
        return
    }

    this.controllable.dontMove()

//    this.controllable.tryMove({x: 0, y: dy})

}
