<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
  <!-- <div ref="test" v-show="show" v-observe-visibility="visibilityChanged">Hello world!</div>
  <div v-observe-visibility="handleInfinityScroll"></div> -->
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
  
  import { defineComponent, ref, onMounted } from "vue";
  import axios from "axios";
  
  export default defineComponent({
    name: "Home",
  
    components: {},
  
    setup() {
      const allCourses = ref<Course[]>([]);
  
      const fecthAllCourses = async () => {
        let courses = await axios.get(
          `http://localhost:8000/api/v1/marketplace/courses?lastId=0`
        );
  
        allCourses.value = courses.data.body;
      };
  
      const bottomIsVisible = ref(true);
      const show = ref(true);
  
      const visibilityChanged = (isVisible: boolean, entry: unknown) => {
        bottomIsVisible.value = isVisible;
        console.log(entry)
      };
  
      const handleInfinityScroll = () => {
        console.log("fetch more stuff");
      };
  
      onMounted(() => {
        fecthAllCourses();
      });
  
      return {
        allCourses,
        visibilityChanged,
        handleInfinityScroll,
        show,
      };
    },
  });
  </script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
