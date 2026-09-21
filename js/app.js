
import {
    getProducts,
    getProductById,
    getCategories
} from "./api.js";

import {
    getRoute
} from "./router.js";

import {
    productsGrid,
    productDetails,
    cartItem
} from "./components.js";

const app = document.getElementById("app");
const cartCount = document.getElementById("cart-count");

let products = [];
let categories = [];

let cart = JSON.parse(localStorage.getItem("shopsphere-cart")) || [];

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function saveCart() {
    localStorage.setItem(
        "shopsphere-cart",
        JSON.stringify(cart)
    );

    updateCartCount();
}

function addToCart(product) {
    const alreadyAdded = cart.some(
        item => item.id === product.id
    );

    if (!alreadyAdded) {
        cart.push(product);
        saveCart();
        alert("Product added to cart!");
    } else {
        alert("Product is already in your cart.");
    }
}

function removeFromCart(id) {
    cart = cart.filter(product => product.id !== id);
    saveCart();
    renderCart();
}

function renderHome() {
    app.innerHTML = `
        <section class="hero">
            <h1>Welcome to ShopSphere</h1>

            <p>
                Discover products from our online catalog.
            </p>

            <a href="#/products" class="btn">
                Explore Products
            </a>
        </section>
    `;
}

function renderProducts() {
    app.innerHTML = `
        <h1 class="section-title">All Products</h1>

        <div class="filters">
            <input
                type="text"
                id="search"
                placeholder="Search products..."
            >

            <select id="category">
                <option value="all">All Categories</option>

                ${categories.map(category => `
                    <option value="${category}">
                        ${category}
                    </option>
                `).join("")}
            </select>
        </div>

        <div id="products-container">
            ${productsGrid(products)}
        </div>
    `;

    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category");

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;

        const filtered = products.filter(product => {
            const matchesSearch =
                product.title.toLowerCase()
                    .includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        document.getElementById("products-container")
            .innerHTML = productsGrid(filtered);
    }

    searchInput.addEventListener("input", filterProducts);
    categorySelect.addEventListener("change", filterProducts);
}

async function renderDetails(id) {
    app.innerHTML = `<div class="loading">Loading details...</div>`;

    try {
        const product = await getProductById(id);

        app.innerHTML = productDetails(product);

        document.getElementById("add-to-cart")
            .addEventListener("click", () => {
                addToCart(product);
            });

    } catch (error) {
        app.innerHTML = `
            <div class="error">
                Unable to load product details.
            </div>
        `;
    }
}

function renderCart() {
    if (cart.length === 0) {
        app.innerHTML = `
            <div class="empty">
                <h2>Your cart is empty</h2>
                <a href="#/products" class="btn">
                    Browse Products
                </a>
            </div>
        `;

        return;
    }

    const total = cart.reduce(
        (sum, product) => sum + product.price,
        0
    );

    app.innerHTML = `
        <h1 class="section-title">Shopping Cart</h1>

        <div>
            ${cart.map(cartItem).join("")}
        </div>

        <div class="cart-total">
            <h2>Total: $${total.toFixed(2)}</h2>
            <button class="btn" id="checkout">
                Checkout
            </button>
        </div>
    `;

    document.querySelectorAll(".remove-item")
        .forEach(button => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);
                removeFromCart(id);
            });
        });

    document.getElementById("checkout")
        .addEventListener("click", () => {
            alert("Checkout demonstration only.");
        });
}

function renderNotFound() {
    app.innerHTML = `
        <div class="error">
            <h2>404 - Page Not Found</h2>
            <a href="#/" class="btn">Go Home</a>
        </div>
    `;
}

async function render() {
    const route = getRoute();

    switch (route.page) {
        case "home":
            renderHome();
            break;

        case "products":
            renderProducts();
            break;

        case "details":
            await renderDetails(route.id);
            break;

        case "cart":
            renderCart();
            break;

        default:
            renderNotFound();
    }

    updateCartCount();
}

async function initialize() {
    app.innerHTML = `
        <div class="loading">
            Loading ShopSphere...
        </div>
    `;

    try {
        products = await getProducts();
        categories = await getCategories();

        await render();

    } catch (error) {
        app.innerHTML = `
            <div class="error">
                Failed to load products.
                Please check your internet connection.
            </div>
        `;
    }
}

window.addEventListener("hashchange", render);

initialize();
