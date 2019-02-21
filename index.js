let currentQuestion = 0;
let currentScore = 0;

let quizBuilder = function(database) {
  //this takes in the STORE database and creates a random array of indexes to pull questions from
  //this way we use 10 questions total but only show a random 5 in a random order
  var quizResult = [];

  var i = 5;
  var indexArr = [];
  while (i > 0) {
    var num = Math.floor(Math.random() * 10);
    if (indexArr.indexOf(num) === -1) {
      indexArr.push(num);
      i--;
    }
  }
  indexArr.forEach(function(index) {
    quizResult.push(database[index]);
  });

  return quizResult;
};
var quiz = quizBuilder(STORE);

$(".begin-button").on("click", function(ev) {
  $(".title > p").hide();
  renderQuestion();
  renderProgress(currentScore, currentQuestion);
  $(".begin-button").hide();
});

$("body").on("submit", ".the-form", function(ev) {
  ev.preventDefault();
  let selectedAnswer = $("input[name=answer]:checked").val();

  if (correctChecker(selectedAnswer, currentQuestion)) {
    backgroundCorrect(currentQuestion);
    currentScore++;
    currentQuestion++;
  } else {
    backgroundIncorrect();
    currentQuestion++;
  }
  if (currentQuestion === 5) {
    renderProgress(currentScore, currentQuestion);
    finalScreen(currentScore);
  } else {
    renderQuestion();
    renderProgress(currentScore, currentQuestion);
  }
});

let correctChecker = function(answer, questionNum) {
  var correctAnswer = "";
  var questionAnswerSet = quiz[questionNum].answers;
  questionAnswerSet.forEach(function(ans) {
    if (Object.values(ans).indexOf(true) === 1) {
      correctAnswer = ans.text.split(" ")[0];
    }
  });
  return correctAnswer === answer;
};
let backgroundCorrect = function(questionNum) {
  img = quiz[questionNum].img;
  $("body").css("background-image", `url(${img})`);
  $("body").css("background-size", "contain");
  $("body").css("background-repeat", "no-repeat");
};

let backgroundIncorrect = function() {
  $("body").css(
    "background-image",
    `url(https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX11986794.jpg)`
  );
  $("body").css("background-size", "contain");
  $("body").css("background-repeat", "no-repeat");
};
let finalScreen = function(currentScore) {
  $(".title > p").show();

  $(".quiz-box").html(
    `<h1 class="white">Your final results are:<h1><div><h2 class="white">Score: ${(currentScore /
      5) *
      100}%</h2></div>`
  );
  $("body").append(
    '<img class="bottom" alt="goofy picture of a skier wearing a halloween costume that makes it look like he is getting a piggy back ride, but the fella giving him the piggyback is just his pants." src="https://i.ebayimg.com/images/i/311974668454-0-1/s-l1000.jpg"></img>'
  );
  $(".startover").show();
};

let renderProgress = function(score, stage) {
  if (!score) {
    score = "0";
  }
  if (!stage) {
  }
  if (stage === 5) {
    $(".progress")
      .html(`   <h2 class=" white score"><span>Score:</span><span class="currentScore"> ${score}</span></h2>
      `);
  } else {
    $(".progress")
      .html(`   <h2 class="white score"><span>Score:</span><span class="currentScore"> ${score}</span></h2>
      <h2 class=" white questionTrack"><span>Question:</span><span class="currentQuestion">  ${stage +
        1}/5</span></h2>`);
  }
};
let renderQuestion = function() {
  let question = quiz[currentQuestion];

  $(".quiz-box").html(
    `<div class='container'>
        <h2 class="white question">
        ${question.question}
        </h2>
        <form class='the-form'>
          <feildset>
            <label class="answerChoice">
              <input type='radio' value=${
                question.answers[0].text
              } name="answer" required >
              <span>${question.answers[0].text}</span>
            </label>
            <label class="answerChoice">
              <input type='radio' value=${
                question.answers[1].text
              } name="answer" required >
              <span>${question.answers[1].text}</span>
            </label>
            <label class="answerChoice">
              <input type='radio' value=${
                question.answers[2].text
              } name="answer" required >
              <span>${question.answers[2].text}</span>
            </label>
            <label class="answerChoice">
              <input type='radio' value=${
                question.answers[3].text
              } name="answer" required >
              <span>${question.answers[3].text}</span>
            </label>
          </feildset>
          <button class="submit" type="submit">Submit</button>
        </form>
      </div>`
  );
};
