import React, {Component} from 'react';
import { PostWrapper, Navigate, Post } from '../../components';
import * as service from '../../services/company';

class PostContainer extends Component {
    componentDidMount(){
        this.fetchCompanyInfo();
    }

    fetchCompanyInfo = async () => {
        // const post = await service.getPost(1);
        // console.log(post);
        const companyList = await service.getCompanyList();
        console.log(companyList);
        // const comments = await service.getComments(postId);
        // console.log(comments);
    };

    render() {
        return (
            <PostWrapper>
                <Navigate/>
                <Post/>
            </PostWrapper>
        );
    }
}

export default PostContainer;