import React from 'react';
import './Post.css';
import { CommentList } from '../';

const Post = ({title, phone, regDate, commentList}) => (
    <div className="Post">
        <h1>{title}</h1>
        <p>
            {phone}
        </p>
        <p>
            {regDate}
        </p>
        <CommentList commentList={commentList}/>
    </div>
);

export default Post;