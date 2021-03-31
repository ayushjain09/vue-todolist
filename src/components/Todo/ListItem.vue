<template>
  <section class="wrapper">
    <li>
      <slot></slot>
      <input
        class="clickables"
        type="checkbox"
        :value="id"
        @change="toggleSelectedItem(id)"
      />

      <div class="title" :class="{ 'strike-off': strikeOff }">
        <h3>{{ title }}</h3>
        <p>{{ desc }}</p>
      </div>

      <div class="clickables">
        <input
          class="complete"
          type="checkbox"
          :checked="strikeOff"
          @change="toggleComplete(id)"
        />
        <button class="delete" @click="deleteItem([id])">
          Delete
        </button>
        <button class="edit" @click="editItem(id)" :disabled="editDisable">
          Edit
        </button>
      </div>
    </li>
  </section>
</template>

<script>
export default {
  props: ["title", "desc", "id", "strikeOff"],
  inject: [
    "deleteItem",
    "toggleComplete",
    "selectedItems",
    "toggleSelectedItem",
  ],

  methods: {
    editItem(itemId) {
      this.selectedNavBtn = "addoredit";
      this.$router.push(`/edit/${itemId}`);
    },
  },

  computed: {
    editDisable() {
      return (
        this.selectedItems.length > 1 && this.selectedItems.includes(this.id)
      );
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 1rem 25%;
}

li {
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 0.5rem 1rem;
  /* background-color: rgb(189, 218, 255); */
}

div {
  display: inline-block;
}

button {
  margin: 0 5px;
}

.clickables {
  position: relative;
  bottom: 20px;
  margin: 0 1rem;
}

.title {
  width: 60%;
}

.strike-off {
  text-decoration: line-through;
  /* color: #ccc; */
}

.complete .select {
  width: 3%;
  margin: 1rem;
  color: blue;
}
</style>
