.import "movableobject.js" as Base
.import "../base/class.js" as Class
.import "../explosion.js" as Explosion

function Bullet(level, shooter) {
    console.log("Bullet()")
    Base.MovableObject.call(this, 4, 4, level, "movable/Bullet.qml")

    this.shooter = shooter
    this.shooter.incrementBulletCount()

    this.solid = false

    this.classNames.push("Bullet")
}

Class.inheritPrototype(Bullet, Base.MovableObject)

Bullet.prototype.destroy = function() {
//    console.log("Bullet.destroy()")
    this.shooter.decrementBulletCount()

    Base.MovableObject.prototype.destroy.call(this)
}

Bullet.prototype.die = function() {
    var explosion = new Explosion.Explosion(this.level, "BulletExplosion.qml")
    explosion.setPos({x: this.x, y: this.y})

    this.level.addObject(explosion)

    Base.MovableObject.prototype.die.call(this)
}

//Bullet.prototype.think = function() {
////    console.log("Bullet.think()")
////    if ( this.dynamicObject.state === "die" ) {
////        var explosion = new Explosion.Explosion(this.level, "BulletExplosion.qml")
////        explosion.setPos({x: this.x, y: this.y})

////        this.level.addObject(explosion)
////    }

//    Base.MovableObject.prototype.think.call(this)
//}

Bullet.prototype.processCollisions = function(collisions) {
    //    console.log("MovableObject.processCollisions()")
    var collisionState = 0

    // Can damage several objects at once as in the original game.
    for (var i = 0; i < collisions.length; i++) {
        var object = collisions[i]

        if ( Class.implementsClass(object, "Bullet") && (object.shooter !== this.shooter) ) {
            object.takeDamage(1)
            collisionState = 1
            continue
        }

        if ( object.isSolid() && (object !== this.shooter) ) {
            if ( Class.implementsClass(object, "Tank") && (object.team === this.shooter.team) ) return

            object.takeDamage(1)
            collisionState = 2

        }
    }

    switch (collisionState) {
    case 0:
        return // No collision

    case 1:
        this.level.removeObject(this)
        break

    case 2:
        this.die()
        break
    }
}

Bullet.prototype.takeDamage = function(damage) {
    this.level.removeObject(this)
}
