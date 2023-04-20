<template>
   <section v-if="id" class="py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
                <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" :src="imgUrl" alt="..." /></div>
                <div class="col-md-6">
                    <div class="small mb-1">SKU: CK-{{ id.toUpperCase() }}</div>
                    <h1 class="display-5 fw-bolder">{{ name }}</h1>
                    <div class="fs-5 mb-5">
                        <span v-if="isOnSale" class="text-muted text-decoration-line-through">${{ price.toFixed(2) }}</span>
                        <span v-if="isOnSale" class="mx-1">-</span>
                        <span>${{ originalPrice }}</span>
                    </div>
                    <p class="lead">{{ instructions }}</p>
                    <div class="d-flex">
                        <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                        <button @click.prevent="addToCart()" class="btn btn-outline-dark flex-shrink-0" type="button">
                            <i class="bi-cart-fill me-1"></i>
                            Add to cart
                        </button>
                    </div>
                    <div v-if="isAdmin" class="d-flex my-5">
                        <button 
                            class="btn btn-outline-dark flex-shrink-0" 
                            type="button"
                            @click.prevent="edit()">
                            <i class="bi-cart-fill me-1"></i>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ProductDetail",
        props: {
            id: {
                type: String, 
                required: true,
            },
            name: {
                type: String, 
                required: true,
            },
            instructions: {
                type: String, 
                required: true,
            },
            price: {
                type: String, 
                required: true,
            },
            salePrice: {
                type: Number, 
                required: false,
                default: 0.0
            },
            imgUrl: {
                type: String, 
                required: true,
            },
            inventoryCount: {
                type: Number, 
                required: false,
                default: 0
            },
            isAdmin: {
                type: Boolean, 
                required: false,
                default: false
            },
        },
        computed: {
            isOnSale() {
                return this.salePrice > 0;
            },
            originalPrice() {
                const finalPrice = this.isOnSale ? this.salePrice : this.price;
                return finalPrice.toFixed(2);
            },
            isOnHand() {
                return this.inventoryCount > 0;
            }
        },
        methods: {
            addToCart() {
                this.$emit('addToCart', { 
                    id:this.id, 
                    name:this.name, 
                    price:this.price, 
                    salePrice:this.salePrice 
                });
            },
            edit() {

            }
        }
    }
</script>

<style scoped>

</style>