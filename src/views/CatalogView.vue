<template>
    <div class="row gx-4 gx-lg-5 mt-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
      <ProductItem v-for="p in products" :key="p.id"
        :id="p.id"
        :name="p.name"
        :imageUrl="p.imgUrl"
        :price="p.price"
        :salePrice="p.salePrice"
        :inventoryCount="p.inventoryCount"
      ></ProductItem>  
    </div>
</template>

<script>
    import ProductItem from '../components/ProductItem.vue';

    import inventory from "../data/products.json";

    export default {
        name: "CatalogView",
        components: {
            ProductItem,
        },
        data() {
            return {
                products: [],
            }
        },
        mounted() {
            this.products = inventory.cocktails;
            // console.log(this.products);
        }
    }
</script>

<style scoped>

</style>