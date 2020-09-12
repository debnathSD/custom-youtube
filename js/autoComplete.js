const inputField = document.getElementById("input");
const suggestionField = document.getElementById("suggestion");

let container = [];

/* @param callImmediate
 * type - bool
 * required - NO
 * optional - YES
 */
const debounce = (fn, delay, callImmediate) => {
  let timeout;
  return (...rest) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(context, rest), delay);
  };
};

const searchSuggestion = debounce((input) => {
  container.push(input);

  let filteredItems = container.filter((el) => {
    const searchRegex = new RegExp(`^${input}`, "gim");
    return el.match(searchRegex);
  });

  if (input.length === 0) {
    filteredItems = [];
    suggestionField.innerHTML = "";
  }
  console.log(filteredItems);
  showSuggestions(filteredItems);
}, 1000);

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

// Youtube api call
const youTubeApi = (searchText) => {
  console.log(`Hello YouTube: ${searchText}`);
};

inputField.addEventListener("input", () => searchSuggestion(inputField.value));
inputField.addEventListener("keydown", (e) => {
  if (inputField.value && e.keyCode === 13) {
    suggestionField.style.display = "none";
    youTubeApi(inputField.value);
  }
});
