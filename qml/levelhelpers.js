.import "movable/localplayercontroller.js" as LPCntrl
.import "movable/touchcontroller.js" as TouchCntrl
.import "movable/enemycontroller.js" as EnmCntrl
.import "movable/player.js" as Player
.import "movable/enemy.js" as Enemy
.import "spawnpoint.js" as Spawn
.import "base/gameobject.js" as GameObject
.import "obstacles/headquarters.js" as Headquarters

var level
var currentEnemySpawn = 0

function aabbOverlaps(object1, object2) {
    var x = Math.abs(object1.x - object2.x) <= (object1.halfWidth + object2.halfWidth)
    var y = Math.abs(object1.y - object2.y) <= (object1.halfHeight + object2.halfHeight)

    return x && y
}

function spawnPlayer(playerNumber) {
    if (playerNumber >= level.playerSpawns.length) return

    var controller

    switch (playerNumber) {
    case 0:
        if (level.touchControls) {
            controller = new TouchCntrl.TouchController(touchButtons)
        } else {
            controller = new LPCntrl.LocalPlayerController(kbrd)
        }
        break

    default:
        controller = new LPCntrl.LocalPlayerController()
        break
    }

    level.playerSpawns[playerNumber].spawn(function(parent){
        var object = new Player.Player(level, playerNumber)
        object.setController(controller)
        return object
    })
}

function spawnEnemy() {
    if ( (level.enemyLives === 0) || (level.enemiesOnScreen > 2) ) return
    if (currentEnemySpawn >= level.enemySpawns.length) currentEnemySpawn = 0

    level.enemySpawns[currentEnemySpawn].spawn(function(parent){
        var object = new Enemy.Enemy(level)
        object.setController( new EnmCntrl.EnemyController() )
        return object
    })

    currentEnemySpawn++
    level.enemyLives--
}

function loadLevel(layout) {
    level.objects.forEach(function(object){
        object.destroy()
    })
    level.objects = []
    level.playerSpawns = []
    level.enemySpawns  = []

    var column = 2
    var row    = 2
    var size
    var object

    layout.forEach(function(type){
        switch (type) {
        case 1:
            size = 16
            object = new Spawn.SpawnPoint(level)
            object.setPos({x: (8 * column) + (size / 2), y: (8 * row) + (size / 2)})
            level.addObject(object)
            level.enemySpawns.push(object)
            break

        case 2:
            size = 8
            object = new GameObject.GameObject(size, size, level, "obstacles/Bricks.qml")
            object.setPos({x: (8 * column) + (size / 2), y: (8 * row) + (size / 2)})
            level.addObject(object)
            break

        case 3:
            size = 8
            object = new GameObject.GameObject(size, size, level, "obstacles/Concrete.qml")
            object.setPos({x: (8 * column) + (size / 2), y: (8 * row) + (size / 2)})
            level.addObject(object)
            break

        case 4:
            size = 16
            object = new Spawn.SpawnPoint(level)
            object.setPos({x: (8 * column) + (size / 2), y: (8 * row) + (size / 2)})
            level.addObject(object)
            level.playerSpawns.push(object)

            if (level.playerLives.length < level.playerSpawns.length) level.playerLives.push(2)

            break

        case 5:
            size = 16
            object = new Headquarters.Headquarters(level)
            object.setPos({x: (8 * column) + (size / 2), y: (8 * row) + (size / 2)})
            level.addObject(object)
            break

        default:
            break
        }

        column++
        if (column > 27) {
            column = 2
            row ++
        }
    })

    // Top wall
    var wall = new GameObject.GameObject(256, 16, level, "obstacles/LevelBoundary.qml")
    wall.setPos({x: 128, y: 8})
    level.addObject(wall)

    // Right wall
    wall = new GameObject.GameObject(32, 240, level, "obstacles/LevelBoundary.qml")
    wall.setPos({x: 240, y: 120})
    level.addObject(wall)

    // Bottom wall
    wall = new GameObject.GameObject(256, 16, level, "obstacles/LevelBoundary.qml")
    wall.setPos({x: 128, y: 232})
    level.addObject(wall)

    // Left wall
    wall = new GameObject.GameObject(16, 240, level, "obstacles/LevelBoundary.qml")
    wall.setPos({x: 8, y: 120})
    level.addObject(wall)

    spawnPlayer(0)
    level.enemyLives = 20
}
