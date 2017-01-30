import QtQuick 2.0
import "spritesheet.js" as SpriteSheet

Item {
    id: root

    property real xPixelRatio: 1
    property real yPixelRatio: 1

    width: label.width
    height: label.height

    Item {
        id: label

        width: stage.width + number.width
        height: stage.height

        AnimatedSprite {
            id: stage
            source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
            interpolate: false
            frameSync: false
            frameCount: 1
            frameWidth: 40
            frameHeight: 8
            frameX: 328
            frameY: 176
            loops: 1
            running: false
            width: frameWidth * root.xPixelRatio
            height: frameHeight * root.yPixelRatio
        }

        AnimatedSprite {
            id: number
            anchors.left: stage.right

            source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
            interpolate: false
            frameSync: false
            frameCount: 1
            frameWidth: 8
            frameHeight: 8
            frameX: 336
            frameY: 184
            loops: 1
            running: false
            width: frameWidth * root.xPixelRatio
            height: frameHeight * root.yPixelRatio
        }
    }
}
