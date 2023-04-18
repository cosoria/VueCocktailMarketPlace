<template>
    <div class="row mt-2">
        <div class="col-10">
            <input v-model="query" 
                class="form-control me-sm-2" 
                type="search" 
                placeholder="Search" 
            />
        </div>
        <div class="col-2">
            <button @click.prevent="search()" 
                class="btn btn-secondary my-2 my-sm-0" 
                type="button">Search Products</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductSearch",
        data() {
            return {
                query: "",
            };
        },
        methods: {
            search() {
                this.$emit("search", this.query)
            },
        }
    }
</script>

<style scoped>

</style>