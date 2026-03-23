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

        // حساب الإجمالي الأصلي
        let total = 0;

        cart.forEach((product, index) => {
            total += product.price; // جمع الأسعار
            let itemRow = document.createElement("div");
            itemRow.style.display = "flex";
            itemRow.style.justifyContent = "space-between";
            itemRow.style.marginBottom = "15px";
            itemRow.style.borderBottom = "1px solid #444";
            itemRow.style.paddingBottom = "10px";

            itemRow.innerHTML = `
                <span>${product.name}</span>
                <span>${product.price} EGP</span>
                <button onclick="removeItem(${index})" style="background:red; color:white; border:none; border-radius:3px; cursor:pointer">✕</button>
            `;
            cartList.appendChild(itemRow);
        });

        let totalDisplay = document.createElement("h2");
        totalDisplay.id = "totalAmount";
        totalDisplay.innerText = "Total: " + total + " EGP";
        totalDisplay.style.borderTop = "2px solid #4CAF50";
        totalDisplay.style.paddingTop = "10px";
        cartList.appendChild(totalDisplay);

        checkoutContainer.appendChild(cartList);

        // فورم البيانات والخصم
        let form = document.createElement("form");
        form.style.width = "350px";
        form.style.display = "flex";
        form.style.flexDirection = "column";
        form.style.gap = "15px";

        let promoInput = document.createElement("input");
        promoInput.placeholder = "Promo Code (SAVE10)";
        promoInput.style.padding = "10px";

        let promoBtn = document.createElement("button");
        promoBtn.innerText = "Apply Discount";
        promoBtn.type = "button";
        promoBtn.onclick = () => {
            if (promoInput.value === "SAVE10") {
                let discount = total * 0.10;
                totalDisplay.innerText = "Total: " + (total - discount) + " EGP (10% OFF)";
                totalDisplay.style.color = "#4CAF50";
                alert("Discount Applied!");
            }
        };

        let payBtn = document.createElement("button");
        payBtn.innerText = "Confirm Order";
        payBtn.style.backgroundColor = "#4CAF50";
        payBtn.style.color = "white";
        payBtn.style.padding = "15px";
        payBtn.style.border = "none";
        payBtn.style.cursor = "pointer";

        form.append(promoInput, promoBtn, payBtn);
        checkoutContainer.appendChild(form);
    } else {
        checkoutContainer.innerHTML = "<h1>Cart is empty</h1>";
    }
}

window.removeItem = (index) => {
    cart.splice(index, 1);
    localStorage.setItem("myCart", JSON.stringify(cart));
    renderCheckout();
};

renderCheckout();