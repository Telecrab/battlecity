.pragma library

function inheritPrototype(derivedObject, baseObject) {
    var copyOfBase = Object.create(baseObject.prototype)
    copyOfBase.constructor = derivedObject
    derivedObject.prototype = copyOfBase

    console.log("Inherited " + derivedObject.name + " from " + baseObject.name)
}

function checkBaseClass(object, baseClass) {
    var tmp = object
    while (tmp !== null) {
        console.log(tmp.constructor.name)
        if(tmp instanceof baseClass) return true

        tmp = tmp.prototype
    }
    return false
}

function implementsClass(object, className) {
    if ( !object.hasOwnProperty("classNames") ) return false

    if ( object.classNames.indexOf(className) === -1 ) return false
    else return true
}
