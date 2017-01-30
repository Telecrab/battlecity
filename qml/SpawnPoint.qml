import QtQuick 2.0
import "spritesheet.js" as SpriteSheet

Item {
    id: root
    property alias sprite: sprite
    width: 14 // Hack. See "tank.js".
    height: 14

    AnimatedSprite {
        id: sprite
        anchors.fill: parent
        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameSync: false
        frameCount: 4
        frameWidth: 16
        frameHeight: 16
        frameX: 256
        frameY: 96
        loops: 1
        running: false
        visible: false

    }

    states: [
        State {
            name: "spawning"
            PropertyChanges {
                target: sprite
                visible: true
            }
        },

        State {
            name: "spawn"
            PropertyChanges {
                target: sprite
                visible: false
            }
        }

    ]

    transitions: [
        Transition {
            from: ""
            to: "spawning"

            SequentialAnimation {
                PropertyAction { target: sprite; property: "visible"; value: true }
                PropertyAnimation { target: sprite; property: "currentFrame"; from: 3; to: 0 }
                PropertyAnimation { target: sprite; property: "currentFrame";          to: 3 }
                PropertyAnimation { target: sprite; property: "currentFrame";          to: 0 }
                PropertyAnimation { target: sprite; property: "currentFrame";          to: 3 }
                PropertyAction { target: root; property: "state"; value: "spawn" }
            }
        }
    ]
}
