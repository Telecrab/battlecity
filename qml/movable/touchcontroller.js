.import "controller.js" as Base
.import "../base/class.js" as Class

function TouchController(touchButtons) {
    console.log("TouchController()")
    Base.Controller.call(this)

    this.touchButtons = touchButtons
    this.classNames.push("TouchController")
}

Class.inheritPrototype(TouchController, Base.Controller)

TouchController.prototype.think = function(deltaTime) {
//    console.log("TouchController.think()")
    if ( !Class.implementsClass(this.controllable, "Tank") ) return
    if (this.touchButtons == undefined) return

    if ( this.touchButtons.buttonFire.pressed ) {
        this.controllable.shoot()
    }

    if ( this.touchButtons.buttonLeft.pressed ) {
        this.controllable.moveLeft(1)
        return
    }

    if ( this.touchButtons.buttonRight.pressed ) {
        this.controllable.moveRight(1)
        return
    }

    if ( this.touchButtons.buttonUp.pressed ) {
        this.controllable.moveUp(1)
        return
    }

    if ( this.touchButtons.buttonDown.pressed ) {
        this.controllable.moveDown(1)
        return
    }

}
