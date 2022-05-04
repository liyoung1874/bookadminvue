
<template>
  <BookDetail :isEdit="false" />
</template>

<script>
import BookDetail from "@/views/book/components/detail.vue";
export default {
  name:'BookCreate',
  components: { BookDetail },
}
</script>

<style lang="scss" scoped>

</style>
