function addMessage(text, type) {
  const chatWindow = document.getElementById("chat-window");
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  if (type === "ai") {
    msg.innerHTML = marked.parse(text);
  } else {
    msg.textContent = text;
  }
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return msg;
}

async function sendQuestion() {
  const input = document.getElementById("user-input");
  const btn = document.getElementById("send-btn");
  const question = input.value.trim();

  if (!question) return;

  addMessage(question, "user");
  input.value = "";
  btn.disabled = true;

  const loadingMsg = addMessage("Thinking...", "loading");

  try {
    const apiUrl = window.location.hostname === "localhost"
      ? "http://localhost:3000/api/ask"
      : "/api/ask";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    loadingMsg.remove();

    if (data.error) {
      addMessage("Sorry, something went wrong: " + data.error, "ai");
    } else {
      addMessage(data.answer, "ai");
    }

  } catch (err) {
    loadingMsg.remove();
    addMessage("Could not connect to the server. Make sure it is running.", "ai");
  }

  btn.disabled = false;
  document.getElementById("user-input").focus();
}

function askSuggestion(btn) {
  document.getElementById("user-input").value = btn.textContent;
  sendQuestion();
}

function handleKey(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendQuestion();
  }
}