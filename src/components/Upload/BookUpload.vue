<template>
  <div class="container">
    <el-upload
      class="upload-demo"
      :headers="headers"
      drag
      :action="bookUploadPath"
      :multiple="false"
      :limit="1"
      :auto-upload="true"
      :on-success="uploadBook"
      :on-remove="removeBoook"
      :on-exceed="exceedBook"
      :file-list="fileList"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传 epub 文件</div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: "BookUpload",
  data() {
    return {
      bookUploadPath: "http://localhost:5000/book/upload",
      fileList: [],
      imgUrl: "",
    };
  },
  computed: {
    headers() {
      return { Authorization: `Bearer ${getToken()}` };
    },
  },
  methods: {
    removeBoook() {
      this.fileList = [];
      this.$emit('removeBoook');
      this.$message({
          type: "success",
          message: "电子书移除成功",
      });
    },
    exceedBook() {
      this.$message({
          type: "warning",
          message: "上传数量超出限制，一次只能上传一本电子书",
      });
    },
    uploadBook(response, file) {
      const { code, data } = response;
      if (code !== 0) {
        this.$message({
          type: "error",
          message: "上传电子书失败",
        });
      } else {
        this.$emit("uploadBookSuccess", data);
        this.$message({
          type: "success",
          message: "上传电子书成功",
        });
      }
    },
  },
};
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
