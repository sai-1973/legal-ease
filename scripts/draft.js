let currentType = "fir";

document.querySelectorAll(".doc-type-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".doc-type-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    currentType = this.dataset.type;

    document.getElementById("fir-fields").style.display = "none";
    document.getElementById("complaint-fields").style.display = "none";
    document.getElementById("rti-fields").style.display = "none";
    document.getElementById(currentType === "fir" ? "fir-fields" :
                            currentType === "complaint" ? "complaint-fields" : "rti-fields")
            .style.display = "block";

    document.getElementById("preview-box").style.display = "none";
  });
});

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() || "___________" : "___________";
}

function formatDate(id) {
  const el = document.getElementById(id);
  if (!el || !el.value) return "___________";
  const d = new Date(el.value);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function generateFIR() {
  return `TO,
The Station House Officer,
${val("fir-station")}

Subject: Complaint for Registration of FIR

Respected Sir/Madam,

I, ${val("fir-name")}, residing at ${val("fir-address")}, wish to bring to your notice the following incident and request you to register an FIR accordingly.

DETAILS OF THE INCIDENT:

Date of Incident : ${formatDate("fir-date")}
Place of Incident : ${val("fir-place")}
Accused (if known) : ${val("fir-accused")}

DESCRIPTION:

${val("fir-incident")}

In light of the above facts, I humbly request you to register an FIR against the accused and take necessary legal action as per the provisions of the Indian Penal Code and Code of Criminal Procedure.

I declare that the information provided above is true and correct to the best of my knowledge.

Thanking you,

Yours faithfully,

Name    : ${val("fir-name")}
Address : ${val("fir-address")}
Date    : ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}


(Signature)`;
}

function generateComplaint() {
  return `TO,
The Station House Officer / Commissioner of Police,

Subject: Written Complaint regarding ${val("c-nature")}

Respected Sir/Madam,

I, ${val("c-name")}, residing at ${val("c-address")}, wish to file a formal complaint against ${val("c-against")}.

NATURE OF COMPLAINT: ${val("c-nature")}
DATE OF INCIDENT   : ${formatDate("c-date")}

DETAILS OF THE COMPLAINT:

${val("c-desc")}

RELIEF SOUGHT:

${val("c-relief")}

I request you to take immediate cognizance of this complaint and initiate appropriate legal proceedings. I am willing to provide any further information or evidence required.

I solemnly declare that the above-stated facts are true to the best of my knowledge and belief.

Thanking you,

Yours sincerely,

Name    : ${val("c-name")}
Address : ${val("c-address")}
Date    : ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}


(Signature)`;
}

function generateRTI() {
  return `TO,
The Public Information Officer,
${val("r-dept")}

Subject: Application under the Right to Information Act, 2005

Respected Sir/Madam,

I, ${val("r-name")}, a citizen of India, residing at ${val("r-address")}, hereby request the following information under Section 6(1) of the Right to Information Act, 2005:

INFORMATION REQUESTED:

${val("r-info")}

TIME PERIOD: ${val("r-period")}

I am enclosing the prescribed application fee of Rs. 10/- (by cash / Indian Postal Order / DD).

If the requested information is not held by your office, please transfer this application to the concerned Public Information Officer as per Section 6(3) of the RTI Act.

I expect a response within 30 days as mandated by the Act.

Thanking you,

Yours sincerely,

Name    : ${val("r-name")}
Address : ${val("r-address")}
Date    : ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}


(Signature)`;
}

document.getElementById("generate-btn").addEventListener("click", function () {
  let draft = "";

  if (currentType === "fir") draft = generateFIR();
  else if (currentType === "complaint") draft = generateComplaint();
  else if (currentType === "rti") draft = generateRTI();

  document.getElementById("draft-output").textContent = draft;
  document.getElementById("preview-box").style.display = "block";

  document.getElementById("preview-box").scrollIntoView({ behavior: "smooth" });
});

function copyDraft() {
  const text = document.getElementById("draft-output").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Draft copied to clipboard!");
  });
}

function printDraft() {
  const content = document.getElementById("draft-output").textContent;
  const win = window.open("", "_blank");
  win.document.write(`
    <html><head><title>Legal Draft</title>
    <style>
      body { font-family: Georgia, serif; padding: 48px; font-size: 14px; line-height: 1.9; color: #000; }
      @media print { body { padding: 24px; } }
    </style>
    </head><body><pre>${content}</pre></body></html>
  `);
  win.document.close();
  win.print();
}