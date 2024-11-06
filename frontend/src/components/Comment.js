import React from "react";

const Comment = ({ author, date, comment }) => (
    <div>
        <p><strong>{author}</strong> - {new Date(date).toLocaleDateString()}</p>
        <p>{comment}</p>
    </div>
);

export default Comment;