import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import { saveArticle, getArticle } from "../services/articlesService";

class ArticleCUForm extends Form {

    state = {
        data: {title:'', content:'', image:''},
        errors: {}
    }

    componentDidMount(){
        const articleId = "new";//this.props.match.params.id;
        if (articleId === "new") return;

        const article = getArticle(articleId);
        if (!article) return this.props.history.replace("/not-found");

        this.setState({data:this.mapToViewModel(article)});
    }

    mapToViewModel(article){
        return {
            _id:article.id,
            title: article.title,
            content: article.content,
            image: article.image
        }
    }
    schema = {
        _id: Joi.string(),
        title : Joi.string().required().min(3).label('Title'),
        content : Joi.string().required().min(3).label('Content'),
        image: Joi.string().label('Image')
    }

   
    
    doSubmit = () => {
        saveArticle(this.state.data);
        console.log("submitted");
        console.log("close Moddal");
    }


    // componentDidMount(){
    //     const data = {...this.state.data};
    //     data['image'] = ;
    //     this.setState(data);
    //     console.log(data);  
    // }



    render() { 
        return (
            <div className="">
                <form className="px-4 py-3" onSubmit={ this.handleSubmit }>
                    { this.renderInput('title', 'Title') }
                    { this.renderUploadImage('image', 'Image') }
                    { this.renderTextEditor('title') }
                    { this.renderButton("Save") }
                </form>
                <div className="dropdown-divider"></div>
                {/* <Link className="dropdown-item" to="/login">Have a usser? Login</Link> */}
            </div>
        );
    }
}
 
export default ArticleCUForm;