.import "../base/gameobject.js" as Base
.import "../base/class.js" as Class
.import "../explosion.js" as Explosion

function Headquarters(level) {
    console.log("Headquarters()")

    Base.GameObject.call(this, 16, 16, level, "obstacles/Headquarters.qml")

    this.classNames.push("Headquarters")
}

Class.inheritPrototype(Headquarters, Base.GameObject)

Headquarters.prototype.takeDamage = function(damage) {
    if (this.hp === -1) return

    this.dynamicObject.state = "destroyed"
    this.hp = -1
    this.level.gameOver()

    var explosion = new Explosion.Explosion(this.level, "TankExplosion.qml")
    explosion.setPos({x: this.x, y: this.y})

    this.level.addObject(explosion)
}
