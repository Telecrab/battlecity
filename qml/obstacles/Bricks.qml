import QtQuick 2.0
import "../spritesheet.js" as SpriteSheet

Item {
    property int hp: 1

    width: sprite.frameWidth
    height: sprite.frameHeight

    AnimatedSprite {
        id: sprite
        anchors.fill: parent

        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameX: 256
        frameY: 64
        frameCount: 1
        frameWidth: 8
        frameHeight: 8
        running: false
    }
}
