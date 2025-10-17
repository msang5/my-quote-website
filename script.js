const quotes = [
    "The best way to get started is to quit talking and begin doing.",
    "Don't let yesterday take up too much of today.",
    "It's not whether you get knocked down, it's whether you get up.",
    "If you are working on something exciting, it will keep you motivated.",
    "Success is not in what you have, but who you are."
];

const quoteDiv = document.getElementById('quote');
const button = document.getElementById('new-quote');

button.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDiv.textContent = quotes[randomIndex];
});
