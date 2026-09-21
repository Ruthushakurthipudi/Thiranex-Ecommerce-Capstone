
export function productCard(product) {
    return `
        <article class="product-card">
            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p>${product.category}</p>

            <div class="price">$${product.price.toFixed(2)}</div>

            <a class="btn" href="#/product/${product.id}">
                View Details
            </a>
        </article>
    `;
}

export function productsGrid(products) {
    if (products.length === 0) {
        return `<div class="empty">No products found.</div>`;
    }

    return `
        <div class="product-grid">
            ${products.map(productCard).join("")}
        </div>
    `;
}

export function productDetails(product) {
    return `
        <section class="details">
            <div>
                <img src="${product.image}" alt="${product.title}">
            </div>

            <div>
                <h1>${product.title}</h1>

                <p><strong>Category:</strong> ${product.category}</p>

                <div class="price">$${product.price.toFixed(2)}</div>

                <p>${product.description}</p>

                <p>
                    <strong>Rating:</strong>
                    ${product.rating?.rate || "Not available"}
                </p>

                <button class="btn" id="add-to-cart">
                    Add to Cart
                </button>

                <a href="#/products" class="btn">
                    Back to Products
                </a>
            </div>
        </section>
    `;
}

export function cartItem(product) {
    return `
        <div class="cart-item">
            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p class="price">$${product.price.toFixed(2)}</p>

            <button
                class="btn remove-item"
                data-id="${product.id}">
                Remove
            </button>
        </div>
    `;
}
