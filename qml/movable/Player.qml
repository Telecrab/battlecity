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
            "rightX": 96,
            "leftX": 32,
            "upX": 0,
            "downX": 64,
            "Y": 0
        }
    }
}
