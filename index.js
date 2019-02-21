function jqueryRunner() {
  let currentQuestion = 0;
  let currentScore = 0;

  $(".answers").on("submit", function(e) {
    e.preventDefault();
  });

  console.log("jquery is running!");
  console.log("current question =  ", currentQuestion);

  // $(".answer-select").on("click", function(event) {
  //
  //   alert("button clicked");
  // });

  function screenLoader() {
    // repalces main element with next question of quiz. if we have not started yet
    //it will load first
    if (currentQuestion) {
      console.log("showing quiz");
      $(".quiz").show();
      $(".enter").hide();
    } else {
      $(".quiz").hide();
      $(".enter").show();

      $(".enter > button").on("click", function() {
        alert("enter button clicked!");
        currentQuestion++;
        questionRender();
      });
    }
    console.log("current question =  ", currentQuestion);
  }

  function questionRender() {
    // goes into the questionArray (not stor) and renders the appropaite question to the .quiz class element
    if (currentQuestion) {
      var question = STORE[currentQuestion - 1];
      console.log(question);
      $(".quiz").replaceWith(
        `<h2 class="question">
          ${question.question}
          </h2>
          <form class="answers">
            <feildset>
              <label class="answerChoice">
                <input type='radio' value=${
                  question.answers[0].text
                } name="answer required">
                <span>${question.answers[0].text}</span>
              </label>
              <label class="answerChoice">
                <input type='radio' value=${
                  question.answers[1].text
                } name="answer required">
                <span>${question.answers[1].text}</span>
              </label>
              <label class="answerChoice">
                <input type='radio' value=${
                  question.answers[2].text
                } name="answer required">
                <span>${question.answers[2].text}</span>
              </label>
              <label class="answerChoice">
                <input type='radio' value=${
                  question.answers[3].text
                } name="answer required">
                <span>${question.answers[3].text}</span>
              </label>
              <button class="submitAnswer">Submit</button>
            </feildset>
          </form>`
      );
      currentQuestion++;
    } else {
      console.log("on begin screen");
    }
  }

  function questionRandomizer(questions) {
    //will randomize questions and load them into an array to display
  }

  function answerRandomizer(question) {
    // shifts the answers around using randomness so the first one is not always corret
  }

  function answerListner() {
    //this will listen for clicks on answers and call correctOrNot
    $(".submitAnswer").on("submit", function(event) {
      console.log("working");
      event.preventDefault();
    });
  }
  function correctOrNot() {}

  function scoreUpdater() {
    //updates users's score as they go
  }

  function questionCounter() {
    //updates user's locaiton in the quiz
  }

  questionRender();
  screenLoader();
  answerListner();
}

$(jqueryRunner);

// {/* <h2 class="score"><span>Score:</span><span class="currentScore"> 4</span></h2>
// <h2 class="questionTrack"><span>Question:</span><span class="currentQuestion"> 5/8</span></h2> */}
