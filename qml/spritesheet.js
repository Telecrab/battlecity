.pragma library

// Workaround to allow seamless loading from .qrc or disk folders.
function url() {
    return Qt.resolvedUrl("sprite_sheet.png")
}
