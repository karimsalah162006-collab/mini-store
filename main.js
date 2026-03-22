let products = [
  { name: "hoodie", desc: "this a HBA-hoodie", img: "images/hoodie.png" },
  {
    name: "creatien",
    desc: "this a LVL-creatien",
    img: "images/creatine.png",
  },
  { name: "jacket", desc: "this a HBA-jacket", img: "images/jacket.png" },
  {
    name: "pre-workout",
    desc: "this a LVL-pre-workout",
    img: "images/preworkout.png",
  },
  { name: "pants", desc: "this a HBA-pants", img: "images/pants.png" },
  { name: "shirt", desc: "this a HBA-shirt", img: "images/shirt.png" },
];

let cart = JSON.parse(localStorage.getItem("myCart")) || [];
let nav = document.createElement("nav");
let searchInput = document.createElement("input");
let cartCounter = document.createElement("div");
let container = document.createElement("div");

document.body.appendChild(nav);
document.body.appendChild(container);
document.body.style.margin = "0";
document.body.style.backgroundColor = "#222";
document.body.style.fontFamily = "Arial";

nav.style.display = "flex";
nav.style.justifyContent = "space-between";
nav.style.alignItems = "center";
nav.style.padding = "15px 30px";
nav.style.backgroundColor = "#111";
nav.style.position = "sticky";
nav.style.top = "0";
nav.style.zIndex = "100";

searchInput.placeholder = "Search products...";
searchInput.style.padding = "8px 15px";
searchInput.style.borderRadius = "20px";
searchInput.style.border = "none";
searchInput.style.width = "250px";
nav.appendChild(searchInput);

cartCounter.innerText = "Cart: "+cart.length;
cartCounter.style.color = "white";
cartCounter.style.fontWeight = "bold";
nav.appendChild(cartCounter);
cartCounter.style.cursor = "pointer";
cartCounter.onclick = ()=>{
  window.location.href =
  "checkout.html";
};

container.style.display = "flex";
container.style.flexWrap = "wrap";
container.style.justifyContent = "center";
container.style.gap = "20px";
container.style.padding = "30px";

function displayProducts(filterText = "") {
  container.innerHTML = "";
  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  filtered.forEach((p) => {
    let card = document.createElement("div");
    card.style.width = "200px";
    card.style.backgroundColor = "#444";
    card.style.padding = "15px";
    card.style.borderRadius = "10px";
    card.style.color = "white";
    card.style.textAlign = "center";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.justifyContent = "space-between";

    let title = document.createElement("h3");
    title.innerText = p.name;

    let img = document.createElement("img");
    img.src = p.img;
    img.style.width = "100%";
    img.style.height = "150px";
    img.style.objectFit = "contain";

    let btn = document.createElement("button");
    btn.innerText = "Add to Cart";
    btn.style.marginTop = "10px";
    btn.style.cursor = "pointer";
    btn.style.padding = "8px";
    btn.style.fontWeight = "bold";

    btn.onclick = () => {
      count++;
      cartCounter.innerText = "Cart: " + count;
      btn.innerText = "Added ✓";
      btn.style.backgroundColor = "#4CAF50";
      setTimeout(() => {
        btn.innerText = "Add to Cart";
        btn.style.backgroundColor = "";
      }, 1000);
    };

    card.append(title, img, btn);
    container.appendChild(card);
  });
}

searchInput.oninput = (e) => displayProducts(e.target.value);

displayProducts();

