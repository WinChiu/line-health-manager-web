<template>
  <div class="container">
    <h1 v-if="showingPatient.length != 0">{{ showingPatient }}'s Health Data</h1>
    <h1 v-if="showingPatient.length === 0">Patient Health Data</h1>
    <div class="nav">
      <button id="Win" v-on:click="get_data('win')">Win</button>
      <button id="Iris" v-on:click="get_data('iris')">Iris</button>
      <button id="Ben" v-on:click="get_data('ben')">Ben</button>
      <p track-by="$index">Warning: {{ warnedPatients}}</p>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="post-container">
      <div
        class="post"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post.id"
        v-for="(post, index) in posts"
        track-by="$index"
      >
        <h3 class="infoTitle" :class="post.Name">Date:</h3>
        <p id="Date" class="infoData" :class="post.Name">{{ post.Date }}</p>
        <h3 class="infoTitle" :class="post.Name">SBP:</h3>
        <p id="SBP" class="infoData" :class="post.Name">{{ post.SBP }}</p>
        <h3 class="infoTitle" :class="post.Name">DBP:</h3>
        <p id="DBP" class="infoData" :class="post.Name">{{ post.DBP }}</p>
        <h3 class="infoTitle" :class="post.Name">BloodSugar:</h3>
        <p id="BloodSugar" class="infoData" :class="post.Name">{{ post.BloodSugar }}</p>
        <h3 class="infoTitle" :class="post.Name">WalkStep:</h3>
        <p
          id="WalkStep"
          class="infoData"
          :class="post.Name"
          v-if="nowWarnPatient === {} ||nowWarnPatient.WalkStep.find(el=>el===post.WalkStep)===undefined"
        >{{ post.WalkStep }}</p>
        <p
          id="WalkStep"
          class="infoData warnData"
          :class="post.Name"
          v-else-if="nowWarnPatient.WalkStep.find(el=>el===post.WalkStep)"
        >{{ post.WalkStep }}</p>
        <h3 class="infoTitle" :class="post.Name">SleepTime:</h3>
        <p id="SleepTime" class="infoData" :class="post.Name">{{ post.SleepTime }}</p>
        <h3 class="infoTitle" :class="post.Name">DoctorID:</h3>
        <p id="DocID" class="infoData" :class="post.Name">{{ post.DocID }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
import $ from "jquery";

export default {
  name: "PostComponent",
  data() {
    return {
      posts: [], // to be filled with the data from the backend
      error: "",
      names: [],
      showingPatient: "",
      warnedPatients: [],
      nowWarnPatient: {},
    };
  },
  async created() {
    try {
      this.names = await PostService.getTableName();
      this.warnedPatients = await PostService.setWarn(this.names);
      this.warnedPatients.forEach((el) => {
        $(`#${el.Name}`).css("background-color", "red");
      });
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    isWarned() {
      let getIt = false;
      this.warnedPatients.forEach((el) => {
        if (el.Name === this.showingPatient) {
          getIt = true;
          this.nowWarnPatient = el;
        }
      });
      if (!getIt) {
        this.nowWarnPatient = {
          Name: "no",
          SBP: [],
          DBP: [],
          BloodSugar: [],
          WalkStep: [],
          SleepTime: [],
        };
      }
    },
    async get_data(names) {
      try {
        this.posts = await PostService.getPosts(names);
        this.showingPatient = names.charAt(0).toUpperCase() + names.slice(1);
        this.isWarned();
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  /* border: solid black 2px; */
  font-family: 微軟正黑體;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}
.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: 3bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
h3 {
  display: inline-block;
  width: 10%;
}
p {
  display: inline-block;
  width: 90%;
  color: black;
  background-color: #fff;
}
button {
  width: 80px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  background-color: #ebebeb;
}

.warnData {
  color: white;
  background-color: red;
}

.infoData {
  width: 80%;
}

.infoTitle {
  width: 20%;
}
</style>
