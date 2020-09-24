import axios from "axios";

//const url = 'http://localhost:5000/api/posts/';
const url = 'api/posts/';


class PostService {
    static async getPosts(name) {
        const res = await axios.get(url + `${name}`);
        try {
            const data = res.data
            return data.map(post => ({
                ...post,
                createdAt: new Date(post.createdAt)
            }))
        } catch (err) {
            return err
        }
    }
    static async getTableName() {
        const nameList = await axios.get(url);
        try {
            const data = nameList.data;
            var tempList = [];
            data.forEach(el => {
                tempList.push(el.Tables_in_vsine0ibs4j6lk5u);
            })
            return tempList;
        } catch (err) {
            return err
        }
    }
    static async setWarn(names) {
        let temp = await axios.post(url + "setwarn", {
            names
        });
        return temp.data
    }
}


export default PostService;