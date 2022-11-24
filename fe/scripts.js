let productList = [];
let carrito = [];
let total = 0;
let order = {
  items: [],
};

function add(productId, price) {
  const product = productList.find((p) => p.id === productId);
  product.stock--;

  order.items.push(productList.find((p) => p.id === productId));

  console.log(productId, price);
  carrito.push(productId);
  total = total + price;
 document.getElementById("checkout").innerHTML = `Carrito $${total}`;
  displayProducts();
}

/**
 * Funciones del formulario order
 */
async function showOrder() {
  document.getElementById("all-products").style.display = "none";
  document.getElementById("order").style.display = "block";

  document.getElementById("order-total").innerHTML = `$${total}`;

  let productsHTML = `
    <tr>
        <th>Cantidad</th>
        <th>Detalle</th>
        <th>Subtotal</th>
    </tr>`;
  order.items.forEach((p) => {
    productsHTML += `<tr>
            <td>1</td>
            <td>${p.name}</td>
            <td>$${p.price}</td>
        </tr>`;
  });
  document.getElementById("order-table").innerHTML = productsHTML;
}


/**Función para agregar los articulos al carrito */
async function pay() {
  try { /**función del formulario de order */
    order.shipping = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      addressLine1: document.getElementById("addressLine1").value,
      addressLine2: document.getElementById("addressLine2").value,
      city: document.getElementById("city").value,
      postalCode: document.getElementById("postalCode").value,
      state: document.getElementById("state").value,
      country: document.getElementById("country").value,
    };

    const preference = await (
      await fetch("/api/pay", {
        method: "post",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    /**Script de mercadopago */
    var script = document.createElement("script");
    // The source domain must be completed according to the site for which you are integrating.
    // For example: for Argentina ".com.ar" or for Brazil ".com.br".
    script.src =
      "https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference.preferenceId;
    script.setAttribute("data-button-label", "Pagar con Mercado Pago");
    document.getElementById("order-actions").innerHTML = "";
    document.querySelector("#order-actions").appendChild(script);

    document.getElementById("name").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("phone").disabled = true;
    document.getElementById("addressLine1").disabled = true;
    document.getElementById("addressLine2").disabled = true;
    document.getElementById("city").disabled = true;
    document.getElementById("postalCode").disabled = true;
    document.getElementById("state").disabled = true;
    document.getElementById("country").disabled = true;
  }catch {
    window.alert("Sin stock"); /**Permite indicar que no hay Stock */ 
  }

  /**Permite vaciar el carrito cuando se hacen simultaneas compras y no hay stock */
  carrito = [];
  total = 0;
  order = {
    items: [],
  };
  //await fetchProducts();
  document.getElementById("checkout").innerHTML = `Carrito $${total}`;
}

//----- funcion de los productos (order)
function displayProducts() {
  document.getElementById("all-products").style.display = "block";
  document.getElementById("order").style.display = "none";

  /**Tags de productos. */
  const gym = productList.filter((p) => p.category === "gym");
  displayProductsByType(gym, "product-cards-gym");

  const car = productList.filter((p) => p.category === "car");
  displayProductsByType(car, "product-cards-car");

  const pc = productList.filter((p) => p.category === "pc");
  displayProductsByType(pc, "product-cards-pc");

  const cocina = productList.filter((p) => p.category === "cocina");
  displayProductsByType(cocina, "product-cards-cocina");
}
/**Esta función va a iterar por cada uno de los productos creados en Index.html y va a generar el HTML */

function displayProductsByType(productsByType, tagId) {
  let productsHTML = "";
  productsByType.forEach((p) => {
    let buttonHTML = `<button class="button-add" onclick="add(${p.id}, ${p.price})">Agregar</button>`;
/**Este If permite deshabilitar el botón para agregar al carrito cuando no hay stock */
    if (p.stock <= 0) {
      buttonHTML = `<button disabled class="button-add disabled" onclick="add(${p.id}, ${p.price})">Sin stock</button>`;
    }

    productsHTML += `<div class="product-container">
            <h3>${p.name}</h3>
            <img src="${p.image}" />
            <h1>$${p.price}</h1>
            ${buttonHTML}
        </div>`;
  });
  document.getElementById(tagId).innerHTML = productsHTML;
}

/**
 * Este Fetch permite que si existe un error se redibuje la pagina
 */

async function fetchProducts() {
  productList = await (await fetch("/api/products")).json();
  displayProducts();
}
/** Se llama cuando la ventana se termina de cargar */

window.onload = async () => {
  await fetchProducts();
};
