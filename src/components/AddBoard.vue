<template>
  <VModal>
    <div slot="header">
      <h2>
        Create new board
        <a
          href
          class="modal-default-button"
          @click.prevent="SET_IS_ADD_BOARD(false)"
        >&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form" @submit.prevent="addBoard">
        <input class="form-control" type="text" v-model="input" ref="input" />
      </form>
    </div>
    <div slot="footer">
      <button
        class="btn"
        :class="{ 'btn-success': valid }"
        type="submit"
        form="add-board-form"
        :disabled="!valid"
      >Create Board</button>
    </div>
  </VModal>
</template>

<script>
import VModal from "./VModal.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    VModal,
  },

  data() {
    return {
      input: "",
      valid: false,
    };
  },

  watch: {
    input(v) {
      this.valid = v.trim().length > 0;
    },
  },

  mounted() {
    this.$refs.input.focus();
  },

  methods: {
    ...mapMutations(["SET_IS_ADD_BOARD"]),

    // close() {
    //   this.$emit("close"); // close 라는 이름의 이벤트를 발생시킨다.
    // },

    addBoard() {
      this.SET_IS_ADD_BOARD(false); // mutation 사용하기
      this.$emit("submit", this.input); //input 의 밸류값을 인자로 받는다.
    },
  },
};
</script>

<style></style>
