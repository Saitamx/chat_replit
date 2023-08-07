const socket = io();
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

let sender = localStorage.getItem("chatName");

while (!sender || (sender !== "Bithia" && sender !== "Mati")) {
  sender = prompt("¿Quién eres? (Bithia/Mati)");
}

localStorage.setItem("chatName", sender);

socket.on("message", (data) => {
  const messageDiv = document.createElement("div");
  const textDiv = document.createElement("div");
  messageDiv.className =
    data.sender === "Bithia"
      ? "flex items-start"
      : "flex items-start justify-end";
  textDiv.className =
    data.sender === "Bithia"
      ? "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white"
      : "px-4 py-2 rounded-lg inline-block rounded-br-none bg-green-600 text-white";
  textDiv.textContent = `${data.message}`;
  messageDiv.appendChild(textDiv);
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});

sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    sendMessage();
    event.preventDefault(); // Prevents the default action (newline) when pressing Enter
  }
});

function sendMessage() {
  if (messageInput.value.trim() !== "") {
    socket.emit("message", { sender, message: messageInput.value });
    messageInput.value = "";
  }
}
