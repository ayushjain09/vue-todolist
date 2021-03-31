<template>
  <section>
    <the-header></the-header>
    <router-view></router-view>
  </section>
</template>

<script>
import TheHeader from "./components/Layout/TheHeader.vue";
import { ref, provide, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "App",
  components: {
    TheHeader,
  },

  //using composition api
  setup() {
    const router = useRouter();

    let todolist = ref([
      {
        id: 1,
        title: "Learn Vue",
        desc: "Learn the frontend framework by April",
        strikeOff: false,
      },
      {
        id: 2,
        title: "Complete assignment",
        desc: "Complete the routing assignment by 25 March",
        strikeOff: false,
      },
      {
        id: 3,
        title: "Complete training",
        desc: "Learn the complete training course by April",
        strikeOff: false,
      },
    ]);

    let selectedItems = ref([]);

    function addItem(title, desc) {
      const newItem = {
        id: new Date().toISOString(),
        title: title,
        desc: desc,
        strikeOff: false,
      };

      todolist.value.unshift(newItem);
      localStorage.setItem("todos", JSON.stringify(todolist.value));
      router.push("/");

      updateLocalStorage();
    }

    function editItem(index, title, desc) {
      todolist.value[index].title = title;
      todolist.value[index].desc = desc;
      localStorage.setItem("todos", JSON.stringify(todolist.value));
      router.push("/");
      updateLocalStorage();
    }

    function deleteItem(itemIdList) {
      if (
        selectedItems.value.length > 1 &&
        selectedItems.value.includes(itemIdList[0])
      ) {
        itemIdList = [...selectedItems.value];
        selectedItems.value = [];
      }

      itemIdList.map((itemId) => {
        const idx = todolist.value.findIndex((res) => res.id === itemId);
        todolist.value.splice(idx, 1);
      });
      updateLocalStorage();
    }

    function toggleComplete(itemId) {
      const idx = todolist.value.findIndex((res) => res.id === itemId);
      todolist.value[idx].strikeOff = !todolist.value[idx].strikeOff;
      updateLocalStorage();
    }

    function toggleSelectedItem(itemId) {
      const idx = selectedItems.value.findIndex((id) => id === itemId);
      if (idx < 0) selectedItems.value.push(itemId);
      else selectedItems.value.splice(idx, 1);
    }

    function updateLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(todolist.value));
    }

    //todolist.value is not reactive
    provide("todolist", todolist.value);
    provide("deleteItem", deleteItem);
    provide("addItem", addItem);
    provide("editItem", editItem);
    provide("toggleComplete", toggleComplete);
    provide("selectedItems", selectedItems);
    provide("toggleSelectedItem", toggleSelectedItem);

    onMounted(function() {
      if (localStorage.getItem("todos")) {
        const data = JSON.parse(localStorage.getItem("todos"));
        console.log("list from storage - ", data);

        //todolist is reactive but todolist.value is not
        todolist.value = data;
        console.log(todolist.value);
      }
    });
  },

  //using options api

  // data() {
  //   return {
  //     reactive: true,
  //     todolist: [
  //       {
  //         id: 1,
  //         title: "Learn Vue",
  //         desc: "Learn the frontend framework by April",
  //         strikeOff: false,
  //       },
  //       {
  //         id: 2,
  //         title: "Complete assignment",
  //         desc: "Complete the routing assignment by 25 March",
  //         strikeOff: false,
  //       },
  //       {
  //         id: 3,
  //         title: "Complete training",
  //         desc: "Learn the complete training course by April",
  //         strikeOff: false,
  //       },
  //     ],

  //     selectedItems: [],

  //   };
  // },

  // computed: {
  //   listToDo() {
  //     return this.todolist;
  //   },
  // },

  // methods: {
  //   addItem(title, desc) {
  //     const newItem = {
  //       id: new Date().toISOString(),
  //       title: title,
  //       desc: desc,
  //       strikeOff: false,
  //     };

  //     this.todolist.unshift(newItem);
  //     localStorage.setItem("todos", JSON.stringify(this.todolist));
  //     this.$router.push("/");

  //     this.updateLocalStorage();
  //   },

  //   editItem(index, title, desc) {
  //     this.todolist[index].title = title;
  //     this.todolist[index].desc = desc;
  //     localStorage.setItem("todos", JSON.stringify(this.todolist));
  //     this.$router.push("/");
  //     this.updateLocalStorage();
  //   },

  //   deleteItem(itemIdList) {
  //     if (
  //       this.selectedItems.length > 1 &&
  //       this.selectedItems.includes(itemIdList[0])
  //     ) {
  //       itemIdList = [...this.selectedItems];
  //       this.selectedItems = [];
  //     }

  //     itemIdList.map((itemId) => {
  //       const idx = this.todolist.findIndex((res) => res.id === itemId);
  //       this.todolist.splice(idx, 1);
  //     });
  //     this.updateLocalStorage();
  //   },

  //   toggleComplete(itemId) {
  //     const idx = this.todolist.findIndex((res) => res.id === itemId);
  //     this.todolist[idx].strikeOff = !this.todolist[idx].strikeOff;
  //     this.updateLocalStorage();
  //   },

  //   toggleSelectedItem(itemId) {
  //     const idx = this.selectedItems.findIndex((id) => id === itemId);
  //     if (idx < 0) this.selectedItems.push(itemId);
  //     else this.selectedItems.splice(idx, 1);
  //   },

  //   updateLocalStorage() {
  //     localStorage.setItem("todos", JSON.stringify(this.todolist));
  //   },
  // },

  // provide() {
  //   return {
  //     // todolist: ref(this.todolist),
  //     deleteItem: this.deleteItem,
  //     addItem: this.addItem,
  //     editItem: this.editItem,
  //     toggleComplete: this.toggleComplete,
  //     selectedItems: this.selectedItems,
  //     toggleSelectedItem: this.toggleSelectedItem,

  //   };
  // },

  // watch: {
  //   // todolist: {
  //   //   deep: true,

  //   //   handler() {
  //   //     localStorage.setItem("todos", JSON.stringify(this.todolist));
  //   //     // console.log("old = ", old);
  //   //     // console.log("new = ", newList);
  //   //   },
  //   // },

  //   listToDo(newList) {
  //     console.log("new list from watcher - ", newList);
  //   },
  // },

  // mounted() {
  //   if (localStorage.getItem("todos")) {
  //     const data = JSON.parse(localStorage.getItem("todos"));
  //     console.log("list from storage - ", data);
  //     this.todolist = data;
  //     console.log(this.todolist);
  //   }
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
