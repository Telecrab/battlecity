import QtQuick 2.0
import "spritesheet.js" as SpriteSheet

Item {
    property bool running: sprite1.running || sprite2.running
    width: 16
    height: 16

    AnimatedSprite {
        id: sprite1
        anchors.fill: parent
        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameSync: false
        frameX: 256
        frameY: 128
        frameCount: 3
        frameWidth: 16
        frameHeight: 16
        loops: 1
        frameRate: 12
        running: true
        visible: running
    }

    AnimatedSprite {
        id: sprite2
        anchors.centerIn: parent
        width: parent.width * 2
        height: parent.height * 2
        source: "qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameSync: false
        frameX: 304
        frameY: 128
        frameCount: 2
        frameWidth: 32
        frameHeight: 32
        loops: 1
        frameRate: 12
        running: !sprite1.running
        visible: running
    }
}
