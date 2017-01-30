import QtQuick 2.0

Item {
    property alias  sprite      : tank.sprite
    property alias  reloadTimer : tank.reloadTimer
    property alias  state       : tank.state
    property int    hp          : 1

    Tank {
        id: tank
        anchors.fill: parent

        frameOffsets: {
            "rightX": 224,
            "leftX": 160,
            "upX": 128,
            "downX": 192,
            "Y": 64
        }
    }
}
