<template>
    <div>
        <ProductSearch
            @search="onSearchProduct($event)"
        ></ProductSearch>
        <div v-if="products.length > 0" class="row gx-4 gx-lg-5 mt-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <ProductItem v-for="p in page" :key="p.id"
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
        <div v-if="page.length" class="d-flex justify-content-center">
            <nav aria-label="Page navigation example" class="mt-3">
            <ul class="pagination">
                <li class="page-item"><a 
                    @click.prevent="previousPage()" 
                    class="page-link" href="#">Previous</a></li>
                <li v-for="p in maxPages" :key="p" 
                    class="page-item" 
                    :class="{'active': p == pageIndex}"  
                    @click.prevent="gotoPage(p)"
                ><a class="page-link" href="#">{{ p }}</a></li>
                <li class="page-item"><a 
                    @click.prevent="nextPage()" 
                    class="page-link" href="#">Next</a></li>
            </ul>
            </nav>
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
        name: "InventoryView",
        components: {
            ProductItem,
            ProductSearch,
        },
        data() {
            return {
                page: [],
                pageIndex: 1,
                pageSize: 4,
                maxPages: 1,
                products: [],
                query: "",
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
            gotoPage(p) {
                this.pageIndex = p;
                this.updatePage();
            },
            previousPage() {
                console.log(this.pageIndex);
                this.pageIndex = this.pageIndex <= 1 ? 1 : this.pageIndex - 1;
                this.updatePage();
            },
            nextPage() {
                console.log(this.pageIndex);
                console.log((this.products.length / this.pageSize));
                this.pageIndex = this.maxPages == this.pageIndex ? this.pageIndex : this.pageIndex + 1;
                this.updatePage();
            },
            updatePage() {
                let start = (this.pageIndex - 1) * this.pageSize;
                let end = start + this.pageSize;
                this.page = this.products.slice(start, end);
            },
            onSearchProduct(query) {
                searchByFirstLetter(query).then((r) => {
                    this.inventoryStore.setProducts(r);
                    this.inventoryStore.setQuery(query);
                    this.products = r;
                    this.maxPages = Math.ceil(this.products.length / this.pageSize);
                    this.updatePage();
                }).catch(e => console.log(e));
            },
        },
        mounted() {
            this.products = this.inventoryStore.getProducts;
            this.query = this.inventoryStore.getQuery;
            this.maxPages = Math.ceil(this.products.length / this.pageSize);
            this.updatePage();
        }
    }
</script>

<style scoped>
</style>