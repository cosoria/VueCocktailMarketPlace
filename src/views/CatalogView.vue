<template>
    <div>
        <div v-if="products.length > 0" class="row gx-4 gx-lg-5 mt-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <ProductItem v-for="p in products" :key="p.id"
                :id="p.id"
                :name="p.name"
                :imageUrl="p.imgUrl"
                :price="p.price"
                :salePrice="p.salePrice"
                :inventoryCount="p.inventoryCount"
                @productClick="productClicked"
            ></ProductItem>  
        </div>
        <div v-else class="row gx-4 gx-lg-5 mt-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            No products available
        </div>
    </div>
</template>

<script>
    import { getAll } from '../data/cocktailRepository';
    import ProductItem from '../components/ProductItem.vue';

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
        methods: {
            productClicked(id) {
                // console.log("CatologView:", id);
                this.$router.push({
                    name:"product_detail", 
                    params: { "id": id }
                });
            }
        },
        async mounted() {
            const cocktails = await getAll();
            console.log(cocktails);

            if(cocktails) {
                 cocktails.forEach(c => this.products.push(c));
            }
        }
    }
</script>

<style scoped>
</style>