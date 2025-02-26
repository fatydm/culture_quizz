import { culture_Quizz } from './questionsQuizz.js';

// Etat du Quiz
let currentQuestionIndex = 0; 
let selectedOption = '';
let score = 0;


// SECTION RÉCUPÉRATION DES ÉLÉMENTS HTML
const questions = document.getElementById('question-text');
const options = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');
const submitButton = document.getElementById('check-button'); // HTML


// Pour les bonnes et mauvaises réponses
const wrongAnswerText = document.createElement('p');
const correctAnswerText = document.createElement('p');
const justificationText = document.createElement('p');

// SECTION BARRE DE PROGRESSION
const udpdateProgress = document.getElementById('progressBar') // Permet de faire apparait et disparaitre la bar de chargement en fonction de la page

// SECTION FONCTIONS RÉUTILISABLES PLUSIEURS FOIS DANS LE CODE
function hideProgressBar() {
    document.getElementById('progressBar').style.display = 'none';
}
function showProgressBar() {
    document.getElementById('progressBar').style.display = 'inline-block';
}


// SECTION POUR LE TIMER
// Pour le timer
let timer = document.getElementById('timer');
let time = 15;
let countdownInterval = null; // Stocke l'intervalle du timer

timer.innerText = '15';

// Fonction pour démarrer le timer
function startTimer() {
    clearInterval(countdownInterval); // Supprime tout timer existant
    time = 15;
    timer.innerText = time;
    timer.style.display = "block";

    countdownInterval = setInterval(() => {
        if (time > 0) {
            time--;
            timer.innerText = time;
        } else {
            stopTimer();
            endOfTime();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(countdownInterval);
}

// Si temps écoulé, on affiche la bonne réponse et la justification et on cache les boutons
function endOfTime() {

    const goodAnswer = culture_Quizz.questions[currentQuestionIndex].correctAnswer;
    const justification = culture_Quizz.questions[currentQuestionIndex].justification;
    const answerImage = culture_Quizz.questions[currentQuestionIndex].image;
    
    questions.innerText = 'Temps écoulé 😕 !';
    options.innerHTML = '';
    
    correctAnswerText.innerText = 'La bonne réponse était :' + ' ' + goodAnswer;
    justificationText.innerText = justification;

    options.appendChild(correctAnswerText);
    options.appendChild(justificationText);
    
    const img = document.createElement('img')
        img.setAttribute('src', answerImage)
        img.setAttribute('alt', 'image de la réponse')
        img.className = 'answer-img'
        options.appendChild(img)

    nextButton.style.display = 'block';
    submitButton.style.display = 'none';
    timer.style.display = 'none';
    hideProgressBar();
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// FONCTION POUR GÉNÉRER LES QUESTIONS
function loadQuestion(index) {
    
    stopTimer();
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

    showProgressBar();
    startTimer();
}

loadQuestion(currentQuestionIndex);


// FONCTION POUR SÉLECTIONNER UNE RÉPONSE

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


// SECTION DES ÉVÉNEMENTS SUR LES BOUTONS DU QUIZ

// fonction pour les conditions du score 

function scoreText () {
    let score = 0;

    if (score === 0) {
        'Tu n\'as pas eu une seule bonne réponse, c\'est pas grave, tu feras mieux la prochaine fois 😔 !';
    }
    if (score <= 5) {
        'Tu auras le mérite d\'avoir au moins essayé, tu feras mieux la prochaine fois 😉 !';
    }
    if (score <= 12) {
        'Pas mal, pas mal, c\'est plus que la moyenne, c\'est déja ça 😅!';
    }
    if (score <= 15) {
        'Bravo, tu as presque tout juste, prochaine fois, tu seras un vrai boss 😏!';
    }
    if (score === culture_Quizz.questions.length) {
        'Félicitations, tu as eu tout juste, tu es un vrai boss 😎!';
    };
};

// bouton valider
submitButton.addEventListener('click', () => {

    const goodAnswer = culture_Quizz.questions[currentQuestionIndex].correctAnswer;
    const justification = culture_Quizz.questions[currentQuestionIndex].justification;
    const answerImage = culture_Quizz.questions[currentQuestionIndex].image;
    
    stopTimer();

    if (selectedOption === goodAnswer) {
        questions.innerText = 'Bonne réponse boss 😎';
        options.innerText = '';

        correctAnswerText.innerText = 'La bonne réponse était :' + ' ' + goodAnswer;
        justificationText.innerText = justification;

        options.appendChild(correctAnswerText);
        options.appendChild(justificationText);

        const img = document.createElement('img')
        img.setAttribute('src', answerImage)
        img.setAttribute('alt', 'image de la réponse')
        img.className = 'answer-img'
        options.appendChild(img)

        score++

        confetti({
            particleCount: 250,
            spread: 100,
            origin: { y: 0.6 }
        });

    } else {
        questions.innerText = 'Mauvaise réponse 🫣';
        options.innerText = ''
        
        wrongAnswerText.innerText = 'La bonne réponse était :' + ' ' + goodAnswer ;
        
        justificationText.innerText = justification

        options.appendChild(wrongAnswerText)
        options.appendChild(justificationText)

        const img = document.createElement('img')
        img.setAttribute('src', answerImage)
        img.setAttribute('alt', 'image de la réponse')
        img.className = 'answer-img'
        options.appendChild(img)
    }

    // timerActive = false;
    nextButton.style.display = 'block';
    submitButton.style.visibility = 'hidden';
    timer.style.display = 'none';
    hideProgressBar();
});


// bouton suivant
nextButton.addEventListener("click", () => {

    if (currentQuestionIndex < culture_Quizz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        timer.style.display = 'block';

    } else {
        questions.innerText = 'Fin du Quizz !';
        options.innerHTML = 'Ton score est de ' + score + "/" + culture_Quizz.questions.length;
        scoreText() 
        nextButton.style.display = 'none';
        replayButton.style.display = 'block';
        submitButton.style.display = 'none';
    }
    console.log(currentQuestionIndex);
    submitButton.style.visibility = 'visible';

    confetti.reset();
    progression ();
});


// bouton rejouer
replayButton.addEventListener('click', () => {
    shuffle(questions)
    currentQuestionIndex = 0
    score = 0;
    loadQuestion(currentQuestionIndex)
    nextButton.style.display = 'none';
    timer.style.display = 'block'
    progressionbar.value = 0
})

// Pour mélanger les questions aux prochaines parties
function shuffle(questions) {
    culture_Quizz.questions.sort(()=> Math.random()-0.5);
}

// Pour la barre de progression
function progression () {
    const progressBar = document.getElementById('progressBar')
    progressBar.max
    progressBar.value = currentQuestionIndex
    }




