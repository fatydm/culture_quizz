import { culture_Quizz } from './questionsQuizz.js';

let currentQuestionIndex = 0;
// Sélection des éléments HTML
const questions = document.getElementById('question-text');
const options = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');

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
        button.classList.add('options-button');
        options.appendChild(button);
    });
}

loadQuestion(currentQuestionIndex)

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < culture_Quizz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex)
        nextButton.disabled = true;
    } else {
        questions.innerText = 'Fin du Quizz !';
        options.innerHTML = '';
        nextButton.style.display = 'none';
        replayButton.style.display = 'block';
    }
});

replayButton.addEventListener('click', () => {
    currentQuestionIndex = 0
    replayButton.style.display = 'none';
    loadQuestion(currentQuestionIndex)
    nextButton.style.display = 'block';
})

options.addEventListener('click', (event) => {
    const selectedAnswer = event.target.innerText; // Récupère la réponse cliquée
    const currentQuestion = culture_Quizz.questions[currentQuestionIndex]; // Récupère la question en cours
    const goodAnswer = currentQuestion.options[currentQuestion.correctAnswerIndex]; // Bonne réponse

    function checkAnswer(selectedAnwser) {

        if (selectedAnwser === goodAnswer) {
            options.innerHTML = ''
            questions.innerText = 'Bonne réponse boss 😎'
        } else if (selectedAnwser != goodAnswer) {
            options.innerHTML = ''
            questions.innerText = 'Mauvaise réponse 🫣 La bonne réponse était ' + ' ' + goodAnswer
        }
    }
    checkAnswer(selectedAnswer);
    nextButton.disabled = false;
})

// on veut la suite du code
