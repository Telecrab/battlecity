.import "movableobject.js" as Base
.import "../base/class.js" as Class
.import "bullet.js" as Bullet
.import "bulletcontroller.js" as BulletController
.import "../explosion.js" as Explosion

function Tank(level, sprite, team) {
    console.log("Tank()")
    Base.MovableObject.call(this, 14, 14, level, sprite) // Hack to allow tank freely move through 16x16 gaps.
                                                         // Should have size 16x16 and proper movement mechanics.
    this.speed = 0.6
    this.team = team

    var bulletCount = 0
    var bulletsLimit = 1

    this.incrementBulletCount = function() {bulletCount++}
    this.decrementBulletCount = function() {bulletCount--}
    this.bulletsLimit = function() {return bulletsLimit}
    this.setBulletsLimit = function(limit) {bulletsLimit = limit}

    var dynamicObject = this.dynamicObject
    var canShoot = function() {
        return !(dynamicObject.reloadTimer.running) && (bulletCount < bulletsLimit)
    }

    this.shoot = function() {
        if ( !canShoot() ) return

        var bullet = new Bullet.Bullet(this.level, this)

        var velocity
        switch (this.dynamicObject.state) {
        case "moveRight":
            velocity = {x: 1, y: 0}
            bullet.setPos({x: this.x + this.halfWidth, y: this.y})
            break

        case "moveLeft":
            velocity = {x: -1, y: 0}
            bullet.setPos({x: this.x - this.halfWidth, y: this.y})
            break

        case "moveUp":
            velocity = {x: 0, y: -1}
            bullet.setPos({x: this.x, y: this.y - this.halfHeight})
            break

        case "moveDown":
            velocity = {x: 0, y: 1}
            bullet.setPos({x: this.x, y: this.y + this.halfHeight})
            break

        default:
            bullet.destroy()
            return
        }

        var controller = new BulletController.BulletController(velocity)
        bullet.setController(controller)
        this.level.addObject(bullet)

        this.dynamicObject.reloadTimer.start()
    }

    this.classNames.push("Tank")
}

Class.inheritPrototype(Tank, Base.MovableObject)

Tank.prototype.test  = function() {console.log("TEST")}

Tank.prototype.die = function() {
    var explosion = new Explosion.Explosion(this.level, "TankExplosion.qml")
    explosion.setPos({x: this.x, y: this.y})

    this.level.addObject(explosion)

    Base.MovableObject.prototype.die.call(this)
}

//Tank.prototype.think = function() {
////    console.log("Tank.think()")
////    if ( this.dynamicObject.state === "die" ) {
////        var explosion = new Explosion.Explosion(this.level, "TankExplosion.qml")
////        explosion.setPos({x: this.x, y: this.y})

////        this.level.addObject(explosion)
////    }

//    Base.MovableObject.prototype.think.call(this)
//}

Tank.prototype.processCollisions = function(collisions) {
    //    console.log("Tank.processCollisions()")
    for (var i = 0; i < collisions.length; i++) {
        var object = collisions[i]

        if ( !object.isSolid() ) {
            continue
        }

        this.processCollision(object)
        return
    }
}
