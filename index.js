let currentQuestion = 0;
let currentScore = 0;

const scrollTo = function(elem) {
  var viewportHeight = $(window).height();
  var elemHeight = $(elem).height();
  var elemTop = $(elem).offset().top;
  var scrollIt = elemTop - (viewportHeight - elemHeight) / 2;
  console.log(`scrollTo is running`);

  $(window).scrollTop(scrollIt);
};
const resizeListner = function() {
  $(window).resize(function() {
    console.log("window resized");
    scrollTo("*");
  });
};

const renderStartScreen = function() {
  $(".main").html(`<button class='begin-button-js'>
      <h1>Begin the quiz!</h1>
    </button>`);
  $(".begin-button-js").focus();
};
renderStartScreen();
scrollTo("*");
resizeListner();

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

console.log(quiz);

$(".begin-button-js").on("click", function(ev) {
  $(".title > p").hide();
  $(".begin-button-js").focus();
  renderQuestion(0);
  renderProgress(currentScore, currentQuestion);
  $(".begin-button-js").hide();
});

$("body").on("submit", ".the-form", function(ev) {
  ev.preventDefault();
  $(".quiz-submit").hide();
  let selectedAnswer = $("input[name=answer]:checked").val();

  const backgroundCorrect = function(questionNum) {
    img = quiz[questionNum].img;
    $(".response").append('<div class="image-response"></div>');
    console.log("imageResponse");
    $(".image-response").css("background-image", `url(${img})`);
  };

  const backgroundIncorrect = function() {
    $(".response").append('<div class="image-response"></div>');
    $(".image-response").css(
      "background-image",
      `url(https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX11986794.jpg)`
    );
  };

  if (correctChecker(selectedAnswer, currentQuestion)) {
    console.log("you got it right RADICALLLL!!!");
    $(".question-response").html(
      `<p class="p-response">Radical! You got it right.</p>`
    );
    backgroundCorrect(currentQuestion);
    currentScore++;
    updateScore(currentScore);
    currentQuestion++;
  } else {
    $(".question-response").html(
      `<p class="p-response">YardSale! The right answer was:<span class='red'>"${correctAnswerGenerator(
        currentQuestion
      )}"</span><span> breh....</span></p>`
    );

    backgroundIncorrect();
    currentQuestion++;
  }

  nextHandler(currentScore, currentQuestion);
});

const correctAnswerGenerator = function(questionNum) {
  var correctAnswer = "";
  var questionAnswerSet = quiz[questionNum].answers;
  questionAnswerSet.forEach(function(ans) {
    if (Object.values(ans).indexOf(true) === 1) {
      correctAnswer = ans.text;
    }
  });
  return correctAnswer;
};

const correctChecker = function(answer, currentQuestion) {
  var correctAnswer = correctAnswerGenerator(currentQuestion).split(" ")[0];
  return correctAnswer === answer;
};

const renderFinalScreen = function(currentScore) {
  $(".questionTrack").hide();
  $(".title > p").show();
  console.log("current score", currentScore);
  console.log("currentScoreType", typeof currentScore);
  $(".main").html(
    `<div><h2 class="white">Percentage Correct: ${(currentScore / 5) *
      100}%</h2></div><div class="startover"><a href="index.html"><button class="startoverButton" for="start new quiz">Start New Quiz</button></a></div>`
  );
  $(".startoverButton").focus();

  $(".main").toggleClass("mainFinal", true);
  $(".main").toggleClass("quiz-box", false);
  // $("body").append(
  //   '<img class="bottom" alt="goofy picture of a skier wearing a halloween costume that makes it look like he is getting a piggy back ride, but the fella giving him the piggyback is just his pants." src="https://i.ebayimg.com/images/i/311974668454-0-1/s-l1000.jpg"></img>'
  // );
  scrollTo("*");
};

const updateProgress = function(stage) {
  console.log("stage is", stage);
  $(".currentQuestion").html(`Question: ${stage + 1}/5`);
};
const updateScore = function(score) {
  console.log("score is ", score);
  $(".currentScore").html(`Score: ${score}`);
};
const renderProgress = function(score, stage) {
  $(".progress")
    .html(`   <div class="progressBar white score currentScore currentScore">Score: 0</div>
      <div class="progressBar white questionTrack currentQuestion">Question: 1/5</div>`);
};

const nextHandler = function(currentScore, currentQuestion) {
  if (currentQuestion === 5) {
    $(".nextButton").text("Finish");
  }
  $(".nextButton")
    .show()
    .focus();

  $(".the-form").hide();

  $(".nextButton").on("click", function() {
    if (currentQuestion === 5) {
      console.log("currentQuestion is ", currentQuestion);
      updateProgress(currentQuestion);
      renderFinalScreen(currentScore);
    } else {
      renderQuestion(currentQuestion);
    }
  });

  // renderQuestion();
  // finalScreen();
  // if (currentQuestion === 5) {
  //   renderProgress(currentScore, currentQuestion);
  // } else {
  //   renderProgress(currentScore, currentQuestion);
  // }
};

const renderQuestion = function(currentQuestion) {
  let question = quiz[currentQuestion];
  updateProgress(currentQuestion);

  $(".nextButton").hide();
  $(".quiz-submit").show();
  $(".the-form").show();

  $(".main").html(
    `

        <h2 class="white question">
        ${question.question}
        </h2>

            <form class='the-form'>
              <feildset>
                <label class="answerChoice answer2">
                  <input type='radio' value=${
                    question.answers[0].text
                  } name="answer"required>
                  <span class="answerText">${question.answers[0].text}</span>
                </label>
                <label class="answerChoice">
                  <input type='radio' value=${
                    question.answers[1].text
                  } name="answer" required>
                  <span class="answerText">${question.answers[1].text}</span>
                </label>
                <label class="answerChoice">
                  <input type='radio' value=${
                    question.answers[2].text
                  } name="answer" required>
                  <span class="answerText">${question.answers[2].text}</span>
                </label>
                <label class="answerChoice">
                  <input type='radio' value=${
                    question.answers[3].text
                  } name="answer" required>
                  <span class="answerText">${question.answers[3].text}</span>
                </label>
              </feildset>
              <div class="bottombuttons">
                <button class="submit quiz-submit" type="submit">Submit</button>
              </div>
            </form>
          </div>
            <div class="response">
              <div class="question-response"></div>
              <div class="nextContainer">
              <button class="submit nextButton" >Next</button></div>




          `
  );
  $(".answer2").focus();
  $(".main").toggleClass("quiz-box", true);
  $(".nextButton").hide();
  scrollTo("*");
};
