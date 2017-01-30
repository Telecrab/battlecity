.import "base/gameobject.js" as Base
.import "base/class.js" as Class

function Explosion(level, sprite) {
    console.log("Explosion()")

//    var component = Qt.createComponent(sprite);

//    var dynamicObject = component.createObject()
//    if (dynamicObject === null){
//        console.log("error creating sprite")
//        console.log(component.errorString())
//        return null
//    }

//    Base.GameObject.call(this, dynamicObject.width, dynamicObject.height, level, sprite)
    Base.GameObject.call(this, 16, 16, level, sprite)


    this.solid = false

    this.classNames.push("Explosion")
}

Class.inheritPrototype(Explosion, Base.GameObject)

Explosion.prototype.think = function(deltaTime) {
//    console.log("Explosion.think()")
    if ( !(this.dynamicObject.running) ) this.die()

    Base.GameObject.prototype.think.call(this)
}
