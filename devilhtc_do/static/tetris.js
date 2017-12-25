// tetris.hs for tetris.html 

// some general utility functions
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

var LightenDarkenColor = function(col,amt) {
    var usePound = false
    if ( col[0] == "#" ) {
        col = col.slice(1)
        usePound = true
    }

    var num = parseInt(col,16)
    var r = (num >> 16) + amt
    if ( r > 255 ) { r = 255 }
    else if (r < 0)  { r = 0 }

    var b = ((num >> 8) & 0x00FF) + amt;
    if ( b > 255 ) { b = 255 }
    else if (b < 0) { b = 0 }

    var g = (num & 0x0000FF) + amt
    if ( g > 255 ) { g = 255 }
    else if ( g < 0 ) { g = 0 }
    
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

// setting up tests
var allTests = []
var conductTests = true

// ta 0
var exampleTest = function() { console.log('testing goes through') }
allTests.push(exampleTest)
// ta 0 end

// the game

// game constants

var pieceColors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#888888"
]

var numColors = pieceColors.length

var pieceShapes = [
    ".", "L1", "L2", "Z1", "Z2", "T", "I"
]

var numShapes = pieceShapes.length

var pieceBoardPositions = [
    [
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]]
    ],
    [
        [[0, 0], [0, -1], [1, -1], [2, -1]],
        [[0, -1], [1, -1], [1, 0], [1, 1]],
        [[0, 0], [1, 0], [2, -1], [2, 0]],
        [[0, 0], [0, -1], [0, 1], [1, 1]]
    ],
    [
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]]
    ],
    [
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]]
    ],
    [
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]]
    ],
    [
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]]
    ],
    [
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]], 
        [[0, 0]]
    ],
]

var numOrientation = 4

var BLOCK_SIZE = 30

var INNER_BOARD_WIDTH = 10
var INNER_BOARD_HEIGHT = 24
var HIDDEN_BOARD_HEIGHT = 4
var MARGIN_SIZE = 4
var M = MARGIN_SIZE // short-hand M for MARGIN_SIZE

var BOARD_DISPLAY_WIDTH = BLOCK_SIZE * INNER_BOARD_WIDTH
var BOARD_DISPLAY_HEIGHT = BLOCK_SIZE * INNER_BOARD_HEIGHT

var BOARD_WIDTH = INNER_BOARD_WIDTH + 2 * MARGIN_SIZE
var BOARD_HEIGHT = INNER_BOARD_HEIGHT + 2 * MARGIN_SIZE

// game utility functions

// generate a row with inner fillings being val
var generateInitialRow = function(w, boundaryVal) {
    if (boundaryVal === undefined) { val = 1 }
    var out = []
    var i
    for (i = 0; i < M; i++) { out.push(boundaryVal) }
    for (i = 0; i < w; i++) { out.push(0) }
    for (i = 0; i < M; i++) { out.push(boundaryVal) }
    return out
}

// generate a row with inner fillings being val
var generateFloorCeiling = function(w, boundaryVal) {
    if (boundaryVal === undefined) { boundaryVal = 1 }
    var out = []
    var i
    for (i = 0; i < M; i++) { out.push(boundaryVal) }
    for (i = 0; i < w; i++) { out.push(boundaryVal) }
    for (i = 0; i < M; i++) { out.push(boundaryVal) }
    return out
}

// generate initial board (with margins)
var generateIntialBoard = function(w, h, boundaryVal) {
    var out = []
    for (var i = 0; i < M; i++) { out.push(generateFloorCeiling(w, boundaryVal)) }
    for (var i = 0; i < h; i++) { out.push(generateInitialRow(w, boundaryVal)) }
    for (var i = 0; i < M; i++) { out.push(generateFloorCeiling(w, boundaryVal)) }
    return out
}

// create empty board based on global variable
var createEmptyBoard = function(boundaryVal) {
    if (boundaryVal === undefined) { boundaryVal = 1 }
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
        console.log( (i < 10 ? "0" : "") + i + "_th row        "+joinRow(board[i])) 
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

var logCarved = function(board) {
    logBoard(carveBoardForDisplay(board)) 
}

// ta 1
var testCarving = function() {
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
// ta 1 end

// process merged board (delete rows that are cancelled)
var processMergedBoard = function(board) {
    var cancelled = []
    var i, j, isCancelled
    for (i = M; i < board.length - M; i++) {
        isCancelled = true
        for (j = M; j < board[0].length - M; j++) {
            if (board[i][j] === 0) { isCancelled = false }
        }
        cancelled.push(isCancelled)
    }
    var newBoard = createEmptyBoard(board)
    var k = M
    for (i = M; i < board.length - M; i++) {
        if (!cancelled[i - M]) { newBoard[k++] = board[i] }
    }
    return newBoard
}

// ta 2
var testProcess = function() {
    var curBoard = createEmptyBoard()
    var i, j
    i = 6
    for (j = 0; j < curBoard[0].length; j++) { curBoard[i][j] = 1 }
    curBoard[7][7] = 1
    
    console.log('before process (carved)')
    logCarved(curBoard)
    
    console.log('after process (carved)')
    var processedBoard = processMergedBoard(curBoard)
    logCarved(processedBoard)
}
allTests.push(testProcess)
// ta 2 end

var haveBlockOverlap = function(gameBoard, pieceBoard) {
    for (var i = M; i < gameBoard.length - M; i++) {
        for (var j = M; j < gameBoard[0].length - M; j++) {
            if (gameBoard[i][j] * pieceBoard[i][j] !== 0) return true;
        }
    }
    return false;
}

// ta 3
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
// ta 3 end

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
    this.pivotX = M + INNER_BOARD_WIDTH / 2 
    this.orient = 0

    // generate piece on a board with border 0
    this.getPieceBoard = function() {
        var pieceBoard = createEmptyPieceBoard()
        var boardPositions = this.boardPositions[this.orient]
        //console.log(boardPositions)
        var i
        for (var i = 0; i < boardPositions.length; i++) {
            pieceBoard[this.pivotY + boardPositions[i][0]][this.pivotX + boardPositions[i][1]] = this.colorOption
        }
        return pieceBoard
    }
    
    // get if the current config is valid on board
    this.isValid = function(gameBoard) {
        var pieceBoard = this.getPieceBoard()
        var overlapped = haveBlockOverlap(gameBoard, pieceBoard)
        return !overlapped
    }
    
    this.rotate = function() {
        this.orient = (this.orient + 1) % numOrientation
    }
    
    this.derotate = function() {
        this.orient = (this.orient - 1 + numOrientation) % numOrientation
    }
    
    this.moveDownOnBoard = function(gameBoard) {
        this.pivotY -= 1
        if ( !this.isValid(gameBoard) ) { this.pivotY += 1 }
    }
    
    this.moveLeftOnBoard = function(gameBoard) {
        this.pivotX -= 1
        if ( !this.isValid(gameBoard) ) { this.pivotX += 1 }
    }
    
    this.moveRightOnBoard = function(gameBoard) {
        this.pivotX += 1
        if ( !this.isValid(gameBoard) ) { this.pivotX -= 1 }
    }
    
    this.rotateOnBoard = function(gameBoard) {
        this.rotate()
        if ( !this.isValid(gameBoard)) { this.derotate() }
    }
    
    this.hitBottom = function(gameBoard) {
        var prevY = this.pivotY
        this.moveDownOnBoard(gameBoard)
        var curY = this.pivotY
        return prevY === curY
    }
    
}

// ta 4
var testPiece1 = function() {
    var shapeOption, colorOption, curPieceBoard
    
    shapeOption = 2
    colorOption = 2
    
    var newPiece = new Piece(shapeOption, colorOption)
    
    curPieceBoard = newPiece.getPieceBoard()
    console.log('piece board before rotating')
    logBoard(curPieceBoard)
    
    newPiece.rotate()
    curPieceBoard = newPiece.getPieceBoard()
    console.log('piece board after rotating')
    logBoard(curPieceBoard)
}
allTests.push(testPiece1)
// ta 4 end

// game object



/*

var TetrisGame = function() {
    // dimensions
    this.boardWidth = BOARD_WIDTH
    this.boardHeight = BOARD_HEIGHT
    this.hiddenHeight = HIDDEN_HEIGHT
    this.printDimensions = printDimensions.bind(this)
    
    // boolean states
    this.gameStarted = false
    this.gameOver = false
    
    // game states
    this.score = 0
    this.gameBoard = createEmptyBoard()
    this.curPiece = null
    this.pieceBoard = createEmptyBoard()
    
    this.generateNewPiece = function(shapeOption, colorOption) {
        this.curPiece = new Piece(shapeOption, colorOption)
    }
    
    this.exportedState = {
        gameBoard: this.gameBoard,
        pieceBoard: this.pieceBoard,
        score: this.score
    }
    
    this.updateExportedState = function() {
        this.exportedState.gameBoard = this.gameBoard
        this.exportedState.pieceBoard = this.pieceBoard
        this.exportedState.score = this.score
    }
} 

tetrisGame = new TetrisGame()

tetrisGame.printDimensions()

Vue.component('todo-item', {
    template: `<li>This is a todo</li>`
})  

Vue.component('tetris-block', {
    template: `<div v-bind:style="{ 
                backgroundColor: tileColor, 
                width: blockSize + 'px', 
                height: blockSize + 'px',
                border: '5px outset '+blockColor,
              }">
             </div>`,
    props: {
        blockColor: {
            type: String,
            default: '#ff0000'
        },
        blockSize: {
            type: Number,
            default: BLOCK_SIZE
        }
    },
    computed: {
        tileColor: function() {
            return LightenDarkenColor(this.blockColor, -30)
            
        }
    } 
})

var state = {
    counter: 0
}

Vue.component('game-board', {
    template: ` <div v-bind:style= "{
                    width: `+ BOARD_DISPLAY_WIDTH +` + 'px',
                    height: ` +BOARD_DISPLAY_HEIGHT+` + 'px',
                    border: '1px solid black'
                }">
                   bla {{state.counter}}
                </div>`,
    data: function() {
        return {
            state: state
        }
    },
    methods: {
        startCounting: function() {
            setInterval(function() {
                state.counter = state.counter + 1
            }, 1000)
        }
    },
    created: function() {
        this.startCounting()
    }
})

var myApp = new Vue({
      template:`<div> 
                    <game-board />
                    <tetris-block />
                    <tetris-block />
                </div>`,
      el: '#app',
      data: function() {
          return {}
      }
}) 




*/

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