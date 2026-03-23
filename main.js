let products = [
  { name: "hoodie", price: 899, desc: "this a HBA-hoodie", img: "images/hoodie.png" },
  { name: "creatien", price: 750, desc: "this a LVL-creatien", img: "images/creatine.png" },
  { name: "jacket", price: 950, desc: "this a HBA-jacket", img: "images/jacket.png" },
  { name: "pre-workout", price: 1200, desc: "this a LVL-pre-workout", img: "images/preworkout.png" },
  { name: "pants", price: 1100, desc: "this a HBA-pants", img: "images/pants.png" },
  { name: "shirt", price: 550, desc: "this a HBA-shirt", img: "images/shirt.png" },
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

// تنسيق حاوية السلة (الأيقونة + النص)
cartCounter.style.display = "flex";
cartCounter.style.alignItems = "center";
cartCounter.style.gap = "8px";
cartCounter.style.color = "white";
cartCounter.style.fontWeight = "bold";
cartCounter.style.cursor = "pointer";

let cartIcon = document.createElement("i");
cartIcon.className = "fas fa-shopping-cart";
cartIcon.style.fontSize = "18px";

let cartText = document.createElement("span");
cartText.innerText = "Cart: " + cart.length;

cartCounter.append(cartIcon, cartText);
nav.appendChild(cartCounter);

cartCounter.onclick = () => {
    window.location.href = "checkout.html";
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
    card.style.width = "220px";
    card.style.backgroundColor = "#444";
    card.style.padding = "15px";
    card.style.borderRadius = "10px";
    card.style.color = "white";
    card.style.textAlign = "center";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.justifyContent = "space-between";
    card.style.transition = "transform 0.3s";

    // تأثير عند الوقوف على الكارت
    card.onmouseover = () => card.style.transform = "scale(1.05)";
    card.onmouseout = () => card.style.transform = "scale(1)";

    let title = document.createElement("h3");
    title.innerText = p.name;
    title.style.textTransform = "capitalize";

    let priceTag = document.createElement("p");
    priceTag.innerText = p.price + " EGP";
    priceTag.style.color = "#4CAF50";
    priceTag.style.fontWeight = "bold";
    priceTag.style.fontSize = "18px";
    priceTag.style.margin = "5px 0";

    let img = document.createElement("img");
    img.src = p.img;
    img.style.width = "100%";
    img.style.height = "150px";
    img.style.objectFit = "contain";

    let btn = document.createElement("button");
    btn.innerText = "Add to Cart";
    btn.style.marginTop = "10px";
    btn.style.cursor = "pointer";
    btn.style.padding = "10px";
    btn.style.fontWeight = "bold";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.backgroundColor = "#eee";

    btn.onclick = () => {
      cart.push(p);
      localStorage.setItem("myCart", JSON.stringify(cart));
      cartText.innerText = "Cart: " + cart.length;
      
      btn.innerText = "Added ✓";
      btn.style.backgroundColor = "#4CAF50";
      btn.style.color = "white";
      setTimeout(() => {
        btn.innerText = "Add to Cart";
        btn.style.backgroundColor = "#eee";
        btn.style.color = "black";
      }, 1000);
    };

    card.append(title, priceTag, img, btn);
    container.appendChild(card);
  });
}

searchInput.oninput = (e) => displayProducts(e.target.value);

displayProducts();