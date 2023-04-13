<template>
        <!-- Product section-->
        <section v-if="product" class="py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
                <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" :src="product.imgUrl" alt="..." /></div>
                <div class="col-md-6">
                    <div class="small mb-1">SKU: CK-{{ product.id.toUpperCase() }}</div>
                    <h1 class="display-5 fw-bolder">{{ product.name }}</h1>
                    <div class="fs-5 mb-5">
                        <span v-if="isOnSale" class="text-muted text-decoration-line-through">${{ product.price.toFixed(2) }}</span>
                        <span v-if="isOnSale" class="mx-1">-</span>
                        <span>${{ originalPrice }}</span>
                    </div>
                    <p class="lead">{{ product.instructions }}</p>
                    <div class="d-flex">
                        <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                        <button class="btn btn-outline-dark flex-shrink-0" type="button">
                            <i class="bi-cart-fill me-1"></i>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { getById } from '../data/cocktailRepository';

    export default {
        name: "ProductDetailView",
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
        },
        async mounted() {
            const cocktail = await getById(this.id);
            this.product = cocktail;
        }
    }
</script>

<style scoped>

</style>