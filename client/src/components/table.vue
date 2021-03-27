<template>
  <div>
    <table id="calendar" class="calendar paper">
      <thead>
        <tr>
          <th width="15%">code</th>
          <th width="45%" style="position: relative">
            Title
            <div class="sortBtns">
              <button class="border" @click="handleSortType('D')">
                <i class="fas fa-long-arrow-alt-down"></i>
              </button>
              <button class="border" @click="handleSortType('U')">
                <i class="fas fa-long-arrow-alt-up"></i>
              </button>
            </div>
          </th>
          <th width="15%">Author</th>
          <th width="15%">Status</th>
        </tr>
      </thead>
      <tbody id="tbody">
        <tr v-for="(item, index) in sortedList" :key="index">
          <td>
            <div>{{ item.isbn }}</div>
          </td>
          <td>
            <div>{{ item.title }}</div>
          </td>
          <td>
            <div>{{ item.author }}</div>
          </td>
          <td>
            <button
              v-if="item.status === true"
              class="status__BP"
              @click="handleBorrow(index)"
            >
              대여하기
            </button>
            <button
              v-else-if="item.status === false"
              class="status__BG"
              @click="handleBorrow(index)"
            >
              반납하기
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    bookdata: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      type: "",
    };
  },
  computed: {
    sortedList() {
      return this.handleSortTitle(this.type);
    },
  },
  methods: {
    handleBorrow(index) {
      this.$emit("borrowBook", index);
    },
    handleSortTitle(type) {
      if (type === "D") {
        return this.bookdata.sort(function (a, b) {
          return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        });
      } else if (type === "U") {
        return this.bookdata.sort(function (a, b) {
          return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
        });
      } else {
        return this.bookdata;
      }
    },
    handleSortType(type) {
      this.type = type;
    },
  },
};
</script>
