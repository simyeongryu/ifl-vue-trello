<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <input class="form-control" type="text" ref="inputText" v-model="inputTitle">
      <button class="btn btn-success" type="submit" :disabled="invalidInput">Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTitle: ''
    }
  },

  computed: {
    invalidInput() {
      return !this.inputTitle.trim();
    }
  },

  mounted() {
    this.$refs.inputText.focus();
    document.querySelector('body').addEventListener('click', this.handleClickOuside);
  },

  destroyed() {
    document.querySelector('body').removeEventListener('click', this.handleClickOuside);
  },

  methods: {
    onSubmit() {
      console.log("submit");
    },

    handleClickOuside(e) {
      if (this.$el.contains(e.target)) return;

      this.$emit('close');
    }
  }
}
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>