import React, {Component} from 'react';
import { PostWrapper, Navigate, Post, Warning } from '../../components';
import * as service from '../../services/company';
// import * as phoneUtil from '../../utils/formatPhone';
import { formatPhone } from '../../utils/formatPhone';

class PostContainer extends Component {
    constructor(props) {
        super();
        // initializes component state
        this.state = {
            companyId: 1,
            fetching: false, // tells whether the request is waiting for response or not
            company: {
                title: null,
                phone: null,
                regDate : null
            },
            commentList : [],
            warning: {
                warningVisibility : false,
                message: ""
            }
        };
    }

    componentDidMount(){
        this.fetchCompanyInfo(0);
    }

    showWarning = ({message}) => {
        this.setState({
            warningVisibility: true,
            message: "해당 회사가 존재하지 않습니다"
        });

        // after 1.5 sec

        setTimeout(
            () => {
                this.setState({
                    warningVisibility: false
                });
            }, 1500
        );
    }

    fetchCompanyInfo = async (row) => {
        this.setState({
            fetching: true // requesting..
        });

        try{
            const info = await Promise.all([
                service.getCompanyList(),
                service.getComments(1)
            ]);
            const companyList = info[0];
            const commentList = info[1].data;

            console.log(companyList);

            const company = companyList.data.data.list[row];
            const companyId = row;
            let title = null;
            let phone = null;
            let regDate = null;

            console.log(company);
            console.log("row :: " + row);
            let companyDetail = await service.getCompanyInfo(company.id);
            companyDetail = companyDetail.data.data;
            if(companyDetail) {
                title = companyDetail.name;
                phone = formatPhone(companyDetail.phone);
                regDate = companyDetail.regDate;
                regDate = regDate.substr(0, regDate.indexOf("."));
            }

            this.setState({
                companyId,
                company: {
                    title,
                    phone,
                    regDate
                },
                commentList,
                fetching: false // done!
            });
            console.log(this.state);
        }
        catch(e){
            this.setState({
                fetching: false
            });
            console.log('error occurred', e);

            this.showWarning;
        }
    };

    handleNavigateClick = (type) => {
        const companyId = this.state.companyId;

        if(type === 'NEXT') {
            this.fetchCompanyInfo(companyId+1);
        } else {
            this.fetchCompanyInfo(companyId-1);
        }
    };

    render() {
        const {companyId, fetching, company, commentList, warning} = this.state;

        return (
            <PostWrapper>
                <Navigate
                    companyId={companyId}
                    disabled={fetching}
                    onClick={this.handleNavigateClick}
                />
                <Post
                    title={company.title}
                    phone={company.phone}
                    regDate={company.regDate}
                    commentList={commentList}
                />
                <Warning visible={warning.warningVisibility} message={warning.message}/>
            </PostWrapper>
        );
    }
}

export default PostContainer;