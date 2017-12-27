// tetris.js for tetris.html 

// some general utility functions

// get query parms
var getParameterByName = function(name, url) {
    if (!url) { url = window.location.href }
    console.log('Getting query parameter ' + name + ' from [' + url + ']')

    name = name.replace(/[\[\]]/g, "\\$&")
    var regex = new RegExp( "[?&]" + name + "(=([^&#]*)|&|#|$)" )
    results = regex.exec(url)

    if (!results) { return null }
    if (!results[2]) { return '' }

    return decodeURIComponent(results[2].replace(/\+/g, " "))
}

// convert int to hex with length 2 (for color)
var color2hex = function(val) {
    var out = val.toString(16)
    if (out.length === 1) { return '0' + out }
    return out
}

// modify color by amt on rbg
// previous implementation - operate on hexval
/*
var LightenDarkenColor = function(col, amt) {
    if (amt === 0) { return col } 
    var usePound = false
    if ( col[0] == "#" ) {
        col = col.slice(1)
        usePound = true
    }

    var num = parseInt(col, 16)
    
    var r = (num >> 16) + amt
    if ( r > 255 ) { r = 255 }
    else if (r < 0)  { r = 0 }

    var b = ((num >> 8) & 0x00FF) + amt
    if ( b > 255 ) { b = 255 }
    else if (b < 0) { b = 0 }

    var g = (num & 0x0000FF) + amt
    if ( g > 255 ) { g = 255 }
    else if ( g < 0 ) { g = 0 }
    
    var out = (usePound ? "#" : "") + color2hex(r) + color2hex(b) + color2hex(g)
    return out
}
*/

var hex2array = function(col) {
    if ( col[0] == "#" ) {
        col = col.slice(1) 
    }
    var num = parseInt(col, 16) 
    var r = (num >> 16) 
    var b = ((num >> 8) & 0x00FF) 
    var g = (num & 0x0000FF)
    //console.log(col)
    //console.log([r, b, g])
    return [r, b, g]
}

var rbgarray2rgb = function(col) {
    var r, b, g
    r = col[0]
    b = col[1]
    g = col[2]
    return "rgb(" + [r, g, b].join(", ") + ")"
}

var clampColor = function(val) {
    return Math.min(Math.max(0, val), 255)
}

// new implementation - col is array of length 3 of format [r, b, g]
var LightenDarkenColor = function(col, amt) {
    var r, b, g
    r = clampColor(col[0] + amt)
    b = clampColor(col[1] + amt)
    g = clampColor(col[2] + amt)
    var out = [r, b, g]
    //console.log(out)
    return out
}


// generate a random number between 1 and n
var rand1ToN = function(n) {
    return Math.floor((Math.random() * n) + 1)
}

// equivalent to python code: return arr[:-1] + arr2 + arr[-1:]
var mergeArrays = function(arr1, arr2) {
    return arr1.slice(0, -1).concat(arr2).concat(arr1.slice(-1))
}

// gather information on wild mode
var wildMode = (getParameterByName('wild') === 'true')
console.log('wild mode is ' + wildMode)

var websiteTitleSpan = document.getElementById("gametitle")
if (wildMode) {
    websiteTitleSpan.innerHTML = `<span class="jane"> Wild </span> Tetris`
} else {
    websiteTitleSpan.innerHTML = `Tetris`
}

var wildColors = [
    "#7899ff",
    "#993325",
    "#caca00",
    "#aaa930",
    "#cc40ca",
    "#410140",
    "#00ef94",
    "#ffe3a9",
    "#ee8855",
    "#0afaf0",
    "#90ee73",
    "#aa90ee",
    "#ccdd90"
]
var wildShapes = [
    "Lsmall",
    "Llarge",
    "Ismall",
    ".",
    "TL1",
    "TL2",
    "Ismaller",
    "2balls",
    "star",
    "gary1",
    "gary2",
    "rocket"
]
var wildBoardPositions = [
    [
        [[0, 0], [0, -1], [1, -1]],
        [[0, -1], [1, 0], [1, -1]],
        [[0, 0], [1, 0], [1, -1]],
        [[0, 0], [1, 0], [0, -1]]
    ],
    [
        [[0, 0], [0, 1], [0, -1], [1, -1], [2, -1]],
        [[0, -1], [1, -1], [2, -1], [2, 0], [2, 1]],
        [[2, -1], [2, 0], [2, 1], [1, 1], [0, 1]],
        [[0, 0], [0, -1], [0, 1], [1, 1], [2, 1]]
    ],
    [
        [[0, 0], [0, -1], [0, 1]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 0], [0, -1], [0, 1]],
        [[0, 0], [1, 0], [2, 0]]
    ],
    [
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]]
    ],
    [
        [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1]],
        [[0, 0], [1, -1], [1, 0], [1, 1], [1, 2]],
        [[0, 1], [1, 1], [2, 1], [3, 1], [2, 0]],
        [[0, -1], [0, 0], [0, 1], [0, 2], [1, 1]]
    ],
    [
        [[0, 0], [1, 0], [2, 0], [3, 0], [1, -1]],
        [[0, 0], [0, -2], [0, -1], [0, 1], [1, -1]],
        [[0, -1], [1, -1], [2, -1], [3, -1], [2, 0]],
        [[0, 0], [1, -2], [1, -1], [1, 0], [1, 1]]
    ],
    [
        [[0, 0], [1, 0]],
        [[0, 0], [0, 1]],
        [[0, 0], [1, 0]],
        [[0, 0], [0, 1]]
    ],
    [
        [[0, 0], [1, 1]],
        [[1, 0], [0, 1]],
        [[0, 0], [1, 1]],
        [[1, 0], [0, 1]]
    ],
    [
        [[0, 0], [1, 0], [2, 0], [1, -1], [1, 1]],
        [[0, 0], [1, 0], [2, 0], [1, -1], [1, 1]],
        [[0, 0], [1, 0], [2, 0], [1, -1], [1, 1]],
        [[0, 0], [1, 0], [2, 0], [1, -1], [1, 1]]
    ],
    [
        [[0, 0], [1, 0], [2, 1]],
        [[1, -1], [1, 0], [0, 1]],
        [[0, 0], [1, 1], [2, 1]],
        [[0, 0], [0, 1], [1, -1]]
    ],
    [
        [[0, 1], [1, 1], [2, 0]],
        [[0, 0], [0, -1], [1, 1]],
        [[1, 0], [2, 0], [0, 1]],
        [[0, -1], [1, 0], [1, 1]]
    ],
    [
        [[0, 0], [0, -1], [0, 1], [1, 0], [2, 0]],
        [[0, -1], [1, -1], [2, -1], [1, 0], [1, 1]],
        [[0, 0], [1, 0], [2, 0], [2, -1], [2, 1]],
        [[1, -1], [1, 0], [1, 1], [0, 1], [2, 1]]
    ]
]
// setting up tests
var allTests = []
var conductTests = false

// ta = testing area

// ta
var exampleTest = function() { console.log('testing goes through') }
allTests.push(exampleTest)
// ta end

// the game

// game constants

var pieceColors = [
    "#ff3333",
    "#33ff33",
    "#3333ff",
    "#888888",
    "#123456" // border
]
var pieceShapes = [
     "L1", "L2", "Z1", "Z2", "T", "I", "O", "." // placeholder
]
var pieceBoardPositions = [
    [
        [[0, 0], [0, -1], [1, -1], [2, -1]],
        [[0, -1], [1, -1], [1, 0], [1, 1]],
        [[0, 0], [1, 0], [2, -1], [2, 0]],
        [[0, 0], [0, -1], [0, 1], [1, 1]]
    ],
    [
        [[0, 0], [0, 1], [1, 1], [2, 1]], 
        [[0, 0], [0, -1], [1, -1], [0, 1]], 
        [[0, 0], [1, 0], [2, 0], [2, 1]], 
        [[0, 1], [1, -1], [1, 0], [1, 1]]
    ],
    [
        [[0, 0], [0, 1], [1, -1], [1, 0]], 
        [[0, 0], [1, 0], [1, 1], [2, 1]], 
        [[0, 0], [0, 1], [1, -1], [1, 0]], 
        [[0, 0], [1, 0], [1, 1], [2, 1]]
    ],
    [
        [[0, 0], [0, -1], [1, 0], [1, 1]], 
        [[0, 0], [1, -1], [1, 0], [2, -1]], 
        [[0, 0], [0, -1], [1, 0], [1, 1]], 
        [[0, 0], [1, -1], [1, 0], [2, -1]]
    ],
    [
        [[0, 0], [0, -1], [0, 1], [1, 0]], 
        [[0, 0], [1, 0], [1, 1], [2, 0]], 
        [[0, 0], [1, -1], [1, 0], [1, 1]], 
        [[0, 0], [1, -1], [1, 0], [2, 0]]
    ],
    [
        [[0, 0], [1, 0], [2, 0], [3, 0]], 
        [[0, 0], [0, 1], [0, 2], [0, -1]], 
        [[0, 0], [1, 0], [2, 0], [3, 0]], 
        [[0, 0], [0, 1], [0, 2], [0, -1]]
    ],
    [
        [[0, 0], [0, 1], [1, 1], [1, 0]], 
        [[0, 0], [0, 1], [1, 1], [1, 0]],
        [[0, 0], [0, 1], [1, 1], [1, 0]], 
        [[0, 0], [0, 1], [1, 1], [1, 0]]
    ],
    [
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]]
    ],
]

// check if is in wild mode, if yes, add wild things into it
if (wildMode) {
    pieceColors = mergeArrays(pieceColors, wildColors)
    pieceShapes = mergeArrays(pieceShapes, wildShapes)
    pieceBoardPositions = mergeArrays(pieceBoardPositions, wildBoardPositions)
}

// change format
pieceColors = pieceColors.map(hex2array) 

var numColors = pieceColors.length - 1
var numShapes = pieceShapes.length - 1


var BOUDARY_VALUE = pieceColors.length
var numOrientation = 4
var DEFAULT_SHAPE_OPTION = 1
var DEFAULT_COLOR_OPTION = 4
var SCORE_PER_ROW = 100
var BLOCK_SIZE = wildMode ? 20 : 23
var BORDER_WIDTH = 1
var RIGHT_PANEL_FONT_SIZE = 12
var TIME_INTERVAL = 1000
var FASTER_INTERVAL = 50

var INNER_BOARD_WIDTH = wildMode ? 12 : 10 
var INNER_BOARD_HEIGHT = wildMode ? 24 : 20
var HIDDEN_BOARD_HEIGHT = 4
var NEXT_PIECE_DISPLAY_SIZE = 4

var MARGIN_SIZE = wildMode ? 3 : 4
var M = MARGIN_SIZE // short-hand M for MARGIN_SIZE

var BLOCK_SIZE_WITH_BOUNDARY = BLOCK_SIZE + 2 * BORDER_WIDTH
var BOARD_DISPLAY_WIDTH = BLOCK_SIZE_WITH_BOUNDARY * INNER_BOARD_WIDTH
var BOARD_DISPLAY_HEIGHT = BLOCK_SIZE_WITH_BOUNDARY * INNER_BOARD_HEIGHT
var NEXT_PIECE_DISPLAY_WIDTH = BLOCK_SIZE_WITH_BOUNDARY * (2 * NEXT_PIECE_DISPLAY_SIZE - 1)
var NEXT_PIECE_DISPLAY_HEIGHT = BLOCK_SIZE_WITH_BOUNDARY * NEXT_PIECE_DISPLAY_SIZE

var BOARD_WIDTH = INNER_BOARD_WIDTH + 2 * MARGIN_SIZE
var BOARD_HEIGHT = INNER_BOARD_HEIGHT + 2 * MARGIN_SIZE

// game utility functions

// generate a row with inner fillings being val
var generateInitialRow = function(w, boundaryVal) {
    if (boundaryVal === undefined) { val = BOUDARY_VALUE }
    var out = []
    var i
    for (i = 0; i < M; i++) { out.push(boundaryVal) }
    for (i = 0; i < w; i++) { out.push(0) }
    for (i = 0; i < M; i++) { out.push(boundaryVal) }
    return out
}

// generate a row with inner fillings being val
var generateFloorCeiling = function(w, boundaryVal) {
    if (boundaryVal === undefined) { boundaryVal = BOUDARY_VALUE }
    var out = []
    var i
    for (i = 0; i < M; i++) { out.push(boundaryVal) }
    for (i = 0; i < w; i++) { out.push(boundaryVal) }
    for (i = 0; i < M; i++) { out.push(boundaryVal) }
    return out
}

// generate initial board (with margins)
var generateIntialBoard = function(w, h, boundaryVal) {
    if (boundaryVal === undefined) { boundaryVal = BOUDARY_VALUE }
    var out = []
    for (var i = 0; i < M; i++) { out.push(generateFloorCeiling(w, boundaryVal)) }
    for (var i = 0; i < h; i++) { out.push(generateInitialRow(w, boundaryVal)) }
    for (var i = 0; i < M; i++) { out.push(generateFloorCeiling(w, boundaryVal)) }
    return out
}

// create empty board based on global variable
var createEmptyBoard = function(boundaryVal) {
    if (boundaryVal === undefined) { boundaryVal = BOUDARY_VALUE }
    return generateIntialBoard(INNER_BOARD_WIDTH, INNER_BOARD_HEIGHT + HIDDEN_BOARD_HEIGHT, boundaryVal)
}

// create empty board for a piece
var createEmptyPieceBoard = function() {
    return createEmptyBoard(0)
}

// join a row by spaces for display
var joinRow = function(row) {
    return row.join(" ")
}

// log the board configuration in console
var logBoard = function(board) {
    for (var i = board.length - 1; i >= 0; i--) { 
        console.log( (i < 10 ? "0" : "") + i + "_th row        " + joinRow(board[i])) 
    }
}

// combine board and piece 
var combineBoardAndPiece = function(gameBoard, pieceBoard) {
    var out = createEmptyBoard()
    for (var i = 0; i < out.length; i++) {
        for (var j = 0; j < out[0].length; j++) {
            out[i][j] = Math.max(gameBoard[i][j], pieceBoard[i][j])
        }
    }
    return out
}

// carve out the inners of the board (without margin)
var carveBoard = function(board) {
    var i, j
    var out = []
    for (i = M; i < board.length - M; i ++) { out.push(board[i].slice(M, board[0].length - M)) }
    return out
}

// carve out board for display (with no hidden height)
var carveBoardForDisplay = function(board) {
    var intermediateBoard = carveBoard(board)
    return intermediateBoard.slice(0, -HIDDEN_BOARD_HEIGHT)
}

// log carved out board (for display)
var logCarved = function(board) {
    logBoard(carveBoardForDisplay(board)) 
}

// flip the first dimension of the board (for display)
var flipBoard = function(board) {
    var out = []
    var i
    for (i = board.length - 1; i >= 0; i--) {
        out.push(board[i])
    }
    return out 
}

// ta
var testCarving = function() {
    console.log('test carving')
    var curBoard = createEmptyBoard()
    console.log('full')
    logBoard(curBoard)

    var carvedBoard = carveBoard(curBoard)
    console.log('carved')
    logBoard(carvedBoard)

    var boardForDisplay = carveBoardForDisplay(curBoard)
    console.log('for display')
    logBoard(boardForDisplay)
}
allTests.push(testCarving)
// ta end

// ta 
var testCombining = function() {
    console.log('test combining')
    var board1 = createEmptyBoard()
    board1[7][7] = 1
    var board2 = createEmptyBoard()
    board2[7][8] = 2
    logBoard(combineBoardAndPiece(board1, board2))
}
allTests.push(testCombining)
// ta end

// process merged board (delete rows that are cancelled)
var processMergedBoard = function(board) {
    var cancelled = []
    var numCancelled = 0
    var i, j, isCancelled
    for (i = M; i < board.length - M; i++) {
        isCancelled = true
        for (j = M; j < board[0].length - M; j++) {
            if (board[i][j] === 0) { isCancelled = false }
        }
        if (isCancelled) { numCancelled++ }  
        cancelled.push(isCancelled)
    }
    var newBoard = createEmptyBoard()
    var k = M
    for (i = M; i < board.length - M; i++) {
        if (!cancelled[i - M]) { newBoard[k++] = board[i] }
    }
    return [newBoard, numCancelled]
}

// determine if the game is over (there is a block that goes onto the hidden height part)
var isGameOver = function(board) {
    var i, j
    for (i = M + INNER_BOARD_HEIGHT; i < M + INNER_BOARD_HEIGHT + HIDDEN_BOARD_HEIGHT; i++) {
        for (j = M; j < M + INNER_BOARD_WIDTH; j++ ) {
            if ( board[i][j] > 0) { return true }
        }
    }
    return false
}

// ta 
var testProcess = function() {
    var curBoard = createEmptyBoard()
    var i, j
    i = 6
    for (j = 0; j < curBoard[0].length; j++) { curBoard[i][j] = 1 }
    curBoard[7][7] = 1
    
    console.log('before process (carved)')
    logCarved(curBoard)
    
    console.log('after process (carved)')
    var processedBoard = processMergedBoard(curBoard)[0]
    logCarved(processedBoard)
}
allTests.push(testProcess)
// ta end

// determine if the board and the piece has any blocks overlapping
var haveBlockOverlap = function(gameBoard, pieceBoard) {
    for (var i = 0; i < gameBoard.length ; i++) {
        for (var j = 0; j < gameBoard[0].length ; j++) {
            if (gameBoard[i][j] * pieceBoard[i][j] !== 0) return true;
        }
    }
    return false;
}

// get display board
var getBoardForDisplay = function(gameBoard, pieceBoard) {
    return flipBoard(carveBoardForDisplay(combineBoardAndPiece(gameBoard, pieceBoard)))
}

// ta
var testOverlap = function() {
    var curBoard = createEmptyBoard()
    var i, j
    i = 6
    for (j = 0; j < curBoard[0].length; j++) { curBoard[i][j] = 1 }
    curBoard[7][7] = 1
    var pieceBoard = createEmptyBoard()
    i = 7
    for (j = 7; j < pieceBoard[0].length; j++) { pieceBoard[i][j] = 1 }
    console.log('board 1')
    logCarved(curBoard)
    
    console.log('board 2')
    logCarved(pieceBoard)
    
    if ( haveBlockOverlap(curBoard, pieceBoard) ) {
        console.log('they overlap')
    } else {
        console.log('they don\'t overlap')
    }
}
allTests.push(testOverlap)
// ta end

// game mechanism

// piece object
var Piece = function(shapeOption, colorOption) {
    
    // shape
    this.shapeOption = shapeOption
    this.shape = pieceShapes[shapeOption - 1]
    this.boardPositions = pieceBoardPositions[shapeOption - 1]
    
    // color
    this.colorOption = colorOption 
    this.color = pieceColors[colorOption - 1]
    
    // position and orientation
    this.pivotY = M + INNER_BOARD_HEIGHT 
    this.pivotX = M + INNER_BOARD_WIDTH / 2 - 1 
    this.orient = 0

    // generate piece on a board with border 0
    this.getPieceBoard = () => {
        var pieceBoard = createEmptyPieceBoard()
        var boardPositions = this.boardPositions[this.orient]
        //console.log(boardPositions)
        var i
        for (var i = 0; i < boardPositions.length; i++) {
            pieceBoard[this.pivotY + boardPositions[i][0]][this.pivotX + boardPositions[i][1]] = this.colorOption
        }
        return pieceBoard
    }
    
    this.rotate = () => {
        this.orient = (this.orient + 1) % numOrientation
    }
    
    this.derotate = () => {
        this.orient = (this.orient - 1 + numOrientation) % numOrientation
    }
    
    // get if the current config is valid on board
    this.isValid = (gameBoard) => {
        return !haveBlockOverlap(gameBoard, this.getPieceBoard())
    }
    
    this.moveDownOnBoard = (gameBoard) => {
        this.pivotY -= 1
        if ( !this.isValid(gameBoard) ) { this.pivotY += 1 }
    }
    
    this.moveLeftOnBoard = (gameBoard) => {
        this.pivotX -= 1
        if ( !this.isValid(gameBoard) ) { this.pivotX += 1 }
    }
    
    this.moveRightOnBoard = (gameBoard) => {
        this.pivotX += 1
        if ( !this.isValid(gameBoard) ) { this.pivotX -= 1 }
    }
    
    this.rotateOnBoard = (gameBoard) => {
        this.rotate()
        if ( !this.isValid(gameBoard)) { this.derotate() }
    }
    
    this.hitBottom = (gameBoard) => {
        this.pivotY -= 1
        var isValid = this.isValid(gameBoard)  
        this.pivotY += 1
        return !isValid
    }
}

// ta 4
var testPiece1 = function() {
    var shapeOption, colorOption, curPieceBoard
    
    shapeOption = 2
    colorOption = 2
    
    var newPiece = new Piece(shapeOption, colorOption)
    var curBoard = createEmptyBoard()
    
    curPieceBoard = newPiece.getPieceBoard()
    console.log('piece board before rotating')
    logBoard(curPieceBoard)
    
    newPiece.rotate()
    curPieceBoard = newPiece.getPieceBoard()
    console.log('piece board after rotating')
    logBoard(curPieceBoard)
    
    newPiece.moveDownOnBoard(curBoard)
    curPieceBoard = newPiece.getPieceBoard()
    console.log('piece board after moving down')
    logBoard(curPieceBoard)
}
allTests.push(testPiece1)
// ta 4 end

// game object

var TetrisGame = function() {
    
    // dimensions
    this.boardWidth = INNER_BOARD_WIDTH
    this.boardHeight = INNER_BOARD_HEIGHT
    this.hiddenHeight = HIDDEN_BOARD_HEIGHT
    this.marginSize = M

    // generate game dimensions as a list of strings
    this.generateDimensions = (w, h, hh, m) => {
        var out = []
        out.push('the game board has width ' + w)
        out.push('the game board has height ' + h)
        out.push('the game board has hidden height ' + hh)
        out.push('the game board has margin ' + m)
        return out
    }

    // print the dimension of this game
    this.printDimensions = () => {
        var dimensionStringArray = this.generateDimensions(this.boardWidth, this.boardHeight, this.hiddenHeight, this.marginSize)
        var i 
        for (i = 0; i < dimensionStringArray; i++) {
            console.log(dimensionStringArray[i])
        }
    }
    
    // game states
    this.gameBoard = createEmptyBoard()
    this.gameScore = 0
    this.curPiece = null
    this.nextPiece = null
    this.pieceBoard = createEmptyPieceBoard()
    this.gameStarted = false
    this.gameOver = false
    this.gameInterval = null
    this.gamePaused = false
    this.dropping = false
    this.droppingInterval = null
    
    this.getAPiece = () => {
        var shapeOption, colorOption
        shapeOption = rand1ToN(numShapes)
        colorOption = rand1ToN(numColors)
        return new Piece(shapeOption, colorOption)
    }
    
    this.getNewPiece = () => {
        if (this.nextPiece === null) {
            this.curPiece = this.getAPiece()
            this.nextPiece = this.getAPiece()
        } else {
            this.curPiece = this.nextPiece
            this.nextPiece = this.getAPiece()
        }
    }
    this.getNewPiece()
    
    this.exportedState = {
        gameBoard: this.gameBoard,
        pieceBoard: this.pieceBoard,
        displayBoard: getBoardForDisplay(this.gameBoard, this.pieceBoard),
        gameScore: this.gameScore,
        gameStarted: this.gameStarted,
        gameOver: this.gameOver,
        gamePaused: this.gamePaused,
        nextPieceShape: (this.nextPiece === null? [] : this.nextPiece.boardPositions[0]),
        nextPieceColor: (this.nextPiece === null? 1 : this.nextPiece.colorOption)
    }
    
    this.updateExportedState = () => {
        this.exportedState.gameBoard = this.gameBoard
        this.pieceBoard = this.curPiece.getPieceBoard()
        this.exportedState.pieceBoard = this.pieceBoard
        this.exportedState.gameScore = this.gameScore
        this.exportedState.gameStarted = this.gameStarted
        this.exportedState.gameOver = this.gameOver
        this.exportedState.gamePaused = this.gamePaused
        this.exportedState.displayBoard = getBoardForDisplay(this.gameBoard, this.pieceBoard)
        this.exportedState.nextPieceShape = (this.nextPiece === null? [] : this.nextPiece.boardPositions[0])
        this.exportedState.nextPieceColor = (this.nextPiece === null? 1 : this.nextPiece.colorOption)
    }
    
    
    this.declareGameOver = () => {
        clearInterval(this.gameInterval)
        this.gameStarted = false
        this.gameOver = true
    }
    
    this.gameProceed = () => { 
        console.log('game proceeds')
        if ( this.curPiece.hitBottom(this.gameBoard) ) {
            console.log('hit the bottom or other blocks')
            var pieceBoard = this.curPiece.getPieceBoard()
            var combinedBoard = combineBoardAndPiece(this.gameBoard, pieceBoard)
            var outcomes = processMergedBoard( combinedBoard )
            this.gameBoard = outcomes[0]
            this.gameScore += outcomes[1] * SCORE_PER_ROW
            if ( isGameOver(this.gameBoard) ) {
                this.declareGameOver()
            } else {
                this.getNewPiece()
            }
        } else {
            this.curPiece.moveDownOnBoard(this.gameBoard)
        }
        this.updateExportedState()
    }
    
    this.startGame = () => {
        this.gameOver = false
        this.gameBoard = createEmptyBoard()
        this.gameStarted = true
        this.gameScore = 0
        this.getNewPiece()
        if (this.gameInterval !== null) { clearInterval(this.gameInterval) }
        this.gameInterval = setInterval(this.gameProceed, TIME_INTERVAL)
        this.updateExportedState()
    }
    
    this.movePieceLeft = () => {
        if (this.gamePaused || !this.gameStarted) { return }
        this.curPiece.moveLeftOnBoard(this.gameBoard)
        this.updateExportedState()
    }
    
    this.movePieceRight = () => {
        if (this.gamePaused || !this.gameStarted) { return }
        this.curPiece.moveRightOnBoard(this.gameBoard)
        this.updateExportedState()
    }
    
    this.rotatePiece = () => {
        if (this.gamePaused || !this.gameStarted) { return }
        this.curPiece.rotateOnBoard(this.gameBoard)
        this.updateExportedState()
    }
    
    this.dropPiece = () => {
        // new implementation - move down quicker 
        if (this.gamePaused || !this.gameStarted) { return }
        if (!this.dropping) {
            this.gameProceed()
            this.dropping = true
            this.droppingInterval = setTimeout( () => {
                this.gameProceed()
                this.dropping = false
            }, FASTER_INTERVAL)
        }
        // old implementation - just drop
        /* 
        while (!this.curPiece.hitBottom(this.gameBoard)) {
            this.curPiece.moveDownOnBoard(this.gameBoard)
        }
        this.gameProceed()
        this.updateExportedState()
        */
    }
    
    this.pauseContinueGame = () => {
        if (!this.gamePaused) {
            clearInterval(this.gameInterval)
            this.gamePaused = true
        } else {
            this.gameInterval = setInterval(this.gameProceed, TIME_INTERVAL)
            this.gamePaused = false
        }
        this.updateExportedState()
    }
    
    this.endGame = () => {
        if (this.gameStarted) {
            this.gameBoard = createEmptyBoard()
            this.gameStarted = false
            this.gameOver = false
            clearInterval(this.gameInterval)
            this.getNewPiece()
            this.pieceBoard = createEmptyPieceBoard()
            this.updateExportedState()
        }
    }
}

// ta (muted)
var testGame1 = function() {
    var tetris = new TetrisGame()
    tetris.startGame()
    var i 
}
// allTests.push(testGame1)
// ta end

var tetris = new TetrisGame()

// add control to the game by adding event listener to the window
window.addEventListener("keydown", function() {
    if (event.defaultPrevented) {
        return // Should do nothing if the default action has been cancelled
    }
    
    var handled = false
    console.log('key pressed is "' + event.key + '"')
    if (tetris.gameStarted) {
        if (event.key !== undefined) {
            if (event.key === 'ArrowLeft') {
                tetris.movePieceLeft()
            } else if (event.key === 'ArrowRight') {
                tetris.movePieceRight()
            } else if (event.key === 'ArrowDown') {
                tetris.dropPiece()
            } else if (event.key === ' ') {
                tetris.rotatePiece()
            } else if (event.key === 'r') {
                tetris.startGame()
            } else if (event.key === 'e') {
                tetris.endGame()
            } else if (event.key === 'p') {
                tetris.pauseContinueGame()
            }
        } 
    } else {
        if (event.key === 'r' || event.key === 's') {
            tetris.startGame()
        }
    }
    //handled = true
    if (handled) {
        event.preventDefault()
    }
})


Vue.component('todo-item', {
    template: `<li>This is a todo</li>`
})  

Vue.component('tetris-block', {
    template: `<div v-bind:style="{ 
                backgroundColor: tileColor, 
                width: blockSize + 'px', 
                height: blockSize + 'px',
                border: borderWidth + 'px solid ' + blockColor,
                opacity: block > 0 ? 1 : 0
              }">
             </div>`,
    props: {
        block: {
            type: Number,
            default: 0
        },
        blockSize: {
            type: Number,
            default: BLOCK_SIZE
        }
    },
    data: () => {
        return {
            borderWidth: BORDER_WIDTH
        }
    },
    computed: {
        tileColor: function() {
            return rbgarray2rgb(LightenDarkenColor(pieceColors[Math.max(this.block - 1, 0)], 15))
        },
        blockColor: function() {
            return rbgarray2rgb(pieceColors[Math.max(this.block - 1, 0)])
        }
    } 
})

// vue components and rendering
Vue.component('tetris-row', {
    template: `<div v-bind:style = "{
                    display: 'flex',
                    flexDirection: 'row'
               }"> 
                    <div v-for="block in blockRow">
                        <tetris-block :block="block" />
                    </div>
                </div>`,
    props: {
        blockRow: {
            type: Array
        }
    }
})

Vue.component('piece-display', {
    template:  `<div v-bind:style="{
                    width: `+ NEXT_PIECE_DISPLAY_WIDTH + `+ 'px',
                    height: ` + NEXT_PIECE_DISPLAY_HEIGHT + ` + 'px',
                    border: '0px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                }">
                    <div v-for="row in pieceDisplayBoard">
                        <tetris-row v-bind:blockRow="row"/>
                    </div>
                </div>`,
    props: {
        boardPositions: {
            type: Array,
            default: []
        },
        pieceColorOption: {
            type: Number,
            default: 1
        }
    },
    data: () => {
        return {}
    },
    computed: {
        pieceDisplayBoard: function() {
            var out = []
            var row
            var i, j
            for (i = 0; i < NEXT_PIECE_DISPLAY_SIZE; i++) {
                row = []
                for (j = 0; j < 2 * NEXT_PIECE_DISPLAY_SIZE - 1; j++) {
                    row.push(0)
                }
                out.push(row)
            }
            var pivotY = 0
            var pivotX = NEXT_PIECE_DISPLAY_SIZE - 1
            for (i = 0; i < this.boardPositions.length; i++) {
                out[pivotY + this.boardPositions[i][0]][pivotX + this.boardPositions[i][1]] = this.pieceColorOption 
            }
            return flipBoard(out)
        }
    }
})
Vue.component('h-margin', {
    template: `<div style="height: 1px;"> </div>`
})

Vue.component('instructions', {
    template:   `<div> 
                        <br />
                    <span style= "font-size:30px;" >Instructions </span>
                        <br />
                    1. Press <span class="key">S</span> to start game, <span class="key">R</span> to restart game, <span class="key">E</span> to end game, <span class="key">P</span> to pause or unpause. 100 points per row. Wild mode has more strange pieces and colors.
                        <h-margin />
                        <br />
                    2. Use arrow keys and space as control (<span class="key">LEFT</span>, <span class="key">RIGHT</span> to move left and right, <span class="key">DOWN</span> to drop and <span class="key">SPACE</span> to rotate).
                        <h-margin />
                        <br />
                    3. Links to <a href="/playgrounds/tetris" target = "_blank">normal mode</a> and <a href="/playgrounds/tetris?wild=true" target = "_blank">wild mode</a>.
                </div>`
})

Vue.component('game-board', {
    data: function() {
        return {
            tetrisState: tetris.exportedState,
            rightPanelFontSize: RIGHT_PANEL_FONT_SIZE
        }
    },
    
    template: `<div v-bind:style="{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    width: '400px',
                    transform: 'translate(-80px, 0px)',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }">
                    <div v-bind:style="{
                        width: ` + BOARD_DISPLAY_WIDTH + ` + 'px',
                        height: ` + BOARD_DISPLAY_HEIGHT + ` + 'px',
                        border: '1.5px solid black',
                        display: 'flex',
                        flexDirection: 'column',
                    }">
                        <div v-for="row in tetrisState.displayBoard">
                            <tetris-row v-bind:blockRow="row"/>
                        </div>
                    </div>
                    <div v-bind:style="{
                        marginLeft: '40px',
                        fontSize: rightPanelFontSize + 'px',
                        width: '350px'
                    }">
                        Score: {{tetrisState.gameScore}}
                            <br />
                            <br />
                        <div v-bind:style="{opacity: tetrisState.gameOver ? 1 : 0, color: 'red'}"> GAME OVER </div>
                        <div class="flash" v-bind:style="{visibility: tetrisState.gamePaused ? 'visible' : 'hidden'}"> PAUSED </div>
                            <br />
                        Next Piece
                            <br />
                        <div class="flash" v-bind:style="{visibility: tetrisState.gameStarted ? 'visible' : 'hidden'}">
                            <piece-display 
                                v-bind:boardPositions="tetrisState.nextPieceShape" 
                                v-bind:pieceColorOption="tetrisState.nextPieceColor"
                            />
                        </div>
                            <br />
                        <instructions />
                    </div>
               </div>`,
    methods: {

    },
    created: function() {
        
    },
})

var myApp = new Vue({
      template:`<div v-bind:style = "{
                    margin: 'auto',
                    marginTop: '70px',
                    marginLeft: '300px'
                }"> 
                    <game-board />
                </div>`,
      el: '#app',
      data: function() {
          return {}
      }
}) 

// conduct tests
if (conductTests) {
    var testIndex
    for (testIndex = 0; testIndex < allTests.length; testIndex++) {
        console.log(" ")
        console.log("********************************")
        console.log(testIndex + '_th test')
        allTests[testIndex]() 
    }
}

console.log('Initial js file ran properly')