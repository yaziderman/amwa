//import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-solid'

// class Article extends Component {
//     render() { 


      const Article = ({article, onDelete, onEdit}) => {
        return (
          <div className="col-md-6">
          <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">World</strong>
              <h3 className="mb-0">{ article.title }</h3>
              <div className="mb-1 text-muted">{ article.date }</div>
              <p className="card-text mb-auto">{ article.content }</p>
              <div>
              <a href="#">Continue reading</a>
              <a className="float-right" ><FontAwesomeIcon onClick={ () => onDelete(article.id) } icon={faTrashAlt} /></a>
              <a className="float-right mr-2"  ><FontAwesomeIcon  onClick={ () => onEdit(article.id) } icon={faEdit} /></a>
              </div>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img width="200" height="250" src={ article.image }></img>
    
            </div>
          </div>
        </div>
      );  
      } 
      

//     }
// }
    
export default Article;
