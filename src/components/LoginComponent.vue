<template>
  <div>Login</div>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    this.test();
  },
  methods: {
    test: async function() {
      try {
        const data = await axios.get(
          'https://jsonplaceholder.typicode.com/comments'
        );
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss"></style>
