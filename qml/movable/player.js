.import "tank.js" as Base
.import "../base/class.js" as Class

function Player(level, playerNumber) {
    console.log("Player()")
    Base.Tank.call(this, level, "movable/Player.qml", "Players")

    this.playerNumber = playerNumber

    this.classNames.push("Player")
}

Class.inheritPrototype(Player, Base.Tank)

Player.prototype.die = function() {
    console.log("Player.die()")
    this.level.playerDied(this.playerNumber)

    Base.Tank.prototype.die.call(this)
}
