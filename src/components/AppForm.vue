<template>
  <div class="app-form">
    <b-form-select v-model="selected" class="mb-3">
      <b-form-select-option v-for="(item , keyy) in form" :key="keyy" :value="keyy">{{form[keyy]}}</b-form-select-option>
    </b-form-select>
    <b-form-group
      v-for="(item,key) in form"
      :key="key"
      id="input-group-1"
      :label="`Enter ${key}`"
      label-for="input-1"
    >
      <b-form-input
        v-model="form[key]"
        id="input-1"
        type="email"
        required
        :placeholder="`Enter ${key}`"
      ></b-form-input>
    </b-form-group>
    {{ $v.$invalid }}
    <button
      v-if="lastKey !== 'b'"
      @click="delObj"
      type="button"
      class="btn btn-outline-primary"
    >Del</button>
    <button v-if="lastKey !== 'f'" @click="getVal" type="button" class="btn btn-outline-primary">Add</button>
    <button
      :disabled="$v.$invalid"
      @click="submit"
      type="button"
      class="btn btn-outline-primary"
    >Submit</button>

    <div v-for="(item,index) in randomList(arr)" :key="`${index}_abc`" class="mb-5">
      <div v-for="(val, key) in randomAnswer(item.answer)" :key="`${key}_abc`">{{ key }} : {{ val}}</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  required,
  requiredIf,
  minLength,
  between,
} from "vuelidate/lib/validators";

export default {
  name: "AppForm",
  data() {
    return {
      selected: "a",
      form: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      sound: "../assets/audio/gvl.mp3",
      arr: [
        {
          id: "7",
          CategoryId: "14",
          questionName: "Hyper Text Markup Language",
          answer: {
            a: " Hyper Text Markup Language",
            b: " Hyperlinks and Text Markup Language",
            c: " Home Tool Markup Language",
            d: " Home Markup Language",
          },
          rightAnswer: "A",
          like: 30,
          _showDetails: false,
        },
        {
          id: "26",
          CategoryId: "14",
          questionName: "Who is making the Web standards?",
          answer: {
            a: "Google",
            b: "Mozilla",
            c: " The World Wide Web Consortium",
            d: "Microsoft",
          },
          rightAnswer: "C",
          like: 74,
          _showDetails: false,
        },
      ],
      answer: {
        a: " Hyper Text Markup Language",
        b: " Hyperlinks and Text Markup Language",
        c: " Home Tool Markup Language",
        d: " Home Markup Language",
      },
    };
  },
  computed: {
    lastKey() {
      const length = Object.keys(this.form).length;
      return Object.keys(this.form)[length - 1];
    },
  },
  validations: {
    form: {
      a: {
        required,
      },
      b: {
        required,
      },
      c: {
        required: requiredIf((form) => {
          return Object.keys(form).includes("c");
        }),
      },
      d: {
        required: requiredIf((form) => {
          return Object.keys(form).includes("d");
        }),
      },
      e: {
        required: requiredIf((form) => {
          return Object.keys(form).includes("e");
        }),
      },
      f: {
        required: requiredIf((form) => {
          return Object.keys(form).includes("f");
        }),
      },
    },
  },
  mounted() {
    console.log(this.randomAnswer(this.answer));
  },
  methods: {
    getVal() {
      const length = Object.keys(this.form).length;
      switch (length) {
        case 2:
          Vue.set(this.form, "c", "");
          break;
        case 3:
          Vue.set(this.form, "d", "");
          break;
        case 4:
          Vue.set(this.form, "e", "");
          break;
        case 5:
          Vue.set(this.form, "f", "");
          break;
        default:
          break;
      }
    },

    delObj() {
      if (Object.keys(this.form).length > 2) {
        Vue.delete(this.form, this.lastKey);
      }
    },

    randomList(rand) {
      return rand.sort(() => {
        return 0.5 - Math.random();
      });
    },

    randomKey(obj) {
      return Object.keys(obj).sort(() => {
        return 0.5 - Math.random();
      });
    },

    randomAnswer(answer) {
      const allKeyRD = this.randomKey(answer);
      let obj = {};
      allKeyRD.forEach((key) => {
        obj[key] = answer[key];
      });

      return obj;
    },

    submit() {
      const sound = require("@/assets/audio/gvl.mp3");
      let audio = new Audio(sound);
      audio.play();
    },
  },
};
</script>

<style>
</style>
