<template>
    <div class="container">
        <h1 v-if="showingPatient.length != 0">{{ showingPatient }}'s Health Data</h1>
        <h1 v-if="showingPatient.length === 0">Patient Health Data</h1>
        <div class="nav">
            <button v-on:click="get_data('win')">Win</button>
            <button v-on:click="get_data('iris')">Iris</button>
            <button v-on:click="get_data('ben')">Ben</button>
            <p>{{ names }}</p>
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
    </div>
</template>

<script>
import PostService from "../PostService";

export default {
    name: "PostComponent",
    data() {
        return {
            posts: [], // to be filled with the data from the backend
            error: "",
            names: [],
            showingPatient: "",
        };
    },
    async created() {
        try {
            this.names = await PostService.getTableName();
            var temp = await PostService.setWarn(this.names);
            console.log(temp);
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        async get_data(names) {
            try {
                this.posts = await PostService.getPosts(names);
                this.showingPatient = names.charAt(0).toUpperCase() + names.slice(1);
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
