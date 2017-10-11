function upper(name) {
  return name.toUpperCase();
}

const app = document.getElementById('app');

app.innerHTML = 'Hello ' + upper('webpack');