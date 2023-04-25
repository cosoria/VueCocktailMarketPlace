<template>
  <div v-if="enabled" class="d-flex justify-content-center">
    <nav aria-label="Page navigation example" class="mt-3">
      <ul class="pagination">
        <li class="page-item">
          <a @click.prevent="previousPage()" class="page-link" href="#">Previous</a>
        </li>
        <template v-if="totalPages > 0">
            <li 
                v-for="p in totalPages"
                :key="p"
                class="page-item"
                :class="{ active: p == currentPage }"
                @click.prevent="gotoPage(p)"
                >
                <a class="page-link" href="#">{{ p }}</a>
            </li>
        </template>
        <template v-else>
            <li class="mx-5"></li>
        </template>
        <li class="page-item">
          <a @click.prevent="nextPage()" class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    value: {
        type: String,
        required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
        currentPage: 1
    };
  },
  computed: {
    enabled() {
      return true
    }
  },
  methods: {
    previousPage() {
        console.log(this.value);
        this.currentPage = this.currentPage - 1;
        if(this.currentPage == 0) {
            this.currentPage = 1;
        }
        this.$emit("previousPage");
        this.$emit("change", this.currentPage);
    },
    nextPage() {
        console.log(this.value);
        this.currentPage = this.currentPage + 1;
        if(this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        }
        this.$emit("nextPage");
        this.$emit("change", this.currentPage);
    },
    gotoPage(pageNumber) {
        console.log(this.value);
        this.currentPage = pageNumber;
        this.$emit("gotoPage", this.currentPage);
        this.$emit("change", this.currentPage);
    }
  }
}
</script>

<style scoped></style>
