import React from 'react';
import './CommentList.css';
import { Comment } from '../';

const CommentList = ({commentList}) => {
    const comments = commentList.map(
        (comment, index) => (
            <Comment
                name={comment.email.split('@')[0]}
                body={comment.body}
                key={index}
            />
        )
    )
    return (
        <ul className="CommentList">
            {comments}
        </ul>
    );
};


export default CommentList;