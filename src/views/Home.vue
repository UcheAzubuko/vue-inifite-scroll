<template>
  <div class="home">
    <ul >
      <li v-for="course in allCourses" :key="course?.id">
        <p>summmary: {{ course.titleSummary }}</p>
        <p>store name: {{ course.companyName }}</p>
        <p>title: {{ course.courseTitle }}</p>
        <p>level: {{ course.courseLevel }}</p>
        <p>{{ course.currency }} {{ course.price }}</p>
        <p>{{ course.discount }}% discount</p>
        <p>id: {{ course.id }}</p>
      </li>
    </ul>
    <!-- <Observer /> -->
  </div>
</template>

<script lang="ts">
type Course = {
  id: string;
  courseTitle: string;
  titleSummary: string;
  companyName: string;
  price: string;
  courseLevel: string;
  discount: string;
  duration: string;
  currency: string;
  fileUrl: string;
};

import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Home",

  setup() {
    const allCourses = ref<Course[]>([]);

    const fecthAllCourses = async () => {
      let courses = await axios.get(
        `http://localhost:8000/api/v1/marketplace/courses?lastId=0`
      );

      allCourses.value = courses.data.body;
      console.log(((allCourses.value[allCourses.value.length - 1]).id).toString());
    };

    const loadMoreCourses = async () => {
      let lastId = (allCourses.value[allCourses.value.length - 1].id).toString();
      let courses = await axios.get(
        `http://localhost:8000/api/v1/marketplace/courses?lastId=${lastId}`
      );
    };


    return {
      allCourses,
    };
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  gap: 25px;
  width: 100%;
}

li {
  padding: 10px 20px;
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(66, 71, 76, 0.32),
    0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #eeeeee;
  border-radius: 8px;
}
</style>
