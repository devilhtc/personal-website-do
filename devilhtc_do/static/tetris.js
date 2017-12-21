function getParameterByName(name, url) {
	
    if (!url) { url = window.location.href }
    console.log('Getting query parameter ' + name + ' from [' + url + ']')

    name = name.replace(/[\[\]]/g, "\\$&")
    var regex = new RegExp( "[?&]" + name + "(=([^&#]*)|&|#|$)" )
    results = regex.exec(url)

    if (!results) { return null }
    if (!results[2]) { return '' }

    return decodeURIComponent(results[2].replace(/\+/g, " "))
}

var fetching = false
var fetched = false
var hasError = false

Vue.component('todo-item', {
  template: `<li>This is a todo</li>`
})

Vue.component('game-board', {
  template: `<div> bla </div>`
})

Vue.component('board-config', {
  template: `<div> config </div>`
})

Vue.component('tetris-block', {
  template: `<div v-bind:style="{ 
                backgroundColor: blockColor, 
                width: blockSize + 'px', 
                height: blockSize + 'px',
                border: '5px outset '+blockColor,
              }"> 
             </div>`,
  props: {
    blockColor: {
      type: String,
      default: '#ffffff'
    },
    blockSize: {
      type: Number,
      default: 30
    }
  }
})

var myApp = new Vue({
  template:`<div> 
              <todo-item /> 
              <tetris-block />
            </div>`,
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
})

console.log('wtf')