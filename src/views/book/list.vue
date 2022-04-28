<template>
  <div style="padding:15px">
    <el-form ref="form" :model="form" label-width="80px" inline>
      <el-form-item>
        <el-input v-model="model" placeholder="书名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="model" placeholder="作者" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="model" placeholder="分类">
          <el-option label="label" value="value" />
        </el-select>
      </el-form-item>
      <el-button type="primary">查询</el-button>
      <el-button type="primary">新增</el-button>
      <el-form-item label="显示封面">
        <el-checkbox-group v-model="model">
          <el-checkbox label="" name="显示封面" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-table
      border
      :data="data"
      style="width: 100%"
    >
      <el-table-column
        prop="prop"
        label="ID"
        width="width"
      />
      <el-table-column
        prop="prop"
        label="书名"
        width="width"
      />
      <el-table-column
        prop="prop"
        label="作者"
        width="width"
      />
      <el-table-column
        prop="prop"
        label="出版社"
        width="width"
      />
      <el-table-column
        prop="prop"
        label="分类"
        width="width"
      />
      <el-table-column
        prop="prop"
        label="语言"
        width="width"
      />
      <el-table-column
        prop="prop"
        label="封面"
        width="width"
      />
      <el-table-column
        prop="prop"
        label="上传人"
        width="width"
      />
      <el-table-column
        prop="prop"
        label="上传时间"
        width="width"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
      >
        <template slot-scope="">
          <el-button type="primary" icon="el-icon-show" />
          <el-button type="warning" icon="el-icon-edit" />
          <el-button type="danger" icon="el-icon-delete" />
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'List'
}
</script>

<style>

</style>
