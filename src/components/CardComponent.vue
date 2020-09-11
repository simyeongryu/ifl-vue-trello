<template>
  <VModal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <input type="text" class="form-control" v-model="card.title" readonly />
      </div>
      <a href class="modal-close-btn" @click.prevent="onClose">&times;</a>
    </div>
    <div slot="body">
      <h3>Description</h3>
      <textarea
        cols="30"
        rows="3"
        class="form-control"
        placeholder="Add a more detailed description..."
        v-model="card.description"
        readonly
      ></textarea>
    </div>
    <div slot="footer"></div>
  </VModal>
</template>

<script>
import { mapActions, mapState } from "vuex";
import VModal from "./VModal";

export default {
  components: {
    VModal,
  },

  computed: {
    ...mapState({
      card: "card",
      board: "board",
    }),
  },

  created() {
    const id = this.$route.params.cId;
    this.FETCH_CARD({ id });
  },

  methods: {
    ...mapActions(["FETCH_CARD"]),

    onClose() {
      this.$router.push(`/b/${this.board.id}`);
    },
  },
};
</script>

<style>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}

.modal-card-header-title {
  padding-right: 30px;
}

.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
  color: inherit;
}

.modal-card-header {
  position: relative;
}
</style>
