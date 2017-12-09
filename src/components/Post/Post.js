import React, {Component} from 'react';
import './Post.css';
import { CommentList } from '../';
//
// const Post = ({title, phone, regDate, commentList}) => (
//     <div className="Post">
//         <h1>{title}</h1>
//         <p>
//             {phone}
//         </p>
//         <p>
//             {regDate}
//         </p>
//         <CommentList commentList={commentList}/>
//     </div>
// );

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyInfo: {
                title: null,
                phone: null,
                regDate : null,
                commentList: []
            },
            animate: false,
            direction: 'left'
        }
    }


    componentWillReceiveProps (nextProps){
        const {title, phone, regDate, commentList} = nextProps;

        if(this.props.companyId !== nextProps.companyId) {
            // identify the animation direction
            const direction = this.props.companyId < nextProps.companyId ? 'left' : 'right';
            this.setState({
                direction,
                animate: true
        });

            // sync the props to state 0.5 sec later
            setTimeout(
                () => {
                    this.setState({
                        companyInfo: {
                            title, phone, regDate, commentList
                        },
                        animate: false
                    })
                }, 500
            );
            return;
        }

        // sync the props to state directly (this is the first post)
        this.setState({
            companyInfo: {
                title, phone, regDate, commentList
            }
        })
    }

    render() {
        const { title, phone, regDate, commentList } = this.state.companyInfo;

        const { animate, direction } = this.state;

        const animation = animate
            ? (direction==='left' ? 'bounceOutLeft' : 'bounceOutRight')
            : (direction==='left' ? 'bounceInRight' : 'bounceInLeft');

        // show nothing when data is not loaded
        if(title===null) return null;

        return (
            <div className={`Post animated ${animation}`}>
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
    }
}

export default Post;