<template>
  <div class="list-container">
    <el-form ref="listQuery" inline :model="listQuery" label-width="80px">
      <el-form-item>
        <el-input
          v-model="listQuery.title"
          placeholder="书名"
          clearable
          @keyup.enter="handleFilter"
          @clear="handleFilter"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="listQuery.author"
          placeholder="作者"
          clearable
          @keyup.enter="handleFilter"
          @clear="handleFilter"
        />
      </el-form-item>
      <el-form-item label="分类">
        <el-select
          v-model="listQuery.category"
          placeholder="分类"
          clearable
          @change="handleFilter"
        >
          <el-option
            :value="cate.value"
            v-for="cate in catelogue"
            :key="cate.label"
            >{{ cate.label }} ({{ cate.num }})</el-option
          >
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
    </el-form>
    <el-table
      :data="bookList"
      border
      :default-sort="defaultSort"
      @sort-change="sortChange"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="80"
        align="center"
        sortable="custom"
      >
      </el-table-column>
      <el-table-column prop="title" label="书名">
        <template slot-scope="{ row }">
          <span v-html="row.title"></span>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者">
        <template slot-scope="{ row }">
          <span v-html="row.author"></span>
        </template>
      </el-table-column>
      <el-table-column prop="publisher" label="出版社"> </el-table-column>
      <el-table-column prop="categoryText" label="分类"> </el-table-column>
      <el-table-column prop="language" label="语言" width="80">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-sizes="[10, 15, 30, 50, 100]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      style="text-align: center; margin-top: 15px"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getCategory, listBook } from "@/api/book";
export default {
  name: "BookList",
  data() {
    return {
      bookList: [],
      listQuery: {
        title: "",
        author: "",
        category: "",
        pageNum: 1,
        pageSize: 10,
        sort: "+id",
      },
      defaultSort: {},
      catelogue: [],
      totalCount: 0,
    };
  },
  mounted() {
    this.getCategoryList();
    this.getList();
  },
  methods: {
    async getCategoryList() {
      let res = await getCategory();
      const { code, data } = res;
      if (code === 0) {
        this.catelogue = data;
      }
    },
    async getList() {
      const { listQuery: query } = this;
      this.catelogue.forEach((ele) => {
        if (query.category === ele.label) {
          query.category = ele.value;
        }
      });
      let result = await listBook(query);
      const { code, data } = result;
      if (code === 0) {
        this.bookList = data.list;
        this.bookList.forEach((item) => {
          item.title = this.warpperKeyword("title", item.title);
          item.author = this.warpperKeyword("author", item.author);
        });
        this.totalCount = data.count;
      }
    },
    sortChange(row) {
      const { order, prop } = row;
      if (order === "ascending") {
        this.listQuery.sort = `+${prop}`;
      } else {
        this.listQuery.sort = `-${prop}`;
      }
      this.getList();
    },
    handleSizeChange(size) {
      this.listQuery.pageSize = size;
      this.getList();
    },
    handleCurrentChange(page) {
      this.listQuery.pageNum = page;
      this.getList();
    },
    handleFilter() {
      this.getList();
    },
    handleCreate() {
      this.$router.push("/book/create");
    },
    warpperKeyword(k, v) {
      function heightLight(v) {
        return `<span style="color:#1890ff">${v}</span>`;
      }
      if (!this.listQuery[k]) {
        return v;
      } else {
        return v.replace(new RegExp(this.listQuery[k], "ig"), (v) =>
          heightLight(v)
        );
      }
    },
    handleEdit(row) {
      this.$router.push(`/book/edit/${row.fileName}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
}
</style>
