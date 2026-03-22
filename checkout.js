let cart = JSON.parse(localStorage.getItem("myCart")) || [];

let checkoutContainer = document.createElement("div");
document.body.appendChild(checkoutContainer);

document.body.style.backgroundColor = "#222";
document.body.style.color = "white";
document.body.style.fontFamily = "Arial";

function renderCheckout() {
  checkoutContainer.innerHTML = "";
  checkoutContainer.style.display = "flex";
  checkoutContainer.style.justifyContent = "center";
  checkoutContainer.style.padding = "50px";
  checkoutContainer.style.flexWrap = "wrap";
  checkoutContainer.style.gap = "40px";

  if (cart.length > 0) {
    let cartList = document.createElement("div");
    cartList.style.width = "400px";
    cartList.style.backgroundColor = "#333";
    cartList.style.padding = "30px";
    cartList.style.borderRadius = "15px";

    let title = document.createElement("h1");
    title.innerText = "Your Cart Items";
    title.style.margin = "0 0 30px 0";
    cartList.appendChild(title);

    cart.forEach((product, index) => {
      let itemRow = document.createElement("div");
      itemRow.style.display = "flex";
      itemRow.style.alignItems = "center";
      itemRow.style.justifyContent = "space-between";
      itemRow.style.marginBottom = "20px";
      itemRow.style.borderBottom = "1px solid #444";
      itemRow.style.paddingBottom = "10px";

      let infoDiv = document.createElement("div");
      infoDiv.style.display = "flex";
      infoDiv.style.alignItems = "center";
      infoDiv.style.gap = "15px";

      let img = document.createElement("img");
      img.src = product.img;
      img.style.width = "50px";
      img.style.height = "50px";
      img.style.objectFit = "contain";

      let name = document.createElement("span");
      name.innerText = product.name;

      infoDiv.append(img, name);

      let deleteBtn = document.createElement("button");
      deleteBtn.innerText = "✕";
      deleteBtn.style.backgroundColor = "#ff4444";
      deleteBtn.style.color = "white";
      deleteBtn.style.border = "none";
      deleteBtn.style.borderRadius = "5px";
      deleteBtn.style.padding = "5px 10px";
      deleteBtn.style.cursor = "pointer";

      deleteBtn.onclick = () => {
        cart.splice(index, 1);
        localStorage.setItem("myCart", JSON.stringify(cart));
        renderCheckout();
      };

      itemRow.append(infoDiv, deleteBtn);
      cartList.appendChild(itemRow);
    });

    checkoutContainer.appendChild(cartList);

    let checkoutForm = document.createElement("form");
    checkoutForm.style.width = "400px";
    checkoutForm.style.backgroundColor = "#444";
    checkoutForm.style.padding = "30px";
    checkoutForm.style.borderRadius = "15px";
    checkoutForm.style.display = "flex";
    checkoutForm.style.flexDirection = "column";
    checkoutForm.style.gap = "15px";

    let formTitle = document.createElement("h2");
    formTitle.innerText = "Shipping Details";

    function createInput(placeholder, type = "text") {
      let input = document.createElement("input");
      input.type = type;
      input.placeholder = placeholder;
      input.style.padding = "12px";
      input.style.borderRadius = "5px";
      input.style.border = "none";
      input.required = true;
      return input;
    }

    let nameInput = createInput("Your Full Name");
    let addressInput = createInput("Shipping Address");
    let phoneInput = createInput("Phone Number", "tel");

    let payBtn = document.createElement("button");
    payBtn.innerText = "Confirm Order (" + cart.length + " Items)";
    payBtn.style.padding = "15px";
    payBtn.style.cursor = "pointer";
    payBtn.style.backgroundColor = "#4CAF50";
    payBtn.style.color = "white";
    payBtn.style.border = "none";
    payBtn.style.fontWeight = "bold";
    payBtn.style.borderRadius = "5px";

    checkoutForm.onsubmit = (e) => {
      e.preventDefault();
      alert("Success! Your " + cart.length + " items are being prepared.");
      localStorage.removeItem("myCart");
      window.location.href = "index.html";
    };

    checkoutForm.append(formTitle, nameInput, addressInput, phoneInput, payBtn);
    checkoutContainer.appendChild(checkoutForm);
  } else {
    checkoutContainer.innerHTML =
      "<div style='text-align:center;'><h1>Your cart is empty!</h1><a href='index.html' style='color:#4CAF50;'>Go back to shopping</a></div>";
  }
}

renderCheckout();

