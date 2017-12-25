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
var exampleTest = function() { console.log('testing goes through') }
allTests.push(exampleTest)

// the game

// game constants

var blockColors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#888888"
]

var numColors = blockColors.length

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
var M = MARGIN_SIZE // short-hand 

var BOARD_DISPLAY_WIDTH = BLOCK_SIZE * INNER_BOARD_WIDTH
var BOARD_DISPLAY_HEIGHT = BLOCK_SIZE * INNER_BOARD_HEIGHT

var BOARD_WIDTH = INNER_BOARD_WIDTH + 2 * MARGIN_SIZE
var BOARD_HEIGHT = INNER_BOARD_HEIGHT + 2 * MARGIN_SIZE

// game utility functions

// generate a row with inner fillings being val
var generateInitialRow = function(w, val) {
    if (!val) { val = 0 }
    var out = []
    var i
    for (i = 0; i < M; i++) { out.push(1) }
    for (i = 0; i < w; i++) { out.push(val) }
    for (i = 0; i < M; i++) { out.push(1) }
    return out
}

// generate initial board (with margins)
var generateIntialBoard = function(w, h, val) {
    var out = []
    for (var i = 0; i < M; i++) { out.push(generateInitialRow(w, val)) }
    for (var i = 0; i < h; i++) { out.push(generateInitialRow(w)) }
    for (var i = 0; i < M; i++) { out.push(generateInitialRow(w, val)) }
    return out
}

// create empty board based on global variable
var createEmptyBoard = function(val) {
    if (!val) { val = 1}
    return generateIntialBoard(INNER_BOARD_WIDTH, INNER_BOARD_HEIGHT + HIDDEN_BOARD_HEIGHT, val)
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

var blockOverlap = function(gameBoard, pieceBoard) {
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
    for (j = 8; j < pieceBoard[0].length; j++) { pieceBoard[i][j] = 1 }
    console.log('board 1')
    logCarved(curBoard)
    
    console.log('board 2')
    logCarved(pieceBoard)
    
    if ( blockOverlap(curBoard, pieceBoard) ) {
        console.log('they overlap')
    } else {
        console.log('they don\'t overlap')
    }
}

allTests.push(testOverlap)



/*


// game mechanism

// game piece
var Piece = function(shapeOption, colorOption) {
    this.shapeOption = shapeOption
    this.shape = pieceShapes[shapeOption]
    this.colorOption = colorOption
    this.x = BOARD_WIDTH/2 - 1,
    this.y = BOARD_HEIGHT
    
    this.getPieceBoard = function() {
        var pieceBoard = createEmptyBoard()
        // vary pieceBoard based on shape, color and location
        pieceBoard[x][y] = colorOption
        return pieceBoard
    }
    
    this.isInBoard = function() {
        return true
    }
    
    this.hitBottom = function(gameBoard) {
        
    }
    
    this.isValidOperation = function(gameBoard) {
        return true
    }
    
    this.sink = function(gameBoard) {
        this.y -= 1
        if (! this.isValidOperation(gameBoard) ) {
            this.y += 1
        }
    }
    
    this.moveLeft = function(gameBoard) {
        this.x -= 1
        if (! this.isValidOperation(gameBoard) ) {
            this.x += 1
        }
    }
    
    this.moveRight = function(gameBoard) {
        this.x += 1
        if (! this.isValidOperation(gameBoard) ) {
            this.x -= 1
        }
    }
}


// game progression


var fetching = false
var fetched = false
var hasError = false

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

*/

// conduct tests
var testIndex
for (testIndex = 0; testIndex < allTests.length; testIndex++) {
    console.log(" ")
    console.log("********************************")
    console.log(testIndex + '_th test')
    allTests[testIndex]() 
}

console.log('Initial js file ran properly')