function Controller() {
    console.log("Controller()")
    this.controllable = null

    this.classNames = new Array()
    this.classNames.push("Controller")
}

Controller.prototype.think = function(deltaTime) {console.log("Controller.think(" + deltaTime + ")")}
Controller.prototype.setControllable = function(controllable) {this.controllable = controllable}
