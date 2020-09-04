<template>
  <div class="timer">
    <h1>{{ time | prettify }}</h1>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    time: {
      type: String,
    },
  },
  filters: {
    prettify: function (value) {
      let data = value.split(":");
      let minutes = data[0];
      let secondes = data[1];
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (secondes < 10) {
        secondes = "0" + secondes;
      }
      return minutes + ":" + secondes;
    },
  },
};
</script>

<style>
.timer {
  font-size: 2em;
  margin: 20px;
  padding: 10px;
  border: 2px solid black;
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}
</style>
