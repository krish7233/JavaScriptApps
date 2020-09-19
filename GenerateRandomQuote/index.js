const quotes = [
  {
    text:
      "If you don't have time to read, you don't have the time (or the tools) to write. Simple as that.",
    author: "Stephen King",
  },
  {
    text: "We write to taste life twice, in the moment and in retrospect.",
    author: "Anaïs Nin",
  },
  {
    text:
      "Substitute 'damn' every time you're inclined to write 'very;' your editor will delete it and the writing will be just as it should be.",
    author: "Mark Twain",
  },
  {
    text:
      "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
    author: "Toni Morrison",
  },
];
const btn = document.querySelector(".btn");
const quote = document.querySelector(".quote p");
const author = document.querySelector(".author h2");

btn.addEventListener("click", () => {
  const quoteText = quotes[parseInt(Math.random() * quotes.length)];

  quote.textContent = `"${quoteText.text}"`;
  author.textContent = `--${quoteText.author}`;
});
