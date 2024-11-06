import React from "react";

<<<<<<< HEAD
const Comment = ({ author, date, comment }) => (
    <div>
        <p><strong>{author}</strong> - {new Date(date).toLocaleDateString()}</p>
        <p>{comment}</p>
    </div>
);
=======
class Comment extends React.Component {
    render() {
        const { author, comment } = this.props;
        return(
            <div>
                <p>{ author } : { comment }</p>
            </div>
        );
    }
}
>>>>>>> 204efbb1852ba6fca94daa06dbf378111b31df94

export default Comment;