<template>
  <div>
    Board
    <div v-if="loading">Loading Board...</div>
    <div v-else>
      <div>bId : {{ bId }}</div>
      <pre>{{ board }}</pre>
      <router-link :to="`/b/${bId}/c/1`">Card 1</router-link>
      <router-link :to="`/b/${bId}/c/2`">Card 2</router-link>
    </div>
    <hr />
    <!-- 중첩 라우팅을 위한 router-view -->
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      bId: 0,
      loading: false
    };
  },

  computed: {
    ...mapState([
      'board'
    ])
  },

  created() {
    this.fetchData();
  },

  methods: {
    ...mapActions([
      'FETCH_BOARD'
    ]),

    fetchData() {
      this.loading = true;
      this.FETCH_BOARD({id: this.$route.params.bId})
        .then(() => this.loading = false);
    }
  },

};
</script>

<style></style>
