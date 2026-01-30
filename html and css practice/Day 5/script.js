const images = [];
const gallery = document.getElementById("gallery");

document.getElementById("imgForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const url = document.getElementById("imgUrl").value;
  const title = document.getElementById("imgTitle").value;
  const category = document.getElementById("imgCategory").value;

  if (url === "" || title === "" || category === "") {
    alert("Please fill all fields");
    return;
  }

  images.push({ url, title, category });
  displayImages(images);

  this.reset();
});

function displayImages(list) {
  gallery.innerHTML = "";

  list.forEach(img => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${img.url}">
      <h4>${img.title}</h4>
      <p>${img.category}</p>
    `;

    gallery.appendChild(card);
  });
}

function filterImages(cat) {
  if (cat === "All") {
    displayImages(images);
  } else {
    const filtered = images.filter(img => img.category === cat);
    displayImages(filtered);
  }
}