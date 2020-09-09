import axios from "axios";

const url = 'http://localhost:5000/api/posts/';

class PostService {
    // Get Post
    static async getPosts(name) {
        const res = await axios.get(url+`${name}`);
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
}

export default PostService;