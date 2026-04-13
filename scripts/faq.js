const faqs = [
  {
    category: "police",
    question: "What is an FIR and when can I file one?",
    answer: "An FIR (First Information Report) is a written document filed with the police when a cognizable offence (like theft, assault, or fraud) occurs. You can file it at any police station. The police are legally required to register it — they cannot refuse. If they do, you can approach the Superintendent of Police or file a complaint directly with a magistrate under Section 156(3) CrPC."
  },
  {
    category: "police",
    question: "Can the police arrest me without a warrant?",
    answer: "Yes, but only for cognizable offences (serious crimes like murder, robbery, etc.). For non-cognizable offences (minor crimes), they need a magistrate's warrant. Even if arrested without a warrant, you must be informed of the reason, produced before a magistrate within 24 hours, and have the right to inform a family member or lawyer."
  },
  {
    category: "rights",
    question: "What are my fundamental rights if I am arrested?",
    answer: "Under Article 22 of the Constitution: (1) You must be told why you are arrested. (2) You have the right to consult a lawyer of your choice. (3) You must be brought before a magistrate within 24 hours. Under the POCSO and SC/ST Acts, additional protections may apply. You also have the right to remain silent — you are not obligated to answer questions without a lawyer present."
  },
  {
    category: "rights",
    question: "What is the right to free legal aid?",
    answer: "Under Article 39A of the Constitution and the Legal Services Authorities Act, 1987, every person who cannot afford a lawyer has the right to free legal aid from the state. You can contact the District Legal Services Authority (DLSA) in your district. This applies in all criminal cases and many civil matters."
  },
  {
    category: "court",
    question: "What is the difference between a civil case and a criminal case?",
    answer: "A criminal case is initiated by the state against a person for violating a law (e.g., theft, assault). Punishment can include imprisonment or fines. A civil case is a dispute between two private parties (e.g., property dispute, unpaid debt). The outcome is usually compensation or a court order, not imprisonment. You can file a civil case yourself in the appropriate civil court."
  },
  {
    category: "court",
    question: "What is bail and how can I get it?",
    answer: "Bail is the temporary release of an accused person while their case is pending. For bailable offences, bail is a right — the police or magistrate must grant it. For non-bailable offences, only a magistrate or sessions court can grant bail. You or your lawyer can apply for bail by filing a bail application in the relevant court. The court will consider factors like flight risk, severity of crime, and past record."
  },
  {
    category: "rti",
    question: "What is RTI and who can file it?",
    answer: "RTI stands for Right to Information Act, 2005. Any Indian citizen can file an RTI to request information from any government department or public authority. You write a simple application addressed to the Public Information Officer (PIO) of the relevant department, pay a fee of Rs. 10 (free for BPL cardholders), and the department must respond within 30 days."
  },
  {
    category: "rti",
    question: "What if my RTI application is rejected or ignored?",
    answer: "If the PIO does not respond within 30 days or rejects your application without valid reason, you can file a First Appeal with the First Appellate Authority (FAA) of the same department within 30 days. If still unsatisfied, you can file a Second Appeal with the Central or State Information Commission (CIC/SIC). The process is free and you do not need a lawyer."
  },
  {
    category: "rights",
    question: "Can a landlord evict me without notice?",
    answer: "No. Under most state Rent Control Acts in India, a landlord cannot evict a tenant without valid legal grounds (like non-payment of rent or misuse of property) and must give a written notice. The eviction must be done through a court order — a landlord cannot forcibly remove you or cut off electricity/water to force you out. If this happens, you can file a police complaint and approach the Rent Control Court."
  },
  {
    category: "police",
    question: "What should I do if the police refuse to file my FIR?",
    answer: "If police refuse to register your FIR: (1) Send a written complaint by registered post to the Superintendent of Police (SP) of the district. (2) File a complaint under Section 156(3) CrPC before a Judicial Magistrate, who can order the police to register the FIR. (3) Contact the State Human Rights Commission if your rights are being violated. Always keep a copy of any written complaint you submit."
  }
];

let activeCategory = "all";

function renderFAQs(filter = "") {
  const list = document.getElementById("faq-list");
  const noResults = document.getElementById("no-results");
  const keyword = filter.toLowerCase();

  const filtered = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(keyword) ||
                          faq.answer.toLowerCase().includes(keyword);
    return matchesCategory && matchesSearch;
  });

  list.innerHTML = "";

  if (filtered.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  filtered.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "faq-item";
    item.innerHTML = `
      <button class="faq-question" onclick="toggleFAQ(this)">
        <span>
          <span class="faq-tag">${faq.category.toUpperCase()}</span>
          ${faq.question}
        </span>
        <span class="faq-chevron">&#8964;</span>
      </button>
      <div class="faq-answer">${faq.answer}</div>
    `;
    list.appendChild(item);
  });
}

function toggleFAQ(btn) {
  const item = btn.parentElement;
  item.classList.toggle("open");
}

document.getElementById("search-input").addEventListener("input", function () {
  renderFAQs(this.value);
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    activeCategory = this.dataset.category;
    renderFAQs(document.getElementById("search-input").value);
  });
});

renderFAQs();