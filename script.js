function initQuiz() {
const quizData = [
  { question: "What are Glyptodontidae?", options: ["armadillos","anteaters", "rodents", "echidnas"], answer: "armadillos"},
  { question: "Why did Archelon go extinct?", options: ["ice age", "extinction event", "hunting by humans", "the sea drying out"], answer: "the sea drying out"},
  { question: "What family does Andrewsarchus belong to?", options: ["canine", "odd toed ungulates", "cetaceans","enteledont", ], answer: "cetaceans"},
  { question: "What family of dinosaur's egg was it originally thought Oviraptor preferred to eat?", options: ["sauropods","ceratopsians","dromeosaurs","ankylosauroidsD4"], answer: "ceratopsians" },
  { question: "Which animal on the list was NOT bigger than a T. rex", options: ["Amargasaurus","Deinocheirus","Megalodon","Shantungosaurus"], answer: "Amargasaurus" },
  { question: "What did Mononykus eat?", options: ["plants","shellfish","termites","small rodents"], answer: "termites" },
  { question: "What is the animal on the list that lived most recently?", options: ["Deinopithecus","Doedicurus","Terror birds","Andrewsarchus"], answer: "Doedicurus" },
  { question: "Who is the paleontologist that described Giganotoraptor, Yutyrannus, and (not mentioned in the countdown) Liaoningosaurus", options: ["Mary Anning","Xu Xing","Alan Grant","William Buckland"], answer: "Xu Xing" },
  { question: "Why could dinosaurs survive in the cold, despite being reptiles?", options: ["They were all so big that they made a ton of body heat","They all had feathers","They were warm-blooded, not cold-blooded","They had thicker skin than modern animals"], answer: "They were warm-blooded, not cold-blooded" },
  { question: "What is the smallest animal on the list?", options: ["Jehelopterus","Oviraptor","Liaoningosaurus","Mononykus"], answer: "Liaoningosaurus" },
  { question: "What diet did Arthropleurae have?", options: ["carnivorous","herbivorous","pescivorous","detrivorous"], answer: "detrivorous" },
  { question: "What animal on the list lived the longest time ago?", options: ["Arthropleurae","Nothosaurus","Kaprosuchus","Jehelopterus"], answer: "Arthropleurae" },
  { question: "When did Nothosaurus live?", options: ["Carboniferous","Triassic","Jurassic","Cretaceous"], answer: "Triassic" },
  { question: "What was the name of the paleo documentary with the infamous Carnotaurus dance scene?", options: ["Planet Dinosaur","Life On Our Planet","Prehistoric Planet","Walking With Dinosaurs"], answer: "Prehistoric Planet" },
  { question: "Which animal has a hunting method where they specifically target newborns?", options: ["Oviraptor","Carnotaurus","Spinosaurus","Quetzalcoatlus"], answer: "Quetzalcoatlus"}
];
let current = 0;
const answers = Array(quizData.length).fill(null);
const qText = document.getElementById("question-text");
const aDiv = document.getElementById("answers");
const prev = document.getElementById("prev-btn");
const next = document.getElementById("next-btn");
const counter = document.getElementById("question-counter");
const container = document.getElementById("quiz-container");
if (![qText, aDiv, prev, next, counter, container].every(Boolean)) {
  setupGalleryImages();
  return;
}
const load = i => {
  const q = quizData[i];
  qText.textContent = q.question;
  aDiv.innerHTML = "";
  q.options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "nav-btn mb-2 w-100 text-start";
    b.textContent = opt;
    if (answers[i]) b.disabled = true;
    if (answers[i]) {
      if (opt === q.answer) b.classList.add("correct-answer");
      else if (opt === answers[i]) b.classList.add("wrong-answer");
    }
    b.onclick = () => {
      if (answers[i]) return;
      answers[i] = opt;
      [...aDiv.children].forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === q.answer) btn.classList.add("correct-answer");
        else if (btn.textContent === opt) btn.classList.add("wrong-answer");
      });
    };
    aDiv.appendChild(b);
  });
  counter.textContent = i + 1;
  prev.disabled = i === 0;
  next.textContent = i === quizData.length - 1 ? "Submit" : "Next";
};
next.onclick = () => {
  if (!answers[current]) {
    alert("Answer the question first!");
    return;
  }
  if (current < quizData.length - 1) load(++current);
  else results();
};
prev.onclick = () => current && load(--current);
const results = () => {
  const score = answers.filter((a, i) => a === quizData[i].answer).length;
  container.innerHTML = `
    <h3>Quiz Complete!!!</h3>
    <p>Score: ${score} / 15</p>
    <br>
    <p>Click the Pibble for your prize!!</p>
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
      <img src="https://i.imgur.com/NK5UEDp.gif" width="100" height="100">
    </a>
    <br><br>
    <button onclick="location.reload()" class="nav-btn">Restart Quiz</button>
  `;
};

load(current);
setupGalleryImages();
}
function setupGalleryImages() {
  document.querySelectorAll(".box2 a").forEach(link => {
    link.onclick = e => {
      e.preventDefault();
      const img = link.querySelector("img");
      if (!img) return;
      const o = document.createElement("div");
      o.className = "img-modal-overlay";
      const f = document.createElement("img");
      f.src = img.src;
      o.appendChild(f);
      document.body.appendChild(o);
      o.onclick = () => o.remove();
    };
  });
}
setTimeout(initQuiz, 100);

