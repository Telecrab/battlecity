.import "tank.js" as Base
.import "../base/class.js" as Class

function Enemy(level) {
    console.log("Enemy()")
    Base.Tank.call(this, level, "movable/Enemy.qml", "Enemies")

    level.enemiesOnScreen++
    level.enemySpawnTimer.start()

    this.classNames.push("Enemy")
}

Class.inheritPrototype(Enemy, Base.Tank)

Enemy.prototype.die = function() {    
    level.enemiesOnScreen--
    this.level.enemyDied()

    Base.Tank.prototype.die.call(this)
}
