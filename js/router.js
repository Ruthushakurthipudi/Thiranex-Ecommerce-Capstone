
export function getRoute() {
    const hash = window.location.hash || "#/";

    const route = hash.substring(1);

    if (route === "" || route === "/") {
        return {
            page: "home"
        };
    }

    if (route === "/products") {
        return {
            page: "products"
        };
    }

    if (route.startsWith("/product/")) {
        const id = route.split("/")[2];

        return {
            page: "details",
            id: id
        };
    }

    if (route === "/cart") {
        return {
            page: "cart"
        };
    }

    return {
        page: "not-found"
    };
}

export function navigate(path) {
    window.location.hash = path;
}
