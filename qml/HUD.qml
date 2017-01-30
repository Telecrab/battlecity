import QtQuick 2.0
import "spritesheet.js" as SpriteSheet

Item {
    id: root

    property real xPixelRatio: 1
    property real yPixelRatio: 1
    property int  p1Lives    : 0
    property int  p2Lives    : 0
    property int  enemyLives : 0

    width: sprite.width
    height: sprite.height


    AnimatedSprite {
        id: sprite
        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
        interpolate: false
        frameSync: false
        frameCount: 1
        frameWidth: 32
        frameHeight: 240
        frameX: 368
        frameY: 0
        loops: 1
        running: false
        width: frameWidth * root.xPixelRatio
        height: frameHeight * root.yPixelRatio

        Grid {
            x: root.width - (24 * root.xPixelRatio)
            y: 24 * root.yPixelRatio
            z: 1000

            columns: 2
            spacing: 0

            Repeater {
                model: root.enemyLives

                delegate: AnimatedSprite {
                        width: frameWidth * level.xPixelRatio
                        height: frameHeight * level.yPixelRatio

                        source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
                        interpolate: false
                        frameX: 320
                        frameY: 192
                        frameCount: 1
                        frameWidth: 8
                        frameHeight: 8
                        running: false
                    }
            }
        }

        AnimatedSprite {
            x: root.width - (16 * root.xPixelRatio)
            y: 144 * root.yPixelRatio
            width: frameWidth * root.xPixelRatio
            height: frameHeight * root.yPixelRatio

            source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
            interpolate: false
            frameX: 328
            frameY: 184
            frameCount: 5
            currentFrame: root.p1Lives
            frameWidth: 8
            frameHeight: 8
            running: false
        }

        AnimatedSprite {
            x: root.width - (16 * root.xPixelRatio)
            y: 168 * root.yPixelRatio
            width: frameWidth * root.xPixelRatio
            height: frameHeight * root.yPixelRatio

            source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
            interpolate: false
            frameX: 328
            frameY: 184
            frameCount: 5
            currentFrame: root.p2Lives
            frameWidth: 8
            frameHeight: 8
            running: false
        }

        AnimatedSprite {
            x: root.width - (24 * root.xPixelRatio)
            y: 200 * root.yPixelRatio
            width: frameWidth * root.xPixelRatio
            height: frameHeight * root.yPixelRatio

            source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
            interpolate: false
            frameX: 328
            frameY: 184
            frameCount: 5
            frameWidth: 8
            frameHeight: 8
            running: false
        }

        AnimatedSprite {
            x: root.width - (16 * root.xPixelRatio)
            y: 200 * root.yPixelRatio
            width: frameWidth * root.xPixelRatio
            height: frameHeight * root.yPixelRatio

            source: SpriteSheet.url() //"qrc:/qml/sprite_sheet.png"
            interpolate: false
            frameX: 328
            frameY: 184
            frameCount: 5
            currentFrame: 1
            frameWidth: 8
            frameHeight: 8
            running: false
        }
    }

}
