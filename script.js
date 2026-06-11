//input functionality

const input = document.querySelector(".input");
input.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const query = input.value.trim();
    input.value = "";
    if (query) {
      container.innerHTML = "";
      await getImages(query);
    } else {
      await loadAllCategories();
    }
  }
});
//search button
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", async () => {
  container.innerHTML = "";
  const query = input.value.trim();
  input.value = "";
  if (query) {
    await getImages(query);
  }
});
//toggle theme
const toggle = document.getElementById("toggle");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("light-theme");
});
