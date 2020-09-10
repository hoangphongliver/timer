<template>
  <div class="button-wrapper">
    <span class="label">Upload File</span>
    <input
      type="file"
      name="upload"
      id="upload"
      class="upload-box"
      accept="image/*"
      @change="previewImage"
      placeholder="Upload File"
    />
    <b-progress v-if="uploadProgress" variant="success" :value="uploadProgress" max="100"></b-progress>
    <button @click="onUpload">Upload</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "UploadFile",
  props: {
    time: {
      type: String,
    },
  },
  data() {
    return {
      imageData: null,
      uploadProgress: 0,
    };
  },
  methods: {
    previewImage(event) {
      if (event.target.files && event.target.files[0]) {
        this.uploadProgress = 0;
        this.imageData = event.target.files[0];
      }
    },

    onUpload() {
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);

      storageRef.on(
        "state_changed",
        (snapshot) => {
          this.uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(err);
        },
        () => {
          this.uploadProgress = 100;
          storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.$emit("send:ImageURL", downloadURL);
          });
        }
      );
    },
  },
  mounted() {
    const storage = firebase.storage();
    console.log(storage);
  },
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600);

body {
  font-family: "Open Sans", sans-serif;
  height: 100%;
  text-align: center;
  position: relative;
}

.button-wrapper {
  position: relative;
  width: 150px;
  text-align: center;
  margin: 20% auto;
}

.button-wrapper span.label {
  position: relative;
  z-index: 0;
  display: inline-block;
  width: 100%;
  background: #00bfff;
  cursor: pointer;
  color: #fff;
  padding: 10px 0;
  text-transform: uppercase;
  font-size: 12px;
}

#upload {
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
