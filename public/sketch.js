

function setup(){
    createCanvas(400,400);
    background(99,67,88);
    loadJSON('/all', gotData);
    console.log('running..');

    var button = select('#submit');
    button.mousePressed(submitWord);
}

function submitWord() {
    var word = select('#word').value();
    var score = select('#score').value();

}

function gotData(data){
    console.log(data);
    var keys = Object.keys(data);
    console.log(keys);
    for(var i = 0; i < keys.length; i++){
        var word = keys[i];
        var score = data[word];
        var x = random(width);
        var y = random(height);
        fill(255);
        textSize(34);
        text(word, x, y);

    }
}

function submitWord(){
    var word = select('#word').value();
    var score = select('#score').value();
    console.log(word, score);
}

function loadJSON(url) {
    fetch(url)
      .then(function(res) { return res.json(); })
      .then(function(data) {
         document.getElementById('content').innerHTML = JSON.stringify(data);
      });
  }