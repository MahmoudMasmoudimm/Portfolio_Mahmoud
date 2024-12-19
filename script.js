const quizData = [
    {
        question: "Quel est l'élément chimique représenté par le symbole H ?",
        options: ["Hélium", "Hydrogène", "Halogène", "Hafnium"],
        correct: 1
    },
    {
        question: "Quelle planète est la plus proche du Soleil ?",
        options: ["Mars", "Vénus", "Mercure", "Jupiter"],
        correct: 2
    },
    {
        question: "Quel est l'organe principal du système nerveux humain ?",
        options: ["Le cœur", "Le cerveau", "Les poumons", "La colonne vertébrale"],
        correct: 1
    },
    {
        question: "Quelle force nous maintient au sol sur Terre ?",
        options: ["La gravité", "La friction", "L'inertie", "La pression"],
        correct: 0
    },
    {
        question: "Quel gaz les plantes absorbent-elles pour la photosynthèse ?",
        options: ["Oxygène", "Dioxyde de carbone", "Azote", "Hydrogène"],
        correct: 1
    },
    {
        question: "Quelle est la vitesse approximative de la lumière ?",
        options: ["300 000 km/h", "300 000 m/s", "300 000 km/s", "300 000 miles/s"],
        correct: 2
    },
    {
        question: "Quel est l'état de l'eau à 0°C sous pression normale ?",
        options: ["Liquide", "Solide", "Gazeux", "Plasma"],
        correct: 1
    },
    {
        question: "Quelle est l'unité utilisée pour mesurer la fréquence d'une onde ?",
        options: ["Hertz", "Newton", "Watt", "Joule"],
        correct: 0
    },
    {
        question: "Quel est le plus grand organe du corps humain ?",
        options: ["Le foie", "La peau", "Le cerveau", "Les poumons"],
        correct: 1
    },
    {
        question: "Qui a développé la théorie de la relativité ?",
        options: ["Isaac Newton", "Albert Einstein", "Galilée", "Nikola Tesla"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
const answersSelected = new Array(quizData.length).fill(null);

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");

    questionElement.textContent = quizData[currentQuestion].question;
    answersElement.innerHTML = "";

    quizData[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.setAttribute("data-index", index);
        
        button.onclick = () => {
            answersSelected[currentQuestion] = index;

            for (let i = 0; i < answersElement.children.length; i++) {
                answersElement.children[i].disabled = true;
            }

            if (index === quizData[currentQuestion].correct) {
                button.style.backgroundColor = "green";
                score++;
            } else {
                button.style.backgroundColor = "red";
                const correctButton = answersElement.querySelector(`[data-index='${quizData[currentQuestion].correct}']`);
                if (correctButton) correctButton.style.backgroundColor = "green";
            }

            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < quizData.length) {
                    loadQuestion();
                } else {
                    showSubmitButton();
                }
            }, 1000);
        };

        answersElement.appendChild(button);
    });
}

function showSubmitButton() {
    const quizElement = document.getElementById("quiz");
    const submitButton = document.getElementById("submit");

    quizElement.style.display = "none";
    submitButton.style.display = "inline-block";

    submitButton.onclick = showResult;
}

function showResult() {
    const resultElement = document.getElementById("result");
    const submitButton = document.getElementById("submit");

    submitButton.style.display = "none";
    resultElement.style.display = "block";

    const answerList = quizData.map((q, index) => {
        const userAnswer = answersSelected[index] !== null 
            ? q.options[answersSelected[index]] 
            : "Not answered";
        const correctAnswer = q.options[q.correct];
        const isCorrect = answersSelected[index] === q.correct;

        return `
            <p>${index + 1}. ${q.question}<br>
            <strong>Your answer:</strong> ${userAnswer}<br>
            <strong>Correct answer:</strong> ${correctAnswer}</p>
        `;
    }).join("\n");

    resultElement.innerHTML = `
        <p>You scored ${score} out of ${quizData.length} questions.</p>
        ${answerList}
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answersSelected.fill(null);
    document.getElementById("result").style.display = "none";
    document.getElementById("submit").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    loadQuestion();
}

loadQuestion();
