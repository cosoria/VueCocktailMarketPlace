import { defineStore } from 'pinia';

export const useInventoryStore =  defineStore('inventory', {
    state() {
        return {
            query: "",
            products: [],
            product: {
                id: "",
                name: "",
                instructions: "",
                imgUrl: "",
                inventoryCount: 0,
                price: 0,
                salePrice: 0
            }
        };
    },
    getters: {
        getProduct() {
            return this.product;
        },
        getProducts() {
            return this.products;
        },
        getQuery() {
            return this.query;
        },
    },
    actions: {
        setProduct(product) {
            this.product.id = product.id;
            this.product.name = product.name;
            this.product.instructions = product.instructions;
            this.product.imgUrl = product.imgUrl;
            this.product.inventoryCount = product.inventoryCount;
            this.product.price = product.price;
            this.product.salePrice = product.salePrice;
        },
        setProducts(products) {
            this.products = products
        },
        setQuery(query) {
            this.query = query;
        }
    }
});