<template>
  <div class="container">
    <el-upload
      class="upload-demo"
      :headers="headers"
      drag
      :action="bookUploadPath"
      :multiple="false"
      :auto-upload="true"
      :on-success="uploadBook"
      :on-error="uploadBookError"
      :on-remove="removeBoook"
      :before-upload="uploadBookBefore"
      :before-remove="removeBoookBefore"
      :on-exceed="exceedBook"
      :file-list="fileList"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传 epub 文件</div>
    </el-upload>
    <img :src="imgUrl" alt="">
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'BookUpload',
  data() {
    return {
      bookUploadPath: 'http://localhost:5000/book/upload',
      fileList: [],
      imgUrl: ''
    }
  },
  computed: {
    headers() {
      return { Authorization: `Bearer ${getToken()}` }
    }
  },
  methods: {
    removeBoook(file) {
      console.log('removeBoook', file)
    },
    removeBoookBefore(file) {
      console.log('removeBoookBefore', file)
    },
    exceedBook(file, fileList) {
      console.log('exceedBook', file)
      this.fileList = fileList
    },
    uploadBookBefore(file) {
      console.log('exceedBook', file)
    },
    uploadBook(file) {
      console.log('uploadBook', file)
      const { data } = file
      this.imgUrl = data.url
    },
    uploadBookError(file) {
      console.log('exceedBook', file)
    }
  }
}
</script>

<style lang='scss'>
.upload-demo {
  .el-upload.el-upload--text,
  .el-upload-dragger,
  .el-upload__tip {
    width: 100%;
    text-align: center;
  }
}
</style>
