var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("productDesc");
var searchBar = document.getElementById("searchBar");
var updateDone = document.getElementById("updateDone");
var updateCancel = document.getElementById("updateCancel");
var addProductBtn = document.querySelector("button[onclick='addProduct()']");

var productList = [];
var editingIndex = null;

function addProduct() {
    var product = {
        index: productList.length + 1,
        name: productName.value,
        price: productPrice.value,
        model: productModel.value,
        desc: productDesc.value,
    };
    productList.push(product);
    displayProduct(productList);
    clearInputs();
}

function displayProduct(products) {
    var cartona = ``;
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        cartona += `
        <tr>
            <td>${product.index}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.model}</td>
            <td>${product.desc}</td>
            <td><button class="btn btn-secondary btn-sm" onclick="startUpdate(${product.index})">Update</button></td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.index})">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tBody").innerHTML = cartona;
}

function clearInputs() {
    productName.value = '';
    productPrice.value = '';
    productModel.value = '';
    productDesc.value = '';
}

function startUpdate(index) {
    var product = productList.find(p => p.index === index);
    if (product) {
        productName.value = product.name;
        productPrice.value = product.price;
        productModel.value = product.model;
        productDesc.value = product.desc;
        editingIndex = index;
        addProductBtn.classList.add("d-none"); // Hide Add Product button
        updateDone.classList.remove("d-none");
        updateCancel.classList.remove("d-none");
    }
}

function updateProductDone() {
    var product = productList.find(p => p.index === editingIndex);
    if (product) {
        product.name = productName.value;
        product.price = productPrice.value;
        product.model = productModel.value;
        product.desc = productDesc.value;
        displayProduct(productList);
        clearInputs();
        editingIndex = null;
        addProductBtn.classList.remove("d-none"); // Show Add Product button
        updateDone.classList.add("d-none");
        updateCancel.classList.add("d-none");
    }
}

function updateProductCancel() {
    clearInputs();
    editingIndex = null;
    addProductBtn.classList.remove("d-none"); // Show Add Product button
    updateDone.classList.add("d-none");
    updateCancel.classList.add("d-none");
}

function deleteProduct(index) {
    productList = productList.filter(p => p.index !== index);
    displayProduct(productList);
}

function searchProduct() {
    var searchText = searchBar.value.toLowerCase();
    var filteredProducts = productList.filter(product => 
        product.name.toLowerCase().includes(searchText) ||
        product.price.toString().includes(searchText) ||
        product.model.toLowerCase().includes(searchText) ||
        product.desc.toLowerCase().includes(searchText)
    );
    displayProduct(filteredProducts);
}
