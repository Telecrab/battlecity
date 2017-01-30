import QtQuick 2.0

Item {
    id: root

    property int phase: 8 // Fully faded.

    anchors.fill: parent

    Rectangle {
        id: upperRect

        color: 'dimgray'
        width: parent.width
        height: root.height / 15 * root.phase

    }

    Rectangle {
        id: lowerRect

        color: 'dimgray'
        rotation: 180
        transformOrigin: Item.Top
        anchors.top: parent.bottom
        width: parent.width
        height: root.height / 15 * root.phase

    }
}
