.import "base/gameobject.js" as Base
.import "base/class.js" as Class

function SpawnPoint(level) {
    console.log("SpawnPoint()")

//    var component = Qt.createComponent("SpawnPoint.qml");

//    var dynamicObject = component.createObject()
//    if (dynamicObject === null){
//        console.log("error creating sprite")
//        console.log(component.errorString())
//        return null
//    }

//    Base.GameObject.call(this, dynamicObject.width, dynamicObject.height, level, "SpawnPoint.qml")

    Base.GameObject.call(this, 14, 14, level, "SpawnPoint.qml")

    this.solid = false
    this.spawnFunc = null
    this.spawnedObject = null

    this.spawn = function(spawnFunc) {
        this.dynamicObject.state = "spawning"
        this.spawnFunc = spawnFunc
    }

    this.classNames.push("SpawnPoint")
}

Class.inheritPrototype(SpawnPoint, Base.GameObject)

SpawnPoint.prototype.think = function(deltaTime) {
//    console.log("SpawnPoint.think()")

    if (this.dynamicObject.state === "spawn") {
        var collisions = this.level.collidedWith(this)
        for (var i = 0; i < collisions.length; i++) {
            if ( collisions[i].isSolid() ) { // Don't spawn over solid objects.
                Base.GameObject.prototype.think.call(this)
                return
            }
        }

        var object = this.spawnFunc(this)
        object.setPos( this.pos() )
        this.level.addObject(object)

        this.spawnedObject = object
        this.dynamicObject.state = ""
    }

    Base.GameObject.prototype.think.call(this)
}
