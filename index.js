import fs, { writeFile } from "fs";
import express from "express";
import { finished } from "stream";

var data = fs.readFileSync("words.json");
var words = JSON.parse(data);

const app = express();

var server = app.listen(3000, listening);

function listening(){
    console.log('listening..');
}

app.use(express.static('public'));

// routes (...istället för fler html-sidor?)(search är routen, flower är något användaren skriver)
app.get("/add/:word/:score?", addWord);

function addWord(request, response) {
  var data = request.params;
  var word = data.word;
  var score = Number(data.score);
  var reply;

  if (!score) {
    reply = {
      word: word,
      msg: "Score is required",
    };
    response.send(reply);
  } else {
    words[word] = score;

    var data = JSON.stringify(words, null, 2);
    fs.writeFile("words.json", data, finished);
    function finished(err) {
      console.log("all set.");
      reply = {
        word: word,
        score: score,
        status: "Success",
      };
      response.send(reply);
    }
  }
}

app.get("/all", sendAll);

function sendAll(request, response) {
  response.send(words);
}

app.get("/search/:word/", searchWord);
function searchWord(request, response) {
  var word = request.params.word;
  var reply;

  if (words[word]) {
    reply = {
      status: "found",
      word: word,
      score: words[word],
    };
  } else {
    reply = {
      status: "not found",
      word: word,
    };
  }
  response.send(reply);
}
