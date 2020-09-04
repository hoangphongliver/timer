<template>
  <div>
    <b-sidebar
      id="sidebar-backdrop"
      title="Sidebar with backdrop"
      backdrop
      shadow
      v-model="visible"
    >
      <div class="px-3 py-2">
        <b-form-group label="Backdrop variant" label-for="backdrop-variant">
          <b-form-select id="backdrop-variant" v-model="variant" :options="sortBy" @change="onSort"></b-form-select>
        </b-form-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
  data() {
    return {
      variant: "lowToHigh",
      sortBy: [
        { text: "Price Lowest to Highest", value: "lowToHigh" },
        { text: "Price Highest to Lowest", value: "highToLow" },
        { text: "Number Reviews", value: "numberReviews" },
        { text: "Popular Filter", value: "popularFilter" },
      ],
      visible: false,
    };
  },
  methods: {
    onSort(sortBy) {
      this.$emit("send:SortBy", sortBy);
      this.visible = false;
    },
  },
};
</script>