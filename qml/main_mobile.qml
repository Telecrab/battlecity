import QtQuick 2.4

Item {
    id: wnd
    visible: true
    anchors.fill: parent

    KeyMap{
        id: kbrd
        focus: true
    }

    TouchButtons {
        id: touchButtons
        z: 100
        visible: level.touchControls
        anchors.bottom: parent.bottom
        anchors.right: parent.right
        anchors.left: parent.left
    }

    Level {
        id:level
    }
}
