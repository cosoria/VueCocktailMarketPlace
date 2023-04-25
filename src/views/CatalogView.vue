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
                :isAddMode="true"
            ></ProductItem>  
        </div>
        <PaginationComponent 
            v-if="products.length > 0"
            :totalPages="0"
            v-model="currentPage"
            @previousPage="previousPage()"
            @nextPage="nextPage()"
            @gotoPage="gotoPage($event)"
        ></PaginationComponent>
        <button> Load more result </button>
        <div v-if="products.length == 0" class="row gx-4 gx-lg-5 mt-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <LoadingSpinner></LoadingSpinner>
        </div>
    </div>
</template>

<script>
    import { getAll, nextPage, previousPage } from '../data/cocktailRepository';
    import ProductItem from '../components/ProductItem.vue';
    import LoadingSpinner from '../components/LoadingSpinner.vue';
    import PaginationComponent from '../components/PaginationComponent.vue';

    import { mapStores } from 'pinia';
    import { useUserStore } from '../stores/userStore';

    export default {
        name: "CatalogView",
        components: {
            ProductItem,
            LoadingSpinner,
            PaginationComponent,
        },
        data() {
            return {
                currentPage: 5,
                nextPageBookmark: "",
                prevPageBookmark: "",
                pageSize: 4,
                products: [],
            }
        },
        computed: {
            ...mapStores(useUserStore)
        },
        methods: {
            productClicked(id) {
                // console.log("CatologView:", id);
                this.$router.push({
                    name:"product_detail", 
                    params: { "id": id }
                });
            },
            async previousPage(){
                console.log("Go Prev");
                const cocktails = await previousPage(this.prevPageBookmark, this.pageSize);
                console.log(cocktails);
                if(cocktails.length > 0) {
                    this.prevPageBookmark = cocktails.at(0).name;
                    this.nextPageBookmark = cocktails.at(-1).name;
                    console.log("Prev Bookmark:", this.prevPageBookmark);
                    console.log("Next Bookmark:", this.nextPageBookmark);
                    this.refreshPage(cocktails);
                } else {
                    console.log("No more pages");
                }
            },
            async nextPage(){
                console.log("Go Next");
                const cocktails = await nextPage(this.nextPageBookmark, this.pageSize);
                console.log(cocktails);
                if(cocktails.length > 0) {
                    this.prevPageBookmark = cocktails.at(0).name;
                    this.nextPageBookmark = cocktails.at(-1).name;
                    console.log("Prev Bookmark:", this.prevPageBookmark);
                    console.log("Next Bookmark:", this.nextPageBookmark);
                    this.refreshPage(cocktails);
                } else {
                    console.log("No more pages");
                }
            },
            gotoPage(pageNumber){
                console.log("Go To:", pageNumber);
            },
            refreshPage(cocktails) {
                if(cocktails?.length > 0) {
                    this.products.length = 0;
                    cocktails.forEach(c => this.products.push(c));
                }
            },
        },
        async mounted() {
            await this.nextPage();
        }
    }
</script>

<style scoped>
</style>