<template>
  <div class="list-container">
    <el-form ref="listQuery" inline :model="listQuery" label-width="80px">
      <el-form-item>
        <el-input v-model="listQuery.title"
          placeholder="书名"
          clearable
          @keyup.enter="handleFilter"
          @clear="handleFilter"
        />
      </el-form-item>
      <el-form-item>
        <el-input v-model="listQuery.author"
          placeholder="作者"
          clearable
          @keyup.enter="handleFilter"
          @clear="handleFilter"
        />
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="listQuery.catelogue" placeholder="分类">
          <el-option :value="cate" v-for="cate in catelogue" :key="cate"
            @change="handleFilter"
          >{{cate}}</el-option>
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
      border>
      <el-table-column
        prop="prop"
        label="ID"
        width="width">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[15, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import { getCategory } from '@/api/book'
export default {
  name:'BookList',
  data(){
    return {
      listQuery:{
        title:'',
        author:'',
        catelogue:'',
      },
      catelogue:[
          'lll',
          'l1l',
          'll2',
          'll3'
        ],
      pageNum:1,
      pageSize:30,
      totalCount: 0,
      bookList:[],
    }
  },
  mounted(){
    this.getCategoryList();
  },
  methods:{
    async getCategoryList(){
      let res = await getCategory();
      const { code, data } = res;
      if(code === 0){
        this.catelogue = data
      }
    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    handleFilter(){
      console.log('handleFilter');
    },
    handleCreate(){
      this.$router.push('/book/create');
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container{
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
}
</style>
