import { defineStore } from 'pinia';

export const useInventoryStore =  defineStore('inventory', {
    state() {
        return {
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
        }
    }
});