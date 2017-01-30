import QtQuick 2.0
import "../spritesheet.js" as SpriteSheet

Item {
    id: root
    property alias sprite: sprite

    state: "moveUp"

    Timer {
        id: life
        interval: 1000
        running: false
        repeat: false
        onTriggered: root.state = "die"
    }

    AnimatedSprite {
        id: sprite
        anchors.fill: parent
        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameSync: false
        frameCount: 1
        frameWidth: 4
        frameHeight: 4
        frameX: 323
        frameY: 102
        loops: 1
        running: false
    }

    states: [
        State {
            name: "moveRight"
            PropertyChanges {
                target: sprite
                frameX: 346
                restoreEntryValues: false
            }
        },

        State {
            name: "moveLeft"
            PropertyChanges {
                target: sprite
                frameX: 330
                restoreEntryValues: false
            }
        },

        State {
            name: "moveUp"
            PropertyChanges {
                target: sprite
                frameX: 323
                restoreEntryValues: false
            }
        },

        State {
            name: "moveDown"
            PropertyChanges {
                target: sprite
                frameX: 339
                restoreEntryValues: false
            }
        },

        State {
            name: "die"
        }

    ]
}
