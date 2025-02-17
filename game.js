import { culture_Quizz } from './questionsQuizz.js';

// Récupérer les emplacements pour injecter la question et les options
const questions = document.getElementById('question-text');
const options = document.getElementById('options-container');

// Récupérer la première question
const firstQuestion = culture_Quizz.questions[0];

// Injecter le texte de la question dans l'emplacement dédié
questions.innerText = firstQuestion.question;
// firstQuestion.innerText = questions.question;

// Pour chaque option, créer un bouton et l'ajouter au conteneur
firstQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('options-button');
    options.appendChild(button);
});
