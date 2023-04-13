<template>
    <div class="col mb-5">
        <div class="card h-100" @click="cardClick()">
          <!-- Sale badge-->
          <div v-if="isOnSale"
            class="badge bg-dark text-white position-absolute"
            style="top: 0.5rem; right: 0.5rem"
          >
            Sale
          </div>
          <!-- Product image-->
          <img
            class="card-img-top"
            :src="imageUrl"
            alt="..."
          />
          <!-- Product details-->
          <div class="card-body p-4">
            <div class="text-center">
              <!-- Product name-->
              <h5 class="fw-bolder">{{ name }}</h5>
              <!-- Product reviews-->
              <div class="d-flex justify-content-center small text-warning mb-2">
                <div class="bi-star-fill"></div>
                <div class="bi-star-fill"></div>
                <div class="bi-star-fill"></div>
                <div class="bi-star-fill"></div>
                <div class="bi-star-fill"></div>
              </div>
              <!-- Product price-->
              <span v-if="isOnSale" class="text-muted text-decoration-line-through">${{ price.toFixed(2) }}</span>
              <span v-if="isOnSale" class="mx-1">-</span>
              <span>${{ originalPrice }}</span>
            </div>
          </div>
          <!-- Product actions-->
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">
              <a v-if="isOnHand" class="btn btn-outline-dark mt-auto" href="#">Add to cart</a>
              <a v-else class="btn btn-outline-dark mt-auto" href="#">View Options</a>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
    export default {
        name: "ProductItem",
        props: {
            id: {
                type: String, 
                required: true,
            },
            name: {
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
            imageUrl: {
                type: String, 
                required: true,
            },
            inventoryCount: {
                type: Number, 
                required: false,
                default: 0
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
          cardClick() {
            this.$emit("productClick", this.id);
          }
        }
    }
</script>

<style scoped>

</style>