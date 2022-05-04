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
        <el-button v-show="!isEdit"> 显示帮助 </el-button>
        <el-button type="success"  
          @click="submitBookForm">
          {{ isEdit ? "编辑电子书" : "新增电子书" }}
        </el-button>
      </Sticky>
      <div class="detail-container">
        <el-row>
          <BookUpload
            @uploadBookSuccess="uploadBookSuccess"
            @removeBoook="removeBoook"
          />
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="title" required>
              <MDinput v-model="bookForm.title">书名:</MDinput>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="author" label="作者" required>
              <el-input v-model="bookForm.author" placeholder="作者"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="publisher" label="出版社" required>
              <el-input
                v-model="bookForm.publisher"
                placeholder="出版社"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="language" label="语言" required>
              <el-input
                v-model="bookForm.language"
                placeholder="语言"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="根文件">
              <el-input
                v-model="bookForm.path"
                placeholder="根文件"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="文件路径">
              <el-input
                v-model="bookForm.filePath"
                placeholder="文件路径"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="解压路径">
              <el-input
                v-model="bookForm.unzipPath"
                placeholder="解压路径"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="封面路径">
              <el-input
                v-model="bookForm.coverPath"
                placeholder="封面路径"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件名称">
              <el-input
                v-model="bookForm.originalName"
                placeholder="文件名称"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="封面">
              <a :href="bookForm.cover" target="_blank">
                <img
                  v-if="bookForm.cover"
                  :src="bookForm.cover"
                  style="width: 200px"
                />
                <span v-else>无</span>
              </a>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="目录">
              <div v-if="contentTree">
                <el-tree
                  :data="contentTree"
                  :props="defaultProps"
                  @node-click="contentsTreeClick"
                >
                </el-tree>
              </div>
              <span v-else>无</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from "@/components/Sticky";
import BookUpload from "@/components/Upload/BookUpload";
import MDinput from "@/components/MDinput";
import { createBook, updateBook } from "@/api/book";

const defaultForm = {
  author: "",
  category: "",
  categoryText: "",
  contents: "",
  contentTree: "",
  cover: "",
  coverPath: "",
  fileName: "",
  filePath: "",
  language: "",
  originalName: "",
  path: "",
  publisher: "",
  rootFile: "",
  title: "",
  unzipPath: "",
  unzipUrl: "",
  url: "",
};

const fields = {
  author: "作者",
  language: "语言",
  publisher: "出版社",
  title: "书名",
}

export default {
  name: "Detail",
  components: { Sticky, BookUpload, MDinput },
  props: {
    isEdit: {
      type: Boolean,
    },
  },
  data() {
    const handleValidate = (rule, value, callback) => {
      if(value === ''){
        callback( new Error(fields[rule.field] + '必须填写'))
      }else{
        callback()
      }
    }
    return {
      bookForm: {},
      rules: {
        title:[{ validator: handleValidate }],
        author:[{ validator: handleValidate }],
        publisher:[{ validator: handleValidate }],
        language:[{ validator: handleValidate }],
      },
      contentTree: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    contentsTreeClick(data) {
      if (data.text) {
        window.open(data.text);
      }
    },
    setBookData(data) {
      const {
        author,
        category,
        categoryText,
        contents,
        contentTree,
        cover,
        coverPath,
        fileName,
        filePath,
        language,
        originalName,
        path,
        publisher,
        rootFile,
        title,
        unzipPath,
        unzipUrl,
        url,
      } = data;
      this.bookForm = {
        ...this.bookForm,
        author,
        category,
        categoryText,
        contents,
        cover,
        coverPath,
        fileName,
        filePath,
        language,
        originalName,
        path,
        publisher,
        rootFile,
        title,
        unzipPath,
        unzipUrl,
        url,
      };
      this.contentTree = contentTree;
    },
    uploadBookSuccess(data) {
      this.setBookData(data);
    },
    removeBoook() {
      this.bookForm = Object.assign({},defaultForm);
      this.contentTree = [];
    },
    submitBookForm(){
      this.$refs.bookForm.validate((valid,field) => {
        if (valid) {
          const book = {...this.bookForm};
          delete book.contents;
          delete book.contentTree;
          if(this.isEdit){
            updateBook(book);
          }else{
            createBook(book);
          }
        } else {
          const message = field[Object.keys(field)[0]][0].message;
          this.$message({message, type:'error'});
          return false
        }
      })
    }
  },
};
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
