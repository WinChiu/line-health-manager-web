<template>
    <div class="container">
        <h1>{{ name }}'s Health Data</h1>
        <!-- <div class="create-post">
            <input type="text" id="create-post" v-model="name" placeholder="Patient Name" />
            <button v-on:click="getData()">Get Data</button>
        </div> -->
        <hr />
        <p class="error" v-if="error">{{ error }}</p>
        <div class="post-container">
            <div
                class="post"
                v-bind:item="post"
                v-bind:index="index"
                v-bind:key="post.id"
                v-for="(post, index) in posts"
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
            name: "win",
        };
    },
    async created() {
        try {
            this.posts = await PostService.getPosts(this.name);
        } catch (err) {
            this.error = err.message;
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
