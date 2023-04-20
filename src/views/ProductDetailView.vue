<template>
    <!-- Product section-->
    <ProductDetail 
        v-if="product"
        :id="product.id"
        :name="product.name"
        :instructions="product.instructions"
        :price="product.price"
        :salePrice="product.salePrice"
        :imgUrl="product.imgUrl"
        :inventoryCount="product.inventoryCount"
        :isAdmin="false"
        @addToCart="addToCart($event)"
    ></ProductDetail>
</template>

<script>
    import { getById } from '../data/cocktailRepository';
    import { mapStores } from 'pinia';
    import { useUserStore } from '../stores/userStore';
    import { useCartStore } from '../stores/cartStore';
    import ProductDetail from '../components/ProductDetail.vue';

    export default {
        name: "ProductDetailView",
        components: {
            ProductDetail
        },
        props: {
            id: {
                type: String, 
                required: true,
            },
        },
        data() {
            return {
                product: null
            };
        },
        computed: {
            isOnSale() {
                return this.product.salePrice > 0;
            },
            originalPrice() {
                const finalPrice = this.isOnSale ? this.product.salePrice : this.product.price;
                return finalPrice.toFixed(2);
            },
            ...mapStores(useUserStore, useCartStore)
        },
        methods: {
            edit() {
                this.$router.push({name:'product_edit', params: { id: this.id }});
            },
            addToCart(payload) {
                this.cartStore.addItem(payload);
            },
        },
        async mounted() {
            const cocktail = await getById(this.id);
            this.product = cocktail;
        }
    }
</script>

<style scoped>

</style>