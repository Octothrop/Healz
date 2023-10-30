const quotes = [
  "If you want to love others, I think you should love yourself first",
  "Even if it's a road of thorns, we still run ",
  "The key to companionship is trust. We wouldn't have come this far if we didn't trust each other",
  "When things get tough, look at the people who love you ",
  "It's okay to not be okay",
  "I've come to love myself for who I am, for who I was, and for who I hope to become ",
  "Living without passion is like being dead ",
  "It's okay to make mistakes, Everyone does, The important thing is to learn from them and move on ",
  "You are worthy of love and happiness<br> You deserve to be happy ",
  "It's okay to be different<br> That's what makes you special",
  "You are enough<br> Just the way you are ",
  "It's okay to not be okay"
];

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function displayQuote() {
  const quoteText = document.getElementById("quote-text");
  quoteText.innerHTML = getRandomQuote();
}

window.onload = displayQuote;



