import QtQuick 2.0
import "spritesheet.js" as SpriteSheet

Item {
    id: root
    property real buttonSize:   root.height / 3
    property var  buttonFire:   buttonFire
    property var  buttonDown:   buttonDown
    property var  buttonLeft:   buttonLeft
    property var  buttonRight:  buttonRight
    property var  buttonUp:     buttonUp

    height: parent.height / 3

    AnimatedSprite {
        id: rectangle
        width: root.buttonSize
        height: root.buttonSize

        anchors.bottom: rectangle1.top
        anchors.bottomMargin: 32
        anchors.left: parent.left
        anchors.leftMargin: 32

        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameX: 32
        frameCount: 1
        frameWidth: 16
        frameHeight: 16
        running: false

        MouseArea {
            id: buttonLeft
            anchors.fill: parent
        }
    }

    AnimatedSprite {
        id: rectangle1
        width: root.buttonSize
        height: root.buttonSize

        anchors.left: rectangle.right
        anchors.bottomMargin: 32
        anchors.bottom: parent.bottom
        anchors.leftMargin: 32

        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameX: 64
        frameCount: 1
        frameWidth: 16
        frameHeight: 16
        running: false

        MouseArea {
            id: buttonDown
            anchors.fill: parent
        }
    }

    AnimatedSprite {
        id: rectangle2
        width: root.buttonSize
        height: root.buttonSize

        anchors.left: rectangle1.right
        anchors.bottomMargin: 32
        anchors.bottom: rectangle1.top
        anchors.leftMargin: 32

        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameX: 96
        frameCount: 1
        frameWidth: 16
        frameHeight: 16
        running: false

        MouseArea {
            id: buttonRight
            anchors.fill: parent
        }
    }

    AnimatedSprite {
        id: rectangle3
        width: root.buttonSize
        height: root.buttonSize

        anchors.left: rectangle.right
        anchors.bottomMargin: 32
        anchors.bottom: rectangle.top
        anchors.leftMargin: 32

        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameX: 0
        frameCount: 1
        frameWidth: 16
        frameHeight: 16
        running: false

        MouseArea {
            id: buttonUp
            anchors.fill: parent
        }
    }

    AnimatedSprite {
        id: rectangle4
        width: root.buttonSize
        height: root.buttonSize

        anchors.right: parent.right
        anchors.rightMargin: 32
        anchors.verticalCenter: rectangle2.verticalCenter

        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameX: 352
        frameY: 112
        frameCount: 1
        frameWidth: 16
        frameHeight: 16
        running: false

        MouseArea {
            id: buttonFire
            anchors.fill: parent
        }
    }

}
