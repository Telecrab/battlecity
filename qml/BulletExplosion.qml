import QtQuick 2.0
import "spritesheet.js" as SpriteSheet

Item {
    property alias running: sprite.running
    width: 16
    height: 16

    AnimatedSprite {
        id: sprite
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
    }
}
