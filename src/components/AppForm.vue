<template>
  <div class="app-form">
    <b-form-select v-model="selected" class="mb-3">
      <b-form-select-option v-for="(item , key) in form" :key="key" :value="key">{{key}}</b-form-select-option>
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

    submit() {
      console.log(this.form);
    },
  },
};
</script>

<style>
</style>
