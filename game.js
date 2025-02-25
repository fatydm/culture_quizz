import { culture_Quizz } from './questionsQuizz.js';

// Etat du Quiz
let currentQuestionIndex = 0;
// La réponse choisie par le joueur
let selectedOption = '';
let score = 0;
// Récupération des éléments HTML
const questions = document.getElementById('question-text');
const options = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');
const submitButton = document.getElementById('check-button'); // HTML


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pour le timer
let timer = document.getElementById('timer');
let time = 15;
//let countInterval = 1; // variable pour stocker l'intervalle
timer.innerText = '15';

function reduceTime() {
    let seconds = parseInt(time % 60, 10);
    timer.innerText = seconds;

    time = time > 0 ? time - 1 : 0; // sucre syntaxtique 

    if (time === 0) {
        //clearInterval(countInterval); // Stop le timer quand il atteint 0
        endOfTime(); // Appelle la fonction quand le temps est écoulé
    }
}
setInterval(reduceTime, 1000);

// Si temps écoulé, on affiche la bonne réponse et la justification et on cache les boutons
function endOfTime() {
    questions.innerText = 'Temps écoulé 😕 !';
    options.innerHTML = 'La bonne réponse était ' + culture_Quizz.questions[currentQuestionIndex].correctAnswer + '<br>' + culture_Quizz.questions[currentQuestionIndex].justification;
    nextButton.style.display = 'block';
    submitButton.style.display = 'none';
    timer.style.display = 'none';
};



// Fonction pour réinitialiser le timer à chaque nouvelle question
function startTimer() {
    //clearInterval(countInterval);

    time = 15;
    timer.style.display = "block";
    timer.innerText = "15";
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Fonction pour afficher une question basée sur l'index actuel
function loadQuestion(index) {

    // Vider le conteneur des options
    options.innerHTML = '';

    // Récupérer la question actuelle
    const currentQuestion = culture_Quizz.questions[index];

    // Injecter la question dans le HTML
    questions.innerText = currentQuestion.question;

    // Injecter les options dans le HTML 
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => selectedAnswer(button); // Nouveau
        options.appendChild(button);
    });

    // On désactive le bouton "valider"
    submitButton.disabled = true;
    // On cache les 3 boutons lors du chargement de la question
    nextButton.style.display = 'none';
    replayButton.style.display = 'none';
    submitButton.style.display = 'none';
}

loadQuestion(currentQuestionIndex);





////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function selectedAnswer(button) {

    selectedOption = button.innerText; // Récup

    const allButtons = options.querySelectorAll('button');
    allButtons.forEach(button => button.style.background = '');
    allButtons.forEach(button => button.style.color = '');
    allButtons.forEach(button => button.style.fontWeight = '');
    allButtons.forEach(button => button.style.border = '');

    // Changement de style lors du choix de la réponse (du clic)
    button.style.background = 'rgb(218, 140, 33)';
    button.style.color = 'black';
    button.style.fontWeight = 'bold';
    button.style.borderColor = 'black'

    submitButton.style.display = 'block';

    submitButton.disabled = false;

};




////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// bouton valider
submitButton.addEventListener('click', () => {

    const goodAnswer = culture_Quizz.questions[currentQuestionIndex].correctAnswer;
    const justification = culture_Quizz.questions[currentQuestionIndex].justification;

    if (selectedOption === goodAnswer) {
        questions.innerText = 'Bonne réponse boss 😎';
        options.innerHTML = '' + justification;
        score++

        confetti({
            particleCount: 250,
            spread: 100,
            origin: { y: 0.6 }
        });

    } else {
        questions.innerText = 'Mauvaise réponse 🫣';
        options.innerHTML = 'La bonne réponse était ' + ' ' + goodAnswer + '<br>' + justification // utilisation backticks
    }

    nextButton.style.display = 'block';
    submitButton.style.visibility = 'hidden';
    timer.style.display = 'none';
});


// bouton suivant
nextButton.addEventListener("click", () => {

    if (currentQuestionIndex < culture_Quizz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        startTimer();
        timer.style.display = 'block';

    } else {
        questions.innerText = 'Fin du Quizz !';
        options.innerHTML = 'Ton score est de ' + score + "/" + culture_Quizz.questions.length;
        nextButton.style.display = 'none';
        replayButton.style.display = 'block';
        submitButton.style.display = 'none';
    }

    submitButton.style.visibility = 'visible';



});


// bouton rejouer
replayButton.addEventListener('click', () => {
    currentQuestionIndex = 0
    loadQuestion(currentQuestionIndex)
    nextButton.style.display = 'none';
    timer.style.display = 'none'
})




