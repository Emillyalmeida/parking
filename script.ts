const form: HTMLFormElement | null = document.querySelector("form");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
});
