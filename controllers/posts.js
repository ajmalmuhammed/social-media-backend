import Post from "../models/Post.js";


//create post 
export const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);

        //adding the user id which we get from jwt token
        newPost.userId = req.user.userid;
        console.log(req.user);
        const savedPost = await newPost.save();
        const response = { "Status": "Success", "Details": savedPost }
        return res.status(200).json(response);
    }
    catch (err) {
        const response = { "Status": "Failure", "Reason": err.message }
        return res.status(400).send(response)
    }

}

//like a post 
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //checking whether the person has already liked the post
        if (!post.likes.includes(req.body.user_id)) {
            await post.updateOne({ $push: { likes: req.body.user_id } });
            const response = { "Status": "Success", "Details":"Post succesfully liked", "Like count" : post.likes.length+1 }
            return res.status(200).json(response);            
        } else {
            const response = { "Status": "Failure", "Details": "You have already liked this post" }
            return res.status(200).json(response);
        }
    }
    catch (err) {
        const response = { "Status": "Failure", "Reason": err.message }
        return res.status(400).send(response)
    }
}

//delete a post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //checking whether the post id belongs to the current user
        if (post.userId == req.body.user_id) {
            await post.deleteOne();
            return res.send({ "Status": "Success", "key":"Post succesfully deleted" });
            
        } else {
            const response = { "Status": "Failure", "Details": "You can delete only your post" }
            return res.status(200).json(response);
        }
    }
    catch (err) {
        const response = { "Status": "Failure", "Reason": err.message }
        return res.status(400).send(response)
    }
}