const db = require("../models");
const Post = db.post;
const User = db.user;

exports.createPostWaste = (req, res) => {
    const post = new Post({
        ...req.body, //address, lat, lng, type, weight
        status: true,
        owner: req.body.user.id,
        assignTo: null,
    });


    post.save((err, post) => {
        if(err){
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: "Post was created successfully!" });
    });
};

exports.confirmPostWaste = async(req,res) => {
    try {
        const post = await Post.findOne({ _id: req.body.post.id});
        if(!post){
            return res.status(404).send()
        }

        // accept
        if(req.body.status){
            const userId = post["owner"].toString();
            const user = await User.findOne({ _id: userId});

            if(!user){
                return res.status(404).send();
            }
            else{
                user["awardPoint"] = user["awardPoint"] + post["weight"] * 1/4;
                post["status"] = true;

                await user.save()
                await post.save()

                return res.send(user)
            }
            return res.send(user);
            
        }
        else{
            post["status"] = false;
            await post.save()

            return res.send(user)
        }

    }
    catch (error) {
        res.status(400).send(error)
    }
};
