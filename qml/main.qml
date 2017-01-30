import QtQuick 2.5
import QtQuick.Window 2.2

Window {
    id: wnd
    visible: true
    width: 512
    height: 480
    title: qsTr("Hello World")

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
