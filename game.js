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
    nextButton.style.display ="disabled";
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
    } else {
        questions.innerText = 'Fin du Quizz !';
        options.innerHTML = '';
        nextButton.style.display = 'none';
        replayButton.style.display = 'block';
    }

}); 

replayButton.addEventListener('click', () => { 

    //réinitialisation à 0 du Quiz
    currentQuestionIndex = 0;

    // On cache le bouton 'rejouer'
    replayButton.style.display = 'none';

    // on appelle la fonction displayQuestion avec en argument la fonction réinitialisée
    loadQuestion(currentQuestionIndex);

    nextButton.style.display = 'block';

    
});
// //On récupère l'option sur laquelle à cliqué le joueur
// culture_Quizz.options.option.addEventListener("click",() =>{
//     nextButton.style.    
// })
options.option.addEventListener("click",() =>{
    // if ("click")
    // {
    //     console.log("Tu as cliqué");
    // }
    if ("click" ) 
      {
        nextButton.querySelector("#next-button").d
        console.log("Tu as cliqué");
      } 
    
})
