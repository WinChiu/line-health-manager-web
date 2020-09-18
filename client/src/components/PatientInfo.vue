<template>
    <!-- <div class="container">
    <h1 v-if="name.length!=0">{{ name }}'s Health Data</h1>
    <h1 v-if="name.length===0">Patient Health Data</h1>
    <div class="nav">
      <button v-on:click="get_data('win')">Win</button>
      <button v-on:click="get_data('iris')">Iris</button>
      <button v-on:click="get_data('ben')">Ben</button>
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
        <h3>Date:</h3>
        <p>{{ post.Date }}</p>
        <h3>SBP:</h3>
        <p>{{ post.SBP }}</p>
        <h3>DBP:</h3>
        <p>{{ post.DBP }}</p>
        <h3>BloodSugar:</h3>
        <p>{{ post.BloodSugar }}</p>
        <h3>WalkStep:</h3>
        <p>{{ post.WalkStep }}</p>
        <h3>SleepTime:</h3>
        <p>{{ post.SleepTime }}</p>
        <h3>DoctorID:</h3>
        <p>{{ post.DocID }}</p>
      </div>
    </div>
  </div> -->
    <div>
        <div class="nav">
            <button v-on:click="get_data('win'), initCharts()">Win</button>
            <button v-on:click="get_data('iris')">Iris</button>
            <button v-on:click="get_data('ben')">Ben</button>
        </div>

        <div ref="myChart" id="mychart" style="width: 50%; height: 400px;"></div>
    </div>
</template>

<script>
import PostService from "../PostService";
import echarts from "echarts";

export default {
    name: "PostComponent",

    data() {
        return {
            posts: [], // to be filled with the data from the backend
            error: "",
            name: "",
        };
    },
    mounted() {
        this.initCharts();
        console.log("ho");
    },
    methods: {
        async get_data(name) {
            try {
                this.posts = await PostService.getPosts(name);
                this.name = name.charAt(0).toUpperCase() + name.slice(1);
                console.log(this.posts.Name);
            } catch (err) {
                this.error = err.message;
            }
        },
        initCharts() {
            this.chart = echarts.init(this.$refs.myChart);
            this.setOptions();
            // console.log(this.posts.Date);
        },
        setOptions() {
            this.chart.setOption({
                title: {
                    text: "血糖",
                },
                xAxis: {
                    data: [0,20,40,60,80,100]
                },
                yAxis: {
                    // data: [0,20,40,60,80,100]
                },
                series: [
                    {
                        name: " 血糖",
                        type: "line",
                        data: [0,20,40,60,80,100]
                    },
                ],
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
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
}
button {
    width: 80px;
    height: 30px;
    font-size: 18px;
    cursor: pointer;
}
</style>
