<template>
  <VModal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <input
          type="text"
          class="form-control"
          v-model="card.title"
          :readonly="!toggleTitle"
          @click="toggleTitle = true"
          @blur="onBlurTitle"
          ref="inputTitle"
        />
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
        :readonly="!toggleDescription"
        @click="toggleDescription = true"
        @blur="onBlurDescription"
        ref="inputDescription"
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

  data() {
    return {
      toggleTitle: false,
      toggleDescription: false,
    };
  },

  computed: {
    ...mapState({
      card: "card",
      board: "board",
    }),
  },

  created() {
    this.fetchCard();
  },

  methods: {
    ...mapActions(["FETCH_CARD", "UPDATE_CARD"]),

    onClose() {
      this.$router.push(`/b/${this.board.id}`);
    },
    // 중복해서 사용되는 코드가 있으면 메소드로 묶는다.
    fetchCard() {
      const id = this.$route.params.cId;
      this.FETCH_CARD({ id });
    },

    onBlurTitle() {
      this.toggleTitle = false;

      const title = this.$refs.inputTitle.value.trim();

      if (!title) return;
      this.UPDATE_CARD({ id: this.card.id, title }).then(() =>
        this.fetchCard()
      );
    },

    onBlurDescription() {
      this.toggleDescription = false;

      const description = this.$refs.inputDescription.value.trim();

      if (!description) return;

      this.UPDATE_CARD({ id: this.card.id, description }).then(() =>
        this.fetchCard()
      );
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
