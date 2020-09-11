<template>
  <div>
    <div class="header">
      <h2>Upload Image</h2>
    </div>
    <hr />

    <input ref="input" type="file" name="image" accept="image/*" @change="setImage" />

    <div class="content">
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper v-if="file" ref="cropper" :aspect-ratio="1 / 1" preview=".preview" />
        </div>
        <div class="no-upload" v-if="!file">
          <b-button variant="info" @click="showFileChooser">Click here to Upload</b-button>
        </div>
        <div class="actions">
          <b-button class="mr-3" variant="info" @click.prevent="showFileChooser">Brower</b-button>
          <b-button variant="danger" @click.prevent="reset">Reset</b-button>
        </div>
      </section>
      <section class="preview-area">
        <div class="preview mb-5" />
        <b-button @click="onUpload" variant="success" :disabled="!file">
          <b-spinner class="mr-3" v-if="isLoading" small label="Small Spinner"></b-spinner>Upload
        </b-button>
      </section>
    </div>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import firebase from "firebase";

export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      imgSrc: "/assets/images/berserk.jpg",
      cropImg: "",
      data: null,
      file: null,
      isLoading: false,
    };
  },
  methods: {
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },

    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute("data-scale", scale);
    },

    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute("data-scale", scale);
    },

    getCropBoxData() {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
    },

    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
    },

    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },

    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },

    setCropBoxData() {
      if (!this.data) return;

      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },

    setData() {
      if (!this.data) return;

      this.$refs.cropper.setData(JSON.parse(this.data));
    },

    setImage(e) {
      this.file = e.target.files[0];
      if (this.file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };

        reader.readAsDataURL(this.file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },

    showFileChooser() {
      this.$refs.input.click();
    },

    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },

    onUpload() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      if (this.cropImg) {
        this.isError = false;
        this.isLoading = true;
        const storageRef = firebase
          .storage()
          .ref(`${this.file.name}`)
          .putString(this.cropImg, "data_url");

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
            this.isLoading = false;
            storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.$emit("send:ImageURL", downloadURL);
            });
          }
        );
      } else {
        this.isError = true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/_global.scss";
input[type="file"] {
  display: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}

.header h2 {
  margin: 0;
}

.header a {
  text-decoration: none;
  color: black;
}

.content {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @include min-sm {
    flex-direction: row;
  }
}

.cropper-area {
  width: 614px;
}

.actions {
  margin-top: 1rem;
}

.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062cc;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.preview-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 70%;
  }

  @include min-sm {
    width: 40%;
  }
}

.preview-area p:last-of-type {
  margin-top: 1rem;
}

.preview {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid sandybrown;

  @include min-sm {
    width: 300px;
    height: 300px;
  }
}

.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}

.cropped-image img {
  max-width: 100%;
  border-radius: 50%;
}

.no-upload {
  min-height: 86%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid sandybrown;
  border-radius: 10px;
}
</style>
