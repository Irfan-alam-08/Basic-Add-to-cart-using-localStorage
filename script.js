// getting cart data from localStorage
const getCartFromLocalStorage = () => {

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        return JSON.parse(storedCart);
    }

    return [];
};


// saving cart data to localStorage
const saveCartToLocalStorage = (cart) => {

    const cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);

};


// displaying cart items on UI after page reload
const displayCartItems = () => {

    const cart = getCartFromLocalStorage();
    const ul = document.getElementById('list-container');

    ul.innerHTML = '';

    for (const item of cart) {
        const li = document.createElement('li');

        // storing custom data
        li.dataset.product = item.product;
        li.dataset.quantity = item.quantity;

        // showing data in UI
        li.innerHTML =
            `${item.product} : ${item.quantity} <button onclick="handleRemoveFromCart('${item.product}')"><i class="fa-solid fa-x"></i></button>`;

        ul.append(li);
    }
};


// add to cart function
const handleAddToCart = () => {

    const productEl =
        document.getElementById('product-input');

    const quantityEl =
        document.getElementById('quantity-input');

    const product = productEl.value.trim().toLowerCase();
    const quantity = Number(quantityEl.value);

    const ul = document.getElementById('list-container');

    // validation
    if (product === '' || quantityEl.value === '') {
        return;
    }

    // getting cart from localStorage
    const cart = getCartFromLocalStorage();

    // checking existing item in UI
    const existingItem = document.querySelector(
        `[data-product="${product}"]`
    );

    // checking existing item in localStorage
    const existingProduct = cart.find(
        item => item.product === product
    );

    // if item already exists
    if (existingItem) {

        // previous quantity
        const currentQuantity =
            Number(existingItem.dataset.quantity);

        // updated quantity
        const updatedQuantity =
            currentQuantity + quantity;

        // updating dataset
        existingItem.dataset.quantity =
            updatedQuantity;

        // updating UI
        existingItem.innerHTML =
            `${product} : ${updatedQuantity}
                <button onclick="handleRemoveFromCart('${product}')">
                        <i class="fa-solid fa-x"></i>
                </button>`;

        // updating localStorage
        existingProduct.quantity =
            updatedQuantity;
    }

    // if item does not exist
    else {

        const li =
            document.createElement('li');

        // storing custom data
        li.dataset.product = product;
        li.dataset.quantity = quantity;

        // showing in UI
        li.innerHTML =
            `${product} : ${quantity} <button onclick="handleRemoveFromCart('${product}')"><i class="fa-solid fa-x"></i></button>`;

        ul.append(li);

        // adding new item to localStorage
        cart.push({
            product: product,
            quantity: quantity
        });
    }

    // saving updated cart
    saveCartToLocalStorage(cart);

    // clearing inputs
    productEl.value = '';
    quantityEl.value = '';
};
const handleRemoveFromCart = (product) => {

    const cart = getCartFromLocalStorage();

    // Remove the item from the cart
    const updatedCart = cart.filter(item => item.product !== product);

    // Save the updated cart to localStorage
    saveCartToLocalStorage(updatedCart);

    // Update the UI
    displayCartItems();

};
