import QtQuick 2.0
import "levels/level1.js" as Level1
import "levels/win.js" as Win
import "levelhelpers.js" as LevelHelpers
import "base/gameobject.js" as GameObject
import "base/class.js" as Class
import "spritesheet.js" as SpriteSheet

Rectangle {
    id: level

    property real xPixelRatio: width / 256
    property real yPixelRatio: height / 240

    property var  objects
    property var  playerSpawns
    property var  playerLives
    property var  enemySpawns
    property int  enemyLives: 0
    property int  enemiesOnScreen: 0

    property bool touchControls: Qt.platform.os === "android"

    property var  enemySpawnTimer: enemySpawnTimer

    property var addObject: function(object) {objects.push(object)}
    property var removeObject: function(object) {
        var index = objects.indexOf(object)
        if (index > -1) {
            objects.splice(index, 1);
        }
        object.destroy()
    }

    property var hasObject: function(object) {
        return objects.indexOf(object) > -1
    }

    property var collidedWith: function(object) {
        var collisions = new Array
        level.objects.forEach(function(target){
            if (target === object) return
            if ( LevelHelpers.aabbOverlaps(object, target) ) collisions.push(target)
        })

        return collisions
    }

    property var playerDied: function(playerNumber) {
        if (level.playerLives[playerNumber] === 0) level.gameOver()
        if (level.state === "gameOver") return // Game over

        level.playerLives[playerNumber]--
        LevelHelpers.spawnPlayer(playerNumber)
        hud.p1Lives = level.playerLives[0]
    }

    property var enemyDied: function() {
        if ( (level.enemyLives === 0) && (level.enemiesOnScreen === 0) ) {
            if (level.state !== "gameOver") level.state = "win"

            return
        }

        enemySpawnTimer.start()
//        LevelHelpers.spawnEnemy()
    }

    property var gameOver: function() {
        level.objects.forEach(function(object){
            if ( Class.implementsClass(object, "Player") ) object.setController(null)
        })

        level.state = "gameOver"
    }

    property var init: function() {
        LevelHelpers.level = level

        level.playerLives  = []
        level.objects      = []

        LevelHelpers.loadLevel(Level1.layout)

        hud.p1Lives = level.playerLives[0]
        level.state = "play"
    }

    anchors.centerIn: parent
    width:  parent.width > parent.height ? parent.height * 256 / 240 : parent.width
    height: width * 240 / 256

    color: 'black'
    state: 'start'

    Timer {
        id: tmr
        interval: 16; running: false; repeat: true
        onTriggered: {
            level.objects.forEach( function(object){
                object.think(interval)
                object.draw()
            })
        }
    }

    Timer {
        id: enemySpawnTimer
        interval: 1000
        running: false
        onTriggered: {
            if ( (level.enemyLives === 0) || (level.enemiesOnScreen > 2) ) return
            LevelHelpers.spawnEnemy()

//            if (level.enemyLives > 0) start()
        }
    }

    Timer {
        interval: 1000; running: true; repeat: false
        onTriggered: level.init()
    }

    AnimatedSprite {
        id: gameOverText

        x: (level.width / 2) - (gameOverText.width / 2) - (8 * level.xPixelRatio)
        y: level.height
        z: 1000
        width: frameWidth * level.xPixelRatio
        height: frameHeight * level.yPixelRatio

        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameX: 289
        frameY: 184
        frameCount: 1
        frameWidth: 31
        frameHeight: 15
        running: false
    }

    ScreenFade {id: fade; z: 10000}

    StageLabel {
        id: stage
        xPixelRatio: level.xPixelRatio
        yPixelRatio: level.yPixelRatio

        x: (level.width / 2) - (stage.width / 2)
        y: 112 * level.yPixelRatio
        z: 10000
    }

    HUD {
        id: hud
        x: level.width - hud.width
        z: 1000
        xPixelRatio: level.xPixelRatio
        yPixelRatio: level.yPixelRatio
        enemyLives: level.enemyLives
        visible: false
    }

    states: [
        State {
            name: "start"
        },

        State {
            name: "play"
        },

        State {
            name: "gameOver"
        },

        State {
            name: "win"
        }

    ]

    transitions: [
        Transition {
            from: "start"
            to: "play"
            SequentialAnimation {
                PropertyAction {
                    target: stage
                    property: "visible"
                    value: false
                }

                PropertyAnimation {
                    target: fade
                    property: "phase"
                    from: 8
                    to: 0
                    duration: 500
                }

                ScriptAction {
                    script: {
                        tmr.start()
                        enemySpawnTimer.start()
//                        LevelHelpers.spawnEnemy()
                        hud.visible = true
                    }
                }
            }
        },

        Transition {
            from: "play"
            to: "gameOver"
            PropertyAnimation {
                target: gameOverText
                property: "y"
                to: (level.height / 2) - (gameOverText.height / 2)
                duration: 2000
            }
        },

        Transition {
            from: "play"
            to: "win"
            SequentialAnimation {
                PropertyAnimation {
                    target: fade
                    property: "phase"
                    to: 8
                    duration: 500
                }

                ScriptAction {
                    script: {
                        enemySpawnTimer.stop()
                        LevelHelpers.loadLevel(Win.layout)
                        hud.visible = false
                    }
                }

                PauseAnimation { duration: 500 }

                PropertyAnimation {
                    target: fade
                    property: "phase"
                    to: 0
                    duration: 500
                }

                ScriptAction {
                    script: { hud.visible = true }
                }
            }
        }
    ]
}
