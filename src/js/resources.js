import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onChildAdded } from 'firebase/database';
import { firebaseConfig } from './keys.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, 'messages');

// Initialize animations
AOS.init({
    duration: 600,
    easing: 'ease-out-quad',
    once: true
});

// DOM elements
const messagesContainer = document.getElementById('messages-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const initialMessage = document.getElementById('initial-message');

// Get or set username
let username = localStorage.getItem('chatUsername');
if (!username) {
    username = prompt('Please enter a username for the chat:') || 'Anonymous';
    localStorage.setItem('chatUsername', username);
}

// Load and display messages
onChildAdded(messagesRef, (snapshot) => {
    const message = snapshot.val();
    displayMessage(message);
});

// Display a message in the chat
function displayMessage(message) {
    if (initialMessage) {
        initialMessage.remove();
    }

    const isCurrentUser = message.username === username;
    const messageElement = document.createElement('div');
    messageElement.className = `message-bubble ${isCurrentUser ? 'user' : 'other'}`;
    
    const infoElement = document.createElement('div');
    infoElement.className = 'message-info';
    infoElement.textContent = `${message.username} • ${new Date(message.timestamp).toLocaleTimeString()}`;
    
    const textElement = document.createElement('div');
    textElement.textContent = message.text;
    
    messageElement.appendChild(infoElement);
    messageElement.appendChild(textElement);
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send a new message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText) {
        const newMessage = {
            text: messageText,
            username: username,
            timestamp: Date.now()
        };
        
        push(messagesRef, newMessage)
            .then(() => {
                messageInput.value = '';
            })
            .catch((error) => {
                console.error('Error sending message:', error);
            });
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Theme toggle support (matches your existing implementation)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
}