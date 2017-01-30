function GameObject(width, height, level, sprite) {
    console.log("GameObject()")

    this.halfWidth = width / 2
    this.halfHeight = height / 2

    this.setSize = function(width, height) {
        this.halfWidth = width / 2
        this.halfHeight = height / 2

        this.dynamicObject.width = width
        this.dynamicObject.height = height

    }

    var component = Qt.createComponent("../" + sprite);

    this.dynamicObject = component.createObject(level,
            {"x": this.x - this.halfWidth * level.xPixelRatio,
            "y": this.y - this.halfHeight * level.yPixelRatio,
            "width": this.halfWidth * 2 * level.xPixelRatio,
            "height": this.halfHeight * 2 * level.yPixelRatio})
    if (this.dynamicObject === null){
        console.log("error creating sprite")
        console.log(component.errorString())
        return null
    }

    this.hp = (this.dynamicObject.hp != undefined) ? this.dynamicObject.hp : -1

    this.solid = (this.dynamicObject.solid != undefined) ? this.dynamicObject.solid : true
    this.isSolid = function() {return this.solid}

    this.x = 0
    this.y = 0

    this.X = function() {return this.x}
    this.Y = function() {return this.y}

    this.right  = function() {return this.x + this.halfWidth}
    this.left   = function() {return this.x - this.halfWidth}
    this.top    = function() {return this.y - this.halfHeight}
    this.bottom = function() {return this.y + this.halfHeight}

    this.pos = function() { return {x: this.x, y: this.y} }

    this.setPos = function(newPos) {
        this.x = newPos.x
        this.y = newPos.y

        this.draw()
    }

    this.setX = function(newX) {this.setPos({x: newX, y: this.y})}
    this.setY = function(newY) {this.setPos({x: this.x, y: newY})}

    this.level = level
    this.classNames = new Array()
    this.classNames.push("GameObject")

    this.draw()
}

GameObject.prototype.think = function(deltaTime) {
//    console.log("GameObject.think(" + deltaTime + ")")
//    if ( this.dynamicObject.state === "die" ) this.level.removeObject(this)
}

GameObject.prototype.draw = function() {
//    console.log("GameObject.draw()")
    this.dynamicObject.x = (this.x - this.halfWidth) * this.level.xPixelRatio
    this.dynamicObject.y = (this.y - this.halfHeight) * this.level.yPixelRatio
    this.dynamicObject.width  = this.halfWidth  * 2 * this.level.xPixelRatio
    this.dynamicObject.height = this.halfHeight * 2 * this.level.yPixelRatio
}

GameObject.prototype.destroy = function() {
    console.log("GameObject.destroy()")
    this.dynamicObject.destroy()
}

GameObject.prototype.die = function() {
    this.dynamicObject.state = "die"
    this.level.removeObject(this)
}

GameObject.prototype.takeDamage = function(damage) {
    if (this.hp === -1) return // Indestructible

    this.hp -= damage
    if (this.hp <= 0) this.die()
}
