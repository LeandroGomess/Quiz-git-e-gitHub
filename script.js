const questions = [
    {
        question: "O que é git?",
        answers: [
            { text: "hospedagem de controles de versão do git", correct: false},
            { text: "sistema de controle de versão", correct: true},
            { text: "editor de código", correct: false},
            { text: "programa de edição de imagem", correct: false},
        ]
    },
    {
        question: "Para o que serve o gitHub?",
        answers: [
            { text: "Segurança do código", correct: false},
            { text: "banco de vídeos online", correct: false},
            { text: "linguagem de programação backend", correct: false},
            { text: "hospeda os controles de versão do tipo git", correct: true},
        ]
    },
    {
        question: "Qual comando usado para abrir ou fechar o terminal?",
        answers: [
            { text: "Ctrl + Y", correct: false},
            { text: "ctrl + ‘", correct: true},
            { text: "Ctrl + Y", correct: false},
            { text: "Ctrl + P", correct: false},
        ]
    },
    {
        question: "Qual o comando para verificar a versão instalada no git?",
        answers: [
            { text: "git fetch", correct: false},
            { text: "tasklist", correct: false},
            { text: "npm run dev", correct: false},
            { text: "git --version", correct: true},
        ]
    },
    {
        question: "Qual o comando utilizado para inicializar uma nova pasta vazia no git?",
        answers: [
            { text: "ipconfig", correct: false},
            { text: "git init", correct: true},
            { text: "msconfig", correct: false},
            { text: "git start", correct: false},
        ]
    },
    {
        question: "Qual o comando utilizado para configurar seu nome no git?",
        answers: [
            { text: "git user.name", correct: true},
            { text: "Alt + F4", correct: false},
            { text: "git user.email", correct: false},
            { text: "Ctrl + Shift + N", correct: false},
        ]
    },
    {
        question: "Qual o comando utilizado para configurar seu email no git?",
        answers: [
            { text: "Ctrl + Shift + Esc", correct: false},
            { text: "git user.email", correct: true},
            { text: "Windows Key + R", correct: false},
            { text: "git user.name", correct: false},
        ]
    },
    {
        question: "Qual o comando utilizado para verificar a situação do git no momento atual?",
        answers: [
            { text: "Windows Key + R", correct: false},
            { text: "git status", correct: true},
            { text: "Alt + Tab", correct: false},
            { text: "Ctrl + N", correct: false},
        ]
    },
    {
        question: "Qual o comando para adicionar uma ou mais alterações no diretório ativo?",
        answers: [
            { text: "git status", correct: false},
            { text: "git branch", correct: false},
            { text: "git add .", correct: true},
            { text: "git init", correct: false},
        ]
    },
    {
        question: "Qual o comando utilizado no terminal para fazer um commit e adicionar uma mensagem?",
        answers: [
            { text: "git commit -m ”  ”", correct: true},
            { text: "git statch", correct: false},
            { text: "git pull", correct: false},
            { text: "git push", correct: false},
        ]
    },
    {
        question: "Qual o comando utilizado para empurrar o commit para o gitHub?",
        answers: [
            { text: "git reset", correct: false},
            { text: "git push", correct: true},
            { text: "git config", correct: false},
            { text: "git tag", correct: false},
        ]
    },
    {
        question: "Qual o comando utilizado para baixar conteúdos de um repositório remoto?",
        answers: [
            { text: "git diff", correct: false},
            { text: "git merge", correct: false},
            { text: "git fetch", correct: true},
            { text: "git reset", correct: false},
        ]
    },
    {
        question: "Qual o comando utilizado para buscar e baixar conteúdo de repositórios remotos?",
        answers: [
            { text: "git checkout", correct: false},
            { text: "git log", correct: false},
            { text: "git remote", correct: false},
            { text: "git pull", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
})

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

startQuiz();
