let товари = [];

async function завантажитиТовари() {

    const відповідь = await fetch("./products.json");
    товари = await відповідь.json();

    показатиТовари(товари);

}
function очиститиБлоки() {

    const блоки = [
        "raf-sneakers",
        "raf-hoodies",
        "raf-tshirts",
        "raf-pants",
        "raf-jackets",

        "rick-sneakers",
        "rick-hoodies",
        "rick-tshirts",
        "rick-pants",
        "rick-jackets"
    ];

    блоки.forEach(id => {

        const контейнер = document.getElementById(id);

        if (контейнер) {
            контейнер.innerHTML = "";
        }

    });

}
function показатиТовари(масив) {

    очиститиБлоки();

    масив.forEach(товар => {

        let блок = `${товар.brand}-${товар.category}`
            .toLowerCase()
            .replace(" ", "-")
            .replace(" ", "")
            .replace("t-shirt", "tshirts")
            .replace("hoodie", "hoodies")
            .replace("pants", "pants")
            .replace("jacket", "jackets")
            .replace("sneakers", "sneakers");

        блок = блок
            .replace("raf-simons-", "raf-")
            .replace("rick-owens-", "rick-");

        const контейнер = document.getElementById(блок);

        if (!контейнер) return;

        контейнер.innerHTML += `
        <div class="col-lg-3 col-md-6">
            <div class="card h-100 shadow-sm">

                <a href="product.html?id=${товар.id}">
                    <img src="${товар.image}" class="card-img-top">
                </a>

                <div class="card-body text-center">

                    <h6 class="fw-bold">
                        <a href="product.html?id=${товар.id}" class="text-dark text-decoration-none">
                            ${товар.brand} ${товар.name}
                        </a>
                    </h6>

                    <p>${товар.color}</p>

                    <h5>₴${товар.price}</h5>

                    <button class="btn btn-dark w-100"
                    onclick="додатиВКошик(${товар.id})">
                        Купити
                    </button>

                </div>
            </div>
        </div>`;
    });

}
function очиститиБлоки(){

    document.querySelectorAll(".row").forEach(row=>{
        if(row.id){
            row.innerHTML="";
        }
    });

}
function додатиВКошик(id) {

    const товар = товари.find(t => t.id == id);

    if (!товар) return;

    let кошик = JSON.parse(localStorage.getItem("cart")) || [];

    кошик.push(товар);

    localStorage.setItem("cart", JSON.stringify(кошик));

    оновитиКошик();
    показатиПовідомлення();

}
document.addEventListener("DOMContentLoaded", async () => {

    await завантажитиТовари();

    const пошук = document.getElementById("search");

    if (!пошук) return;

    пошук.addEventListener("input", function () {

        const текст = this.value.toLowerCase();

        const результат = товари.filter(товар =>

            товар.brand.toLowerCase().includes(текст) ||
            товар.name.toLowerCase().includes(текст) ||
            товар.category.toLowerCase().includes(текст)

        );
        показатиТовари(результат);
    });
});
function оновитиКошик() {

    const badge = document.getElementById("cart-count");

    if (!badge) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    badge.innerText = cart.length;

}

оновитиКошик();


