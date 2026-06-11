const accessKey = "uqonqguV7nMO0GSM3m9NbbClQgcMzXM1KbiW3VbPYdM";
const container = document.querySelector(".gallery");
const count = document.querySelector(".count");
let allImages = [];
let currentIndex = 0;
const favourites = [];
async function getImages(query) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`,
  );
  const data = await res.json();
  allImages = data.results;
  data.results.forEach((img) => {
    allImages.push(img);
    const imageIndex = allImages.length - 1;
    const wrapper = document.createElement("div");
    wrapper.classList.add("image-card");
    //heart icon
    const heart = document.createElement("i");
    heart.classList.add("fa-regular", "fa-heart", "heart-icon");
    heart.addEventListener("click", () => {
      heart.classList.toggle("fa-solid");
      heart.classList.toggle("fa-regular");

      if (heart.classList.contains("fa-solid")) {
        if (!favourites.includes(img.urls.small)) {
          favourites.push(img.urls.small);
        }
      } else {
        const index = favourites.indexOf(img.urls.small);
        if (index > -1) {
          favourites.splice(index, 1);
        }
      }
      updateCount();
    });
    wrapper.appendChild(heart);
    //image
    const image = document.createElement("img");
    image.src = img.urls.small;
    image.addEventListener("click", () => {
      currentIndex = imageIndex;
      viewerImg.src = allImages[currentIndex].urls.regular;
      imageViewer.classList.add("active");
    });
    wrapper.appendChild(image);
    container.appendChild(wrapper);
  });
  count.textContent = container.children.length;
}

async function loadAllCategories() {
  container.innerHTML = "";

  const categories = [
    "nature",
    "mountains",
    "waterfalls",
    "animals",
    "cars",
    "architecture",
    "people",
  ];
  for (const category of categories) {
    await getImages(category);
  }
}
loadAllCategories();

const categoryItems = document.querySelectorAll(".categories li");
categoryItems.forEach((item) => {
  item.addEventListener("click", async () => {
    const query = item.dataset.category;
    container.innerHTML = "";
    if (query === "all") {
      await loadAllCategories();
    } else {
      await getImages(query);
    }
  });
});
//wishlist images
const wishContainer = document.querySelector(".wish-container");
const wishBox = document.querySelector("#wish-image");
wishContainer.addEventListener("click", (e) => {
  e.stopPropagation();
  wishBox.classList.toggle("active");
  wishBox.innerHTML = "<h3>Favourite Images ❤️</h3>";
  favourites.forEach((src) => {
    const image = document.createElement("img");
    image.src = src;
    wishBox.appendChild(image);
  });
  updateCount();
});
wishBox.addEventListener("click", (e) => {
  e.stopPropagation();
});
document.addEventListener("click", () => {
  wishBox.classList.remove("active");
});
//wishcount
function updateCount() {
  const counter = document.querySelector(".counter");

  if (favourites.length > 0) {
    counter.textContent = favourites.length;
    counter.style.display = "block";
  } else {
    counter.style.display = "none";
  }
}
//images
const imageViewer = document.querySelector(".image-viewer");
const viewerImg = document.querySelector(".viewer-img");
const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

closeBtn.addEventListener("click", () => {
  imageViewer.classList.remove("active");
});
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= allImages.length) {
    currentIndex = 0;
  }

  viewerImg.src = allImages[currentIndex].urls.regular;
});
prevBtn.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = allImages.length - 1;
  }
  viewerImg.src = allImages[currentIndex].urls.regular;
});
