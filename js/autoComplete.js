const inputField = document.getElementById("input");
const suggestionField = document.getElementById("suggestion");

let container = [];

const searchSuggestion = (input) => {
  container.push(input);

  let filteredItems = container.filter((el) => {
    const searchRegex = new RegExp(`^${input}`, "gim");
    return el.match(searchRegex);
  });

  if (input.length === 0) {
    filteredItems = [];
    suggestionField.innerHTML = "";
  }
  showSuggestions(filteredItems);
};

const showSuggestions = (items) => {
  if (items.length > 0) {
    suggestionField.style.display = "block";
    const html = items
      .map(
        (item) => `
            <div id="results" class="show-suggestion" style="display: block !important;" onclick=changeInputField("${item}")>${item}</div>
      `
      )
      .join("");
    suggestionField.innerHTML = html;
  }
};

const changeInputField = (entryFragger) => {
  inputField.value = entryFragger;
  suggestionField.style.display = "none";
};

inputField.addEventListener("input", () => searchSuggestion(inputField.value));
