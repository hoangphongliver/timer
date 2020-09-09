<template>
  <div class="row">
    <div class="col-sm-6 col-md-6 col-lg-4" v-for="(hotel, index) in hotelFilter" :key="index">
      <HotelListing :hotelDetail="hotel" />
    </div>
    <AppSidebar @send:SortBy="saveSortBy" />
  </div>
</template>

<script>
import axios from "axios";
import HotelListing from "@/components/HotelListing";
import AppSidebar from "@/components/AppSidebar";
import { mapGetters } from "vuex";

export default {
  components: {
    HotelListing,
    AppSidebar,
  },
  data() {
    return {
      hotelList: [],
      hotelFilter: [],
    };
  },
  async created() {
    let data = await axios({
      method: "GET",
      url: "https://5f51b69d5e98480016123d8a.mockapi.io/api/hotel",
    });

    this.hotelList = data.data;
    this.hotelFilter = this.hotelList;
  },
  mounted() {},
  computed: {
    ...mapGetters({
      searchPhase: "searchPhase",
    }),
  },
  methods: {
    saveSortBy(sortBy) {
      switch (sortBy) {
        case "lowToHigh":
          this.hotelFilter.sort((a, b) => a.price - b.price);
          break;
        case "highToLow":
          this.hotelFilter.sort((a, b) => b.price - a.price);
          break;
        case "numberReviews":
          this.hotelFilter.sort((a, b) => b.numberStar - a.numberStar);
          break;
        case "popularFilter":
          this.hotelFilter.sort((a, b) => a.popularSearch - b.popularSearch);
          break;
        default:
          break;
      }
    },
  },

  watch: {
    searchPhase(val) {
      this.hotelFilter = this.hotelList.filter((h) => {
        if (val) {
          return h.hotelName.toLowerCase().indexOf(val.toLowerCase()) !== -1;
        }

        return 1;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>