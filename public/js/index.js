const socket = io()

socket.on("lista_productos", (data) => {
    let form = document.getElementById("form-real-time");
    let element = "";
    data.forEach((product) => {
        element += `
      <ul class="producto">
      <li class="idTitle">${product.id}</li>
      <li><strong>${product.title}</strong></li>
      <li>${product.description}</li>
      <li>$ ${product.price}</li>
      <li>${product.stock}</li>
      <li>${product.category}</li>
      <li>${product.code}</li>
    </ul>`;
    });
    form.innerHTML = element;
});
