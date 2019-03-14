const backgroundCorrect = function(questionNum) {
  var src = quiz[questionNum].img;
  var alt = correctAnswerGenerator(questionNum);
  $(".main").append(
    `<div class="answerImage"><img src="${src}" alt="photo of ${alt}"></div>`
  );
};

const backgroundIncorrect = function() {
  console.log("background incorrect!");
  $(".main").append(
    `<div class="answerImage"><img src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX11986794.jpg" alt="wrong symbol"></div>`
  );
};
const backgroundCorrect = function(questionNum) {
  img = quiz[questionNum].img;
  $(".question-response").css("background-image", `url(${img})`);
  $(".question-response").css("background-size", "contain");
  $(".question-response").css("background-repeat", "no-repeat");
};

const backgroundIncorrect = function() {
  $(".question-response").css(
    "background-image",
    `url(https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX11986794.jpg)`
  );
  $(".question-response").css("background-size", "contain");
  $(".question-response").css("background-repeat", "no-repeat");
};
