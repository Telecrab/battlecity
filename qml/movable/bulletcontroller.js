.import "controller.js" as Base
.import "../base/class.js" as Class

function BulletController(velocityVec) {
    console.log("BulletController()")
    Base.Controller.call(this)

    this.velocity = velocityVec
    this.classNames.push("BulletController")
}

Class.inheritPrototype(BulletController, Base.Controller)

BulletController.prototype.think = function(deltaTime) {
//    console.log("BulletController.think()")
    if( !Class.implementsClass(this.controllable, "Bullet") ) return

    this.controllable.tryMove(this.velocity)

}
