const handleAddToCart = () => {
    const productEl = document.getElementById('product-input');
    const quantityEl = document.getElementById('quantity-input');
    const product = productEl.value
    const quantity = quantityEl.value
    if (product === '' || quantity === '') {
        // const ul = document.getElementById('list-container');
        // ul.append('');
        return;
    }
    else {
        const li = document.createElement('li');
        li.innerHTML = `${product} : ${quantity}`;
        const ul = document.getElementById('list-container');
        ul.append(li);
    }
    productEl.value = '';
    quantityEl.value = '';
};
