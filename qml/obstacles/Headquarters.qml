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
        frameX: 304
        frameY: 32
        frameCount: 1
        frameWidth: 16
        frameHeight: 16
        running: false
    }

    states: [
        State {
            name: "destroyed"
            PropertyChanges {target: sprite; frameX: 320}
        }

    ]
}
