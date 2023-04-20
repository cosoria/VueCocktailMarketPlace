import { defineStore } from 'pinia';

export const useCartStore =  defineStore('cart', {
    state() {
        return {
            items: [],
            total: 0,
        };
    },
    getters: {
        getTotal() {
            return this.total;
        },
        getItems() {
            return this.items;
        },
    },
    actions: {
        addItem(item) {
            const existing = this.items.find(p => p.id == item.id);
            const price = item.salePrice > 0 ? item.salePrice : item.price;

            if(existing) {
                existing.subTotal = existing.subTotal + price;
            } else {
                const newProduct = {
                    id: item.id,
                    name: item.name,
                    subTotal: price
                };

                this.items.push(newProduct);
            }

            // do the calculation for the total 
            // this.total = this.items.reduce((sum, i) => {
            //     sum = sum + i.subTotal;
            //     return sum;
            // }, 0);
        },
    }
});