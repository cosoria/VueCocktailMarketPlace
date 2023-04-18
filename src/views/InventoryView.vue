<template>
    <div>
        <ProductSearch
            @search="onSearchProduct($event)"
        ></ProductSearch>
        <div v-if="products.length > 0" class="row gx-4 gx-lg-5 mt-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <ProductItem v-for="p in products" :key="p.id"
                :id="p.id"
                :name="p.name"
                :imageUrl="p.imgUrl"
                :price="p.price"
                :salePrice="p.salePrice"
                :inventoryCount="p.inventoryCount"
                @productClick="productClicked"
                :isAddMode="true"
            ></ProductItem>  
        </div>
        <div v-else class="row gx-4 gx-lg-5 mt-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            No products available
        </div>
    </div>
</template>

<script>
    import ProductItem from '../components/ProductItem.vue';
    import ProductSearch from '../components/ProductSearch.vue';
    import { mapStores } from 'pinia';
    import { useUserStore } from '../stores/userStore';
    import { useInventoryStore } from '../stores/inventoryStore';
    import { searchByFirstLetter } from '../data/cocktailApiRepository'

    export default {
        name: "CatalogView",
        components: {
            ProductItem,
            ProductSearch,
        },
        data() {
            return {
                products: [],
            }
        },
        computed: {
            ...mapStores(useUserStore, useInventoryStore)
        },
        methods: {
            productClicked(id) {
                const p = this.products.find(p => p.id == id);
                console.log(p);
                this.inventoryStore.setProduct(p);
                this.$router.push({
                    name:"inventory_edit", 
                    params: { "id": id }
                });
            },
            onSearchProduct(query) {
                searchByFirstLetter(query).then((r) => {
                    console.log(r);
                    this.products = r;
                }).catch(e => console.log(e));
            },
        },
        mounted() {
            // const cocktails = await getAll();
            // console.log(cocktails);

            // if(cocktails) {
            //      cocktails.forEach(c => this.products.push(c));
            // }

            // console.log("Catalog: ", this.userStore.getUser);
        }
    }
</script>

<style scoped>
</style>