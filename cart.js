
 document.addEventListener("DOMContentLoaded", function () {

    let кошик = JSON.parse(localStorage.getItem("cart")) || [];

    const контейнер = document.getElementById("cart-items");
    const total = document.getElementById("total");

    console.log("Кошик:", кошик);

    if (!контейнер || !total) return;

    контейнер.innerHTML = "";

    let сума = 0;

    кошик.forEach((товар, index) => {

        if (!товар) return;

        сума += товар.price;

        контейнер.innerHTML += `
        <div class="col-lg-3 col-md-6">
            <div class="card h-100 shadow-sm">
                <img src="${товар.image}" class="card-img-top">

                <div class="card-body text-center">
                    <h6>${товар.brand} ${товар.name}</h6>
                    <p>${товар.color}</p>
                    <h5>₴${товар.price}</h5>

                    <button class="btn btn-dark w-100"
    onclick="видалити(${index})">
    Видалити
</button>
                </div>
            </div>
        </div>
        `;
    });

    total.innerText = сума;

});


function видалити(index) {

    let кошик = JSON.parse(localStorage.getItem("cart")) || [];

    кошик.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(кошик));

    location.reload();
}

function очиститиКошик() {

    localStorage.removeItem("cart");

    location.reload();

}
function оформити(){

    let кошик = JSON.parse(localStorage.getItem("cart")) || [];

    if(кошик.length === 0){
        alert("Кошик порожній!");
        return;
    }


    let імʼя = document.querySelector('input[placeholder="Ваше ім\'я"]').value;
    let телефон = document.querySelector('input[type="tel"]').value;
    let email = document.querySelector('input[type="email"]').value;
    let адреса = document.querySelector('textarea').value;


    if(!імʼя || !телефон || !email || !адреса){

        alert("Заповніть всі поля!");
        return;

    }


    alert(
        "Дякуємо за замовлення, " + імʼя + "!\n\n" +
        "Ми зв'яжемося з вами найближчим часом."
    );


    localStorage.removeItem("cart");

    location.reload();

}