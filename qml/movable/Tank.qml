import QtQuick 2.0
import "../spritesheet.js" as SpriteSheet

Item {
    property alias sprite: sprite
    property alias reloadTimer: reloadTimer
    property var frameOffsets: {}

    state: "moveUp"

    Rectangle {
        anchors.fill: parent
        color: 'transparent'
        border.width: 1
        visible: false
    }

    Timer {
        id: reloadTimer
        interval: 33
        repeat: false
        running: false
    }

    AnimatedSprite {
        id: sprite
        anchors.fill: parent
        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameY: frameOffsets.Y
        frameCount: 2
        frameRate: 10
        frameWidth: 16
        frameHeight: 16
        running: true
    }

    states: [
        State {
            name: "moveRight"
            PropertyChanges {
                target: sprite
                frameX: frameOffsets.rightX
                restoreEntryValues: false
            }
        },

        State {
            name: "moveLeft"
            PropertyChanges {
                target: sprite
                frameX: frameOffsets.leftX
                restoreEntryValues: false
            }
        },

        State {
            name: "moveUp"
            PropertyChanges {
                target: sprite
                frameX: frameOffsets.upX
                restoreEntryValues: false
            }
        },

        State {
            name: "moveDown"
            PropertyChanges {
                target: sprite
                paused: false
                frameX: frameOffsets.downX
                restoreEntryValues: false
            }
        },

        State {
            name: "die"
        }

    ]
}
