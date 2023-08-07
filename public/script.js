const socket = io();
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");

socket.on("message", (data) => {
  const div = document.createElement("div");
  div.className =
    data.sender === "Bithia" ? "text-blue-600 mb-2" : "text-green-600 mb-2";
  div.textContent = `${data.sender}: ${data.message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});

messageInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && messageInput.value.trim() !== "") {
    const sender = prompt("¿Quién eres? (Bithia/Mati)");
    if (sender === "Bithia" || sender === "Mati") {
      socket.emit("message", { sender, message: messageInput.value });
      messageInput.value = "";
    } else {
      alert("Por favor, introduce 'Bithia' o 'Mati'.");
    }
  }
});
