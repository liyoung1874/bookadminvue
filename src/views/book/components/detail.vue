<template>
  <div class="detail">
    <el-form
      ref="bookForm"
      :model="bookForm"
      :rules="rules"
      label-width="80px"
      class="form-container"
    >
      <Sticky :z-index="10" :class-name="'sub-navbar'">
        <el-button v-show="!isEdit">
          显示帮助
        </el-button>
        <el-button type="success">
          {{ isEdit ? '编辑图书' : '添加图书' }}
        </el-button>
      </Sticky>
      <div class="detail-container">
        <el-row :gutter="10">
          <!-- <el-col :span="24" /> -->
          <BookUpload />
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24" />
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import BookUpload from '@/components/Upload/BookUpload'
export default {
  name: 'Detail',
  components: { Sticky, BookUpload },
  props: {
    isEdit: {
      type: Boolean
    }
  },
  data() {
    return {
      bookForm: {},
      rules: {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.detail {
  position: relative;
  .detail-container {
    padding: 40px 45px 20px 50px;
    .preview-img {
      width: 200px;
      height: 270px;
    }
    .contents-wrapper {
      padding: 5px 0;
    }
  }
}
</style>
