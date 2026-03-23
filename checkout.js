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
        title.innerText = "Order Summary";
        cartList.appendChild(title);

        let total = 0;
        cart.forEach((product, index) => {
            total += product.price;
            let itemRow = document.createElement("div");
            itemRow.style.display = "flex";
            itemRow.style.justifyContent = "space-between";
            itemRow.style.marginBottom = "15px";
            itemRow.style.borderBottom = "1px solid #444";
            itemRow.style.paddingBottom = "10px";
            itemRow.style.alignItems = "center";

            itemRow.innerHTML = `
                <span>${product.name}</span>
                <span>${product.price} EGP</span>
                <button onclick="removeItem(${index})" style="background:#ff4d4d; color:white; border:none; border-radius:5px; padding:5px 10px; cursor:pointer">✕</button>
            `;
            cartList.appendChild(itemRow);
        });

        let totalDisplay = document.createElement("h2");
        totalDisplay.innerText = "Total: " + total + " EGP";
        totalDisplay.style.borderTop = "2px solid #4CAF50";
        totalDisplay.style.paddingTop = "10px";
        cartList.appendChild(totalDisplay);

        let form = document.createElement("form");
        form.style.width = "350px";
        form.style.display = "flex";
        form.style.flexDirection = "column";
        form.style.gap = "15px";

        let nameInput = document.createElement("input");
        nameInput.placeholder = "Full Name";
        nameInput.style.padding = "12px";
        nameInput.style.borderRadius = "5px";
        nameInput.style.border = "none";

        let addressInput = document.createElement("input");
        addressInput.placeholder = "Shipping Address";
        addressInput.style.padding = "12px";
        addressInput.style.borderRadius = "5px";
        addressInput.style.border = "none";

        let phoneInput = document.createElement("input");
        phoneInput.placeholder = "Phone Number";
        phoneInput.style.padding = "12px";
        phoneInput.style.borderRadius = "5px";
        phoneInput.style.border = "none";

        let promoInput = document.createElement("input");
        promoInput.placeholder = "Promo Code (SAVE10)";
        promoInput.style.padding = "12px";
        promoInput.style.borderRadius = "5px";
        promoInput.style.border = "none";

        let promoBtn = document.createElement("button");
        promoBtn.innerText = "Apply Discount";
        promoBtn.type = "button";
        promoBtn.style.padding = "10px";
        promoBtn.style.cursor = "pointer";
        promoBtn.style.borderRadius = "5px";
        promoBtn.style.border = "none";

        promoBtn.onclick = () => {
            if (promoInput.value === "SAVE10") {
                let discount = total * 0.10;
                totalDisplay.innerText = "Total: " + (total - discount) + " EGP (10% OFF)";
                totalDisplay.style.color = "#4CAF50";
                Swal.fire("Success", "10% Discount Applied!", "success");
            } else {
                Swal.fire("Error", "Invalid Promo Code", "error");
            }
        };

        let payBtn = document.createElement("button");
        payBtn.innerText = "Confirm Order";
        payBtn.style.backgroundColor = "#4CAF50";
        payBtn.style.color = "white";
        payBtn.style.padding = "15px";
        payBtn.style.border = "none";
        payBtn.style.borderRadius = "5px";
        payBtn.style.cursor = "pointer";
        payBtn.style.fontWeight = "bold";
        payBtn.style.fontSize = "16px";

        payBtn.onclick = (e) => {
            e.preventDefault();
            if (nameInput.value === "" || addressInput.value === "" || phoneInput.value === "") {
                Swal.fire("Wait!", "Please fill in all fields", "warning");
                return;
            }

            Swal.fire({
                title: 'Order Placed!',
                text: `Thanks ${nameInput.value}, we will contact you on ${phoneInput.value}`,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                localStorage.removeItem("myCart");
                window.location.href = "index.html";
            });
        };

        form.append(nameInput, addressInput, phoneInput, promoInput, promoBtn, payBtn);
        checkoutContainer.append(cartList, form);
    } else {
        checkoutContainer.innerHTML = `
            <div style="text-align:center">
                <h1>Your cart is empty</h1>
                <a href="index.html" style="color:#4CAF50; text-decoration:none; font-size:20px">← Back to Store</a>
            </div>
        `;
    }
}

window.removeItem = (index) => {
    cart.splice(index, 1);
    localStorage.setItem("myCart", JSON.stringify(cart));
    renderCheckout();
};

renderCheckout();