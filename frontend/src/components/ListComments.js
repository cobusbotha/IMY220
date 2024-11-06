<<<<<<< HEAD
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
=======
import React from "react";
import Comment from "./Comment";

class ListComments extends React.Component {
    render() {
        const { comments } = this.props;
        return (
            <div>
                <h3>Comments</h3>
                {comments.map((comment, index) => (
                    <div key={ index }>
                        <Comment author={ comment.author } comment={ comment.comment } />
                    </div>
                ))}
            </div>
        );
    }
}
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

export default ListComments;