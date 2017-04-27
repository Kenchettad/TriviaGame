$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);

}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	clickSound.play();
	generateHTML();

	timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block src='assets/images/timeup.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];"<img class='center-block images-right' src='assets/images/right.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block images-wrong' src='assets/images/wrong1.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}
// variables
var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["Who was America's first president?", "Who was America's 7th President from 1829-1837?", "Who was America's 35th president from 1961-1963?", "Who was America's 41st President 1989-1993?", "Who is the 42nd President?", "Who was President between 1933-1945?", "Who was President between 2001-2009?", "Who was the 44th President of the U.S.A?"];
var answerArray = [["George Washington", "Donald Trump", "John Adams", "Bill Clinton"], ["James Polk","Andrew Jackson","James Monroe","Richard Nixon"], ["Gerald Ford", "Bill Clinton", "John F. Kennedy", "Jimmy Carter"], ["Richard Nixon","Donald Trump","George Bush Sr.","Jimmy Carter"], ["Gerald Ford", "Barack Obama", "Richard Nixon", "Bill Clinton"], ["Franklin D. Roosevelt","Richard Nixon","Bill Clinton","Gerald Ford"], ["Richard Nixon", "George W. Bush", "Lyndon B. Johnson", "Bill Clinton"], ["Bill Clinton","Richard Nixon","George Washington","Barack Obama"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/george.jpg'>", "<img class='center-block img-right' src='assets/images/andrew.gif'>", "<img class='center-block img-right' src='assets/images/john.jpg'>", "<img class='center-block img-right' src='assets/images/bill.jpg'>", "<img class='center-block img-right' src='assets/images/franklin.jpg'>", "<img class='center-block img-right' src='assets/images/george2.gif'>", "<img class='center-block img-right' src='assets/images/bill.jpg'>", "<img class='center-block img-right' src='assets/images/obama.gif'>"];
var correctAnswers = ["A. George Washington", "B. Andrew Jackson", "C. John F. Kennedy", "C. George Bush Sr.", "D. Bill Clinton", "A. Franklin D. Roosevelt", "George W. Bush", "D. Barack Obama"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
// would like to add audio for when the page loads.
var clickSound = new Audio("sound/button-click.mp3");

