document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded successfully!");

  const contactForm = document.getElementById("contactForm");
  const sendMessageButton = document.getElementById("sendMessage");

  // Check if both form and button exist
  if (!contactForm || !sendMessageButton) {
    console.error("Error: Contact form or send button not found!");
    return;
  }

  let responseMessage = document.getElementById("responseMessage");
  if (!responseMessage) {
    responseMessage = document.createElement("div");
    responseMessage.id = "responseMessage";
    responseMessage.style.marginTop = "1rem";
    contactForm.appendChild(responseMessage);
  }

  // Add event listener only if the button exists
  if (sendMessageButton) {
    sendMessageButton.addEventListener("click", async (e) => {
      e.preventDefault(); // Prevent form submission
      console.log("Send button clicked!");

      responseMessage.textContent = "";
      responseMessage.classList.remove("success", "error");

      const nameInput = contactForm.querySelector('input[name="name"]');
      const emailInput = contactForm.querySelector('input[name="email"]');
      const messageInput = contactForm.querySelector('textarea[name="message"]');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      // Added basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !email || !message) {
        responseMessage.textContent = "Please fill in all fields.";
        responseMessage.classList.add("error");
        return;
      }
      if (!emailRegex.test(email)) {
        responseMessage.textContent = "Please enter a valid email address.";
        responseMessage.classList.add("error");
        return;
      }

      sendMessageButton.disabled = true;
      sendMessageButton.textContent = "Sending...";

      try {
        const response = await fetch("https://twilight-bird-3a69.sarthak-aganja12345.workers.dev/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message })
        });

        // Handle JSON response instead of text
        const result = await response.json();

        if (response.ok) {
          responseMessage.textContent = "Message sent successfully!";
          responseMessage.classList.add("success");
          contactForm.reset();
        } else {
          responseMessage.textContent = `Error: ${result.error || "Unknown error occurred"}`;
          responseMessage.classList.add("error");
        }
      } catch (error) {
        responseMessage.textContent = `Error: ${error.message}`;
        responseMessage.classList.add("error");
      } finally {
        sendMessageButton.disabled = false;
        sendMessageButton.textContent = "Send Message";
      }
    });
  } else {
    console.error("Error: The sendMessage button was not found!");
  }
});