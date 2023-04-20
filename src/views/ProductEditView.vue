<template>

    <div v-if="product" class="form-signin w-100 m-auto row">
        <div class="col-6">
            <img class="card-img-top mb-5 mb-md-0" :src="product.imgUrl" alt="..." />
        </div>
        <div class="col-6">
            <h1 class="h3 mb-3 fw-normal">Cocktail: {{ product.id }}</h1>

            <div class="form-floating">
                <input v-model="product.name" 
                    type="input" 
                    name="name"
                    class="form-control"  
                    placeholder="" />
                <label for="floatingInput">Name</label>
            </div>

            <div class="form-floating">
                <input ref="fileUpload" type="file" name="image" @change="uploadFile()" style="display:none"/>

                <input v-model="fileName" 
                    type="input" 
                    name="fileName"
                    class="form-control"  
                    placeholder="" />
                <label for="floatingInput">Image</label> 
                <button @click.prevent="chooseFile()">Upload</button>
            </div>

            <div class="form-floating">
                <input v-model="product.instructions" 
                    type="input" 
                    name="instructions"
                    class="form-control" 
                    placeholder="" />
                <label for="floatingInput">Instructions</label>
            </div>

            <div class="form-floating">
                <input v-model.number="product.price" 
                    type="input" 
                    name="price"
                    class="form-control"  
                    placeholder=""        />
                <label for="floatingInput">Price</label>
            </div>

            <div class="form-floating">
                <input v-model.number="product.salePrice" 
                    type="input" 
                    name="price"
                    class="form-control"  
                    placeholder=""        />
                <label for="floatingInput">Sale Price</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" @click.prevent="update()">{{ isInventoryEdit ? 'Add' : 'Update' }}</button>
        </div>
    </div>
    <div v-else>
        Cocktail not found 
    </div>
</template>

<script>

    import { getById, update, add } from '../data/cocktailRepository';
    import { mapStores } from 'pinia';
    import { useInventoryStore } from '../stores/inventoryStore';

    export default {
        name: "ProductEditView",
        props: {
            id: {
                type: String, 
                required: true,
            },
        },
        data() {
            return {
                product: null,
                fileName: "",
            };
        },
        computed: {
            ...mapStores(useInventoryStore),
            isInventoryEdit() {
                return this.$route.name == "inventory_edit";
            }
        },
        methods: {
            update() {
                if(this.isInventoryEdit) {
                    add(this.product).then(() => {
                        console.log("updated successfully");
                        this.$router.push({name: "inventory"});
                    }).catch(error => console.log(error));

                } else {
                    console.log("Update product");
                    update(this.product).then(() => {
                        console.log("updated successfully");
                        this.$router.push({name: "product_detail", params: { id: this.id }})
                    }).catch((error) => console.log(error));
                }
            },
            uploadFile() {
                console.log(this.$refs.fileUpload.files[0]);
                this.fileName = this.$refs.fileUpload.files[0].name;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.product.imgUrl = e.target.result;
                };
                reader.readAsDataURL(this.$refs.fileUpload.files[0]);
            },
            chooseFile() {
                this.$refs.fileUpload.click();
            }
        },
        async mounted() {

            let cocktail = null;
            if(this.isInventoryEdit) {
                cocktail = this.inventoryStore.getProduct;
            } else {
                cocktail = await getById(this.id);
            }
                        
            if(cocktail?.id) {
                this.product = cocktail;
                this.fileName = this.product.imgUrl;
            }
        }
    }
</script>

<style scoped>
</style>