// DOM Elements
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultScreen = document.getElementById("result-screen");
const quizContent = document.getElementById("quiz-content");
const progressBar = document.getElementById("progress-bar");
const questionNumber = document.getElementById("question-number");
const totalQuestions = document.getElementById("total-questions");
const currentScore = document.getElementById("current-score");
const finalScore = document.getElementById("final-score");
const finalTotal = document.getElementById("final-total");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const resultIcon = document.getElementById("result-icon");

// Quiz State
let state = {
  shuffledQuestions: [],
  currentQuestionIndex: 0,
  score: 0,
  answered: false,
  selectedAnswerIndex: -1,
  answeredQuestions: [], // Track all answered questions for feedback
};

// Enhanced Question Bank with Dynamic Loading
const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
      { text: "222", correct: false },
      { text: "2222", correct: false },
    ],
    category: "Math",
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "HyperText Machine Language", correct: false },
      { text: "HighText Markup Language", correct: false },
    ],
    category: "Web Development",
  },
  {
    question: "Which property is used to change the background color?",
    answers: [
      { text: "color", correct: false },
      { text: "bgColor", correct: false },
      { text: "background-color", correct: true },
      { text: "background", correct: false },
    ],
    category: "CSS",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<scripting>", correct: false },
    ],
    category: "Web Development",
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Styling System", correct: false },
      { text: "Cascading System Sheets", correct: false },
    ],
    category: "CSS",
  },
  {
    question: "Which JavaScript method is used to select an HTML element by ID?",
    answers: [
      { text: "selectId()", correct: false },
      { text: "getElementById()", correct: true },
      { text: "queryId()", correct: false },
      { text: "findBy()", correct: false },
    ],
    category: "JavaScript",
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
    category: "Geography",
  },
  {
    question: "In which year did the Titanic sink?",
    answers: [
      { text: "1912", correct: true },
      { text: "1898", correct: false },
      { text: "1920", correct: false },
      { text: "1905", correct: false },
    ],
    category: "History",
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Saturn", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Neptune", correct: false },
      { text: "Earth", correct: false },
    ],
    category: "Science",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: [
      { text: "Jane Austen", correct: false },
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
    ],
    category: "Literature",
  },
  {
    question: "What is the chemical symbol for Gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
    category: "Science",
  },
  {
    question: "Which array method adds an element to the end of an array?",
    answers: [
      { text: "pop()", correct: false },
      { text: "push()", correct: true },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false },
    ],
    category: "JavaScript",
  },
  {
    question: "What does API stand for?",
    answers: [
      { text: "Application Program Interface", correct: true },
      { text: "Application Process Interaction", correct: false },
      { text: "Advanced Programming Interface", correct: false },
      { text: "Access Protocol Interface", correct: false },
    ],
    category: "Web Development",
  },
  {
    question: "In which year did the Berlin Wall fall?",
    answers: [
      { text: "1987", correct: false },
      { text: "1989", correct: true },
      { text: "1991", correct: false },
      { text: "1985", correct: false },
    ],
    category: "History",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Mercury", correct: false },
      { text: "Jupiter", correct: false },
    ],
    category: "Science",
  },
  {
    question: "What is the HTML tag for creating a hyperlink?",
    answers: [
      { text: "<link>", correct: false },
      { text: "<href>", correct: false },
      { text: "<a>", correct: true },
      { text: "<url>", correct: false },
    ],
    category: "Web Development",
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Michelangelo", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Raphael", correct: false },
      { text: "Donatello", correct: false },
    ],
    category: "Art",
  },
  {
    question: "What does JSON stand for?",
    answers: [
      { text: "Java Source Object Notation", correct: false },
      { text: "JavaScript Object Notation", correct: true },
      { text: "Java Standard Oriented Network", correct: false },
      { text: "JavaScript Open Network", correct: false },
    ],
    category: "Web Development",
  },
  {
    question: "What is the speed of light?",
    answers: [
      { text: "150,000 km/s", correct: false },
      { text: "300,000 km/s", correct: true },
      { text: "200,000 km/s", correct: false },
      { text: "350,000 km/s", correct: false },
    ],
    category: "Science",
  },
  {
    question: "Which CSS property is used to control text alignment?",
    answers: [
      { text: "text-decoration", correct: false },
      { text: "text-transform", correct: false },
      { text: "text-align", correct: true },
      { text: "text-style", correct: false },
    ],
    category: "CSS",
  },
];

// Initialize Quiz
function startQuiz() {
  // Reset State
  state = {
    shuffledQuestions: shuffleArray([...questions]).slice(0, 10), // Take only 10 questions
    currentQuestionIndex: 0,
    score: 0,
    answered: false,
    selectedAnswerIndex: -1,
    answeredQuestions: [],
  };

  // Update UI
  resultScreen.classList.add("hide");
  quizContent.classList.remove("hide");
  nextButton.classList.add("hide");

  // Update score display
  updateScoreDisplay();

  // Load first question
  loadQuestion();
}

// Shuffle Array (Fisher-Yates)
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Load Current Question
function loadQuestion() {
  state.answered = false;
  state.selectedAnswerIndex = -1;
  resetState();

  const currentQuestion =
    state.shuffledQuestions[state.currentQuestionIndex];
  const questionPosition = state.currentQuestionIndex + 1;

  // Update progress indicator
  questionNumber.textContent = questionPosition;
  totalQuestions.textContent = state.shuffledQuestions.length;

  // Update progress bar
  const progressPercentage =
    (questionPosition / state.shuffledQuestions.length) * 100;
  progressBar.style.width = progressPercentage + "%";

  // Display question
  questionElement.textContent = currentQuestion.question;

  // Display answers
  currentQuestion.answers.forEach((answer, index) => {
    const answerButton = document.createElement("button");
    answerButton.classList.add("answer-btn");
    answerButton.textContent = answer.text;
    answerButton.addEventListener("click", () =>
      selectAnswer(index, answer.correct)
    );
    answerButtons.appendChild(answerButton);
  });

  nextButton.classList.add("hide");
}

// Select Answer with Feedback
function selectAnswer(answerIndex, isCorrect) {
  if (state.answered) return; // Prevent multiple selections

  state.answered = true;
  state.selectedAnswerIndex = answerIndex;

  const currentQuestion = state.shuffledQuestions[state.currentQuestionIndex];
  const answerBtns = answerButtons.querySelectorAll(".answer-btn");

  // Track answered question
  state.answeredQuestions.push({
    question: currentQuestion.question,
    category: currentQuestion.category,
    correct: isCorrect,
  });

  // Show correct answer and highlight selection
  currentQuestion.answers.forEach((answer, index) => {
    if (answer.correct) {
      answerBtns[index].classList.add("correct");
    }
    if (index === answerIndex && !isCorrect) {
      answerBtns[index].classList.add("incorrect");
    }
    answerBtns[index].disabled = true;
  });

  // Update score if correct
  if (isCorrect) {
    state.score++;
    updateScoreDisplay();
  }

  // Show next button
  nextButton.classList.remove("hide");
}

// Reset Answer Display
function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Update Score Display
function updateScoreDisplay() {
  currentScore.textContent = state.score;
}

// Move to Next Question
nextButton.addEventListener("click", () => {
  state.currentQuestionIndex++;

  if (state.currentQuestionIndex < state.shuffledQuestions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

// End Quiz and Show Results
function endQuiz() {
  quizContent.classList.add("hide");
  resultScreen.classList.remove("hide");

  const totalQ = state.shuffledQuestions.length;
  const percentage = Math.round((state.score / totalQ) * 100);

  // Display final score
  finalScore.textContent = state.score;
  finalTotal.textContent = totalQ;

  // Display personalized message
  let message = "";
  let title = "";
  let icon = "";

  if (percentage === 100) {
    title = "Perfect Score! 🎉";
    message = "Outstanding! You answered all questions correctly!";
    icon = "🏆";
  } else if (percentage >= 80) {
    title = "Excellent Work! 👏";
    message = "Great job! You have strong knowledge.";
    icon = "⭐";
  } else if (percentage >= 60) {
    title = "Good Effort! 👍";
    message = "Good work! Keep learning to improve further.";
    icon = "👍";
  } else if (percentage >= 40) {
    title = "Not Bad! 💪";
    message = "You're on the right track. Study more and try again!";
    icon = "💪";
  } else {
    title = "Keep Trying! 📚";
    message = "Don't worry! Review the topics and attempt again.";
    icon = "📚";
  }

  resultTitle.textContent = title;
  resultMessage.textContent = message + ` (${percentage}%)`;
  resultIcon.textContent = icon;

  // Generate Category Breakdown
  generateCategoryBreakdown();

  // Generate Personalized Feedback
  generatePersonalizedFeedback(percentage);
}

// Generate Category-wise Breakdown
function generateCategoryBreakdown() {
  const categoryStats = {};

  state.answeredQuestions.forEach((q) => {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { correct: 0, total: 0 };
    }
    categoryStats[q.category].total++;
    if (q.correct) {
      categoryStats[q.category].correct++;
    }
  });

  let breakdownHTML = "<div class='category-cards'>";

  for (const [category, stats] of Object.entries(categoryStats)) {
    const categoryPercentage = Math.round((stats.correct / stats.total) * 100);
    const statusEmoji =
      categoryPercentage === 100 ? "✅" : categoryPercentage >= 60 ? "✔️" : "⚠️";

    breakdownHTML += `
      <div class="category-card">
        <div class="category-name">${statusEmoji} ${category}</div>
        <div class="category-score">${stats.correct}/${stats.total}</div>
        <div class="category-percent">${categoryPercentage}%</div>
      </div>
    `;
  }

  breakdownHTML += "</div>";

  const categoryBreakdown = document.getElementById("category-breakdown");
  categoryBreakdown.innerHTML = breakdownHTML;
}

// Generate Personalized Feedback and Tips
function generatePersonalizedFeedback(percentage) {
  const tipsContent = document.getElementById("tips-content");
  let feedbackHTML = "";

  if (percentage === 100) {
    feedbackHTML = `
      <strong>🌟 Outstanding Performance!</strong><br>
      You have mastered all the topics. Consider helping others learn or explore advanced topics in these areas.
    `;
  } else if (percentage >= 80) {
    feedbackHTML = `
      <strong>📚 Great Foundation!</strong><br>
      You have a strong grasp of the material. Focus on the weak areas to achieve perfect scores.
    `;
  } else if (percentage >= 60) {
    feedbackHTML = `
      <strong>💡 Good Progress!</strong><br>
      You're on the right track! Review the concepts you found challenging and practice more questions in those categories.
    `;
  } else if (percentage >= 40) {
    feedbackHTML = `
      <strong>📖 Room for Improvement</strong><br>
      Take time to study the topics more carefully. Break down complex concepts into smaller chunks and practice regularly.
    `;
  } else {
    feedbackHTML = `
      <strong>🎯 Time to Focus</strong><br>
      Don't get discouraged! Start with fundamentals, study each topic thoroughly, and take this quiz again after revision.
    `;
  }

  // Add category-specific recommendations
  const categoryStats = {};
  state.answeredQuestions.forEach((q) => {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { correct: 0, total: 0 };
    }
    categoryStats[q.category].total++;
    if (q.correct) {
      categoryStats[q.category].correct++;
    }
  });

  let weakCategories = [];
  for (const [category, stats] of Object.entries(categoryStats)) {
    if (stats.correct / stats.total < 0.6) {
      weakCategories.push(category);
    }
  }

  if (weakCategories.length > 0) {
    feedbackHTML += `<br><br><strong>🎓 Focus Areas:</strong><br>`;
    feedbackHTML += `Pay special attention to: <strong>${weakCategories.join(", ")}</strong>`;
  }

  // Add general tips
  feedbackHTML += `
    <br><br><strong>✨ General Tips:</strong>
    <ul>
      <li>Review incorrect answers and understand why they were wrong</li>
      <li>Create flashcards for difficult concepts</li>
      <li>Practice similar questions daily</li>
      <li>Take breaks and avoid cramming</li>
      <li>Retake this quiz to track your progress</li>
    </ul>
  `;

  tipsContent.innerHTML = feedbackHTML;
}

// Restart Quiz
restartButton.addEventListener("click", startQuiz);

// Start the quiz on page load
startQuiz();
