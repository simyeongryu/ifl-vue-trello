<template>
  <div class="list">
    <div class="list-header">
      <input
        v-if="isEditTitle"
        type="text"
        class="form-control input-title"
        ref="inputTitle"
        v-model="inputTitle"
        @blur="onBlurTitle"
        @keyup.enter="onSubmitTitle"
      />
      <div v-else class="list-header-title" @click="onClickTitle">{{ data.title }}</div>
    </div>
    <div class="card-list">
      <CardItem v-for="card in data.cards" :key="card.id" :data="card" />
    </div>
    <div v-if="isAddCard">
      <AddCard :list-id="data.id" @close="isAddCard = false" />
    </div>
    <div v-else>
      <!-- stop 해주는 이유. -->
      <!-- 여기서 click 이벤트가 발생하면 이벤트 버블링이 발생한다. -->
      <!-- 상위 엘레먼트에서 click 이벤트가 발생하게 되고 AddCard에서 emit close가 발생한다. -->
      <a href class="add-card-btn" @click.prevent.stop="isAddCard = true">&plus; Add a card</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddCard from "./AddCard";
import CardItem from "./CardItem";

export default {
  components: {
    AddCard,
    CardItem,
  },

  props: ["data"],

  data() {
    return {
      isAddCard: false,
      isEditTitle: false,
      inputTitle: "",
    };
  },

  created() {
    this.inputTitle = this.data.title;
  },

  methods: {
    ...mapActions(["UPDATE_LIST"]),

    onClickTitle() {
      this.isEditTitle = true;
      this.$nextTick(() => {
        this.$refs.inputTitle.focus();
      });
    },

    onBlurTitle() {
      this.isEditTitle = false;
    },

    onSubmitTitle() {
      this.isEditTitle = false;

      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) return;

      const id = this.data.id;
      const title = this.inputTitle;
      if (title === this.data.title) return;

      this.UPDATE_LIST({ id, title });
    },
  },
};
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}
.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}
.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}
.input-title {
  width: 90%;
}
.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}
.card-list {
  flex: 1 1 auto;
  overflow-y: scroll;
}
.empty-card-item {
  height: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
}
.add-card-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}
.add-card-btn:focus,
.add-card-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>