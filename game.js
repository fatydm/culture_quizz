
import { culture_Quizz } from './questionsQuizz.js';

// ===================== ÉTAT DU QUIZ ===================== //
let currentQuestionIndex = 0;
let selectedOption = '';
let score = 0;
let countdownInterval = null;

// ===================== RÉCUPÉRATION DOM ===================== //
const questions = document.getElementById('question-text');
const options = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');
const submitButton = document.getElementById('check-button');
const timer = document.getElementById('timer');
const progressBar = document.getElementById('progressBar');

const wrongAnswerText = document.createElement('p');
const correctAnswerText = document.createElement('p');
const justificationText = document.createElement('p');

// ===================== AUDIO ===================== //
const audioFiles = [
    "./sounds/correct_answer.mp3",
    "./sounds/qvgdm.mp3",
    "./sounds/wrongAnswer.mp3"
];

const audios = audioFiles.map(src => {
    const audio = document.createElement("audio");
    audio.src = src;
    document.body.appendChild(audio);
    return audio;
});

function stopAudio() {
    audios[1].pause();
    audios[1].currentTime = 0;
}

// ===================== PROGRESS BAR ===================== //
function hideProgressBar() {
    progressBar.style.display = 'none';
}

function showProgressBar() {
    progressBar.style.display = 'inline-block';
    progressBar.max = culture_Quizz.questions.length;
    progressBar.value = currentQuestionIndex;
}

// ===================== TIMER ===================== //
function startTimer() {
    clearInterval(countdownInterval);
    let time = 15;
    timer.innerText = time;
    timer.style.display = 'block';

    audios[1].play();

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

// ===================== TEMPS ÉCOULÉ ===================== //
function endOfTime() {
    const q = culture_Quizz.questions[currentQuestionIndex];

    questions.innerText = 'Temps écoulé 😕';
    options.innerHTML = '';

    correctAnswerText.innerText = `La bonne réponse était : ${q.correctAnswer}`;
    justificationText.innerText = q.justification;

    options.append(correctAnswerText, justificationText);

    const img = document.createElement('img');
    img.src = q.image;
    img.alt = 'image de la réponse';
    img.className = 'answer-img';
    options.appendChild(img);

    submitButton.style.display = 'none';
    submitButton.classList.add('disabled');

    nextButton.style.display = 'inline-block';
    nextButton.classList.remove('disabled');

    timer.style.display = 'none';
    hideProgressBar();

    audios[2].play();
}

// ===================== CHARGEMENT QUESTION ===================== //
function loadQuestion(index) {
    stopTimer();
    options.innerHTML = '';
    selectedOption = '';

    const q = culture_Quizz.questions[index];
    questions.innerText = q.question;

    q.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => selectAnswer(button);
        options.appendChild(button);
    });

    submitButton.style.display = 'none';
    submitButton.disabled = true;
    submitButton.classList.add('disabled');

    nextButton.style.display = 'none';
    nextButton.classList.add('disabled');

    replayButton.style.display = 'none';

    showProgressBar();
    startTimer();
}

// ===================== SÉLECTION RÉPONSE ===================== //
function selectAnswer(button) {
    selectedOption = button.innerText;

    options.querySelectorAll('button').forEach(btn => {
        btn.style.background = '';
        btn.style.color = '';
        btn.style.fontWeight = '';
        btn.style.border = '';
    });

    button.style.background = 'rgb(218, 140, 33)';
    button.style.color = 'black';
    button.style.fontWeight = 'bold';
    button.style.borderColor = 'black';

    submitButton.style.display = 'inline-block';
    submitButton.disabled = false;
    submitButton.classList.remove('disabled');
}

// ===================== VALIDATION RÉPONSE ===================== //
submitButton.addEventListener('click', () => {
    const q = culture_Quizz.questions[currentQuestionIndex];
    stopTimer();
    stopAudio();

    options.innerHTML = '';

    if (selectedOption === q.correctAnswer) {
        questions.innerText = 'Bonne réponse 😎';
        score++;
        audios[0].play();

        confetti({ particleCount: 250, spread: 100, origin: { y: 0.6 } });
    } else {
        questions.innerText = 'Mauvaise réponse 🫣';
        audios[2].play();
    }

    correctAnswerText.innerText = `La bonne réponse était : ${q.correctAnswer}`;
    justificationText.innerText = q.justification;

    options.append(correctAnswerText, justificationText);

    const img = document.createElement('img');
    img.src = q.image;
    img.alt = 'image de la réponse';
    img.className = 'answer-img';
    options.appendChild(img);

    submitButton.style.display = 'none';
    submitButton.classList.add('disabled');

    nextButton.style.display = 'inline-block';
    nextButton.classList.remove('disabled');

    timer.style.display = 'none';
    hideProgressBar();
});

// ===================== QUESTION SUIVANTE ===================== //
nextButton.addEventListener('click', () => {
    nextButton.classList.add('disabled');

    if (currentQuestionIndex < culture_Quizz.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        questions.innerText = 'Fin du Quizz 🎉';
        options.innerHTML = `Ton score est de ${score} / ${culture_Quizz.questions.length}`;

        nextButton.style.display = 'none';
        replayButton.style.display = 'inline-block';
    }

    confetti.reset();
});

// ===================== REJOUER ===================== //
replayButton.addEventListener('click', () => {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;

    loadQuestion(currentQuestionIndex);
    confetti.reset();
});

// ===================== UTILITAIRES ===================== //
function shuffleQuestions() {
    culture_Quizz.questions.sort(() => Math.random() - 0.5);
}

// ===================== LANCEMENT ===================== //
loadQuestion(currentQuestionIndex);

