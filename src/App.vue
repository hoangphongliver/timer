<template>
  <div class="app">
    <AppNavbar />
    <div class="row container mt-5">
      <!-- <Timer :time="prettyTime" /> -->
      isOnline: {{ isOnline }}
      <router-view></router-view>
      <!-- <AppForm></AppForm> -->
    </div>
  </div>
</template>

<script>
import Timer from "@/components/Timer";
import HotelListing from "@/components/HotelListing";
import AppNavbar from "@/components/AppNavbar";
import AppSidebar from "@/components/AppSidebar";
import axios from "axios";
import HotelList from "@/components/HotelList";
import { mapActions } from "vuex";
import AppForm from "@/components/AppForm";

export default {
  name: "AppTimer",
  components: {
    Timer,
    HotelListing,
    AppSidebar,
    AppNavbar,
    HotelList,
    AppForm,
  },
  props: {
    countName: {
      type: String,
      default: () => "countUp",
    },
    timeSetup: {
      type: Number,
      default: () => 10,
    },

    showHours: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isRunning: false,
      minutes: 0,
      secondes: 0,
      time: 0,
      timer: null,
      hotelList: [],
      sortBy: [],
    };
  },
  async created() {
    let installPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      installPrompt = e;
      this.installBtn = "block";
    });

    this.installer = () => {
      this.installBtn = "none";
      installPrompt.prompt();
      installPrompt.userChoice.then((result) => {
        if (result.outcome === "accepted") {
          console.log("Install accepted!");
        } else {
          console.log("Install denied!");
        }
      });
    };
  },
  mounted() {
    this.start();

    this.$on("online", () => {
      this.isOnline = true;
      localStorage.setItem("isOnline", this.isOnline);
    });

    this.$on("offline", () => {
      console.log("User is now offline");
      this.isOnline = false;
      localStorage.setItem("isOnline", this.isOnline);
    });
  },
  computed: {
    prettyTime() {
      let time = this.time;
      let hours = parseInt(time / 3600);
      let minites = parseInt((time / 3600 - hours) * 60);
      let secondes = time - hours * 3600 - minites * 60;
      let prettyHours = hours < 10 ? `0${hours}` : hours;
      let prettyMinutes = minites < 10 ? `0${minites}` : minites;
      let prettySecondes = secondes < 10 ? `0${secondes}` : secondes;

      return `${
        prettyHours >= 1 ? `${prettyHours}:` : ""
      }${prettyMinutes}:${prettySecondes}`;
    },
  },
  methods: {
    start() {
      this.isRunning = true;
      if (this.countName === "countUp") {
        this.time = 0;
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.time >= 0) {
              this.time++;
            }
          }, 1000);
        }
      } else {
        this.time = this.timeSetup;
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.time > 0) {
              this.time--;
            } else {
              clearInterval(this.timer);
              this.reset();
              alert("het time");
            }
          }, 1000);
        }
      }
    },
    stop() {
      this.isRunning = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    reset() {
      this.stop();
      this.time = 0;
      this.secondes = 0;
      this.minutes = 0;
      if (this.countName === "countUp") {
        this.start();
      }
    },

    saveSortBy(sortBy) {
      this.sortBy = sortBy;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/_global.scss";
.app-timer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
