let товар;

async function завантажитиТовар() {

    const відповідь = await fetch("./products.json");
    const товари = await відповідь.json();

    const параметри = new URLSearchParams(window.location.search);
    const id = параметри.get("id");

    товар = товари.find(t => t.id == id);

    if (!товар) {
        document.body.innerHTML = "<h1>Товар не знайдено</h1>";
        return;
    }

    показатиТовар();
}
function показатиТовар() {

    document.getElementById("product-image").src = товар.image;

    document.getElementById("product-name").innerHTML =
    товар.brand + " " + товар.name;

    document.getElementById("product-price").innerHTML =
    "₴" + товар.price;

    const sizes = document.getElementById("sizes");

    let розміри;


if (товар.category === "Sneakers") {
    розміри = [
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45"
    ];
}


if (товар.category === "Hoodie" || товар.category === "T-Shirt" || товар.category === "Jacket") {
    розміри = [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ];
}


if (товар.category === "Pants") {
    розміри = [
        "28",
        "30",
        "32",
        "34",
        "36",
        "38"
    ];
}

    sizes.innerHTML = "";

    розміри.forEach(size => {

        sizes.innerHTML += `
<button class="btn btn-outline-dark size-btn">
    ${size}
</button>
`;
    });

document.querySelectorAll(".size-btn").forEach(btn => {

    btn.onclick = function(){

        document.querySelectorAll(".size-btn")
        .forEach(b => b.classList.remove("active"));

        this.classList.add("active");

    };

});
}

document.getElementById("buy-button").onclick = function(){

    let вибранийРозмір = document.querySelector("#sizes .active");

    if(!вибранийРозмір){
        показатиПовідомлення("❗ Спочатку виберіть розмір");
return;
    }

    let товарЗРозміром = {
        ...товар,
        size: вибранийРозмір.innerText
    };

    let кошик = JSON.parse(localStorage.getItem("cart")) || [];

    кошик.push(товарЗРозміром);

    localStorage.setItem("cart", JSON.stringify(кошик));

    показатиПовідомлення();

};
завантажитиТовар();
function показатиПовідомлення(текст = "✔ Товар успішно додано до кошика") {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.innerText = текст;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
