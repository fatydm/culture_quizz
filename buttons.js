export { game } from './game.js'; 
//export { nextButton } from './buttons.js'

const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');

// bouton suivant
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

// bouton rejouer
replayButton.addEventListener('click', () => {
    currentQuestionIndex = 0
    replayButton.style.display = 'none';
    loadQuestion(currentQuestionIndex)
    nextButton.style.display = 'block';
})

// bouton valider
