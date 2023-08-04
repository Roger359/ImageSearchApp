const searchInput = document.getElementById("search-input");
const form = document.querySelector("form");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more-btn");

/* unsplash access key */
const accessKey = "uVHBxNuySHs08_W4tAnIw5n3ab7B--yn-ARV6i9gxBE";

let inputData = "";
let page = 1;

console.log(inputData)

const searchImages = async () => {
  inputData = searchInput.value || 'dog';
 
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imagesWrapper = document.createElement("div");
    imagesWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imagesWrapper.appendChild(image);
    imagesWrapper.appendChild(imageLink);
    searchResults.appendChild(imagesWrapper);
  });

  page++;

  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;

  searchImages();
});

showMoreBtn.addEventListener('click', () => {
  searchImages()
})

async function init(){
  searchImages()
}

init()