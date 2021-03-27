<template>
  <div class="hello">
    <div>
      <div class="container">
        <div>
          <div class="topBox">
            <div class="search">
              <select v-model="option">
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="code">Code</option>
              </select>
              <div class="border">
                <input type="text" :value="search" @input="updateInput" />
              </div>
            </div>
          </div>
          <book-table
            :bookdata="filteredList"
            @borrowBook="borrowBook"
          ></book-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bookTable from "./table";
import axios from "axios";
const data_url = "http://localhost:8899/";

export default {
  name: "HelloWorld",
  components: {
    bookTable,
  },
  data() {
    return {
      search: "",
      option: "title",
      listArr: [],
      originData: [],
      listCnt: 10,
    };
  },
  computed: {
    filteredList() {
      return this.listArr.filter((post) => {
        return this.option !== "code"
          ? post[`${this.option}`]
              .toLowerCase()
              .includes(this.search.toLowerCase())
          : String(post["isbn"]).includes(this.search);
      });
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get(data_url).then((res) => {
        this.originData = res.data;
        this.listArr = this.originData.concat().map((item) => {
          return { ...item, status: true };
        });
      });
    },
    borrowBook(index) {
      this.filteredList[index].status = !this.filteredList[index].status;
    },
    updateInput(event) {
      let updatedText = event.target.value;
      this.search = updatedText;
    },
  },
};
</script>
