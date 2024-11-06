// ListComments.js
import React from "react";
import Comment from "./Comment";

const ListComments = ({ comments }) => (
    <div>
        <h3>Comments</h3>
        {comments.map((comment, index) => (
            <Comment key={index} author={comment.author} date={comment.date} comment={comment.comment} />
        ))}
    </div>
);

export default ListComments;