import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const AddBookmark = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({url: '', title: ''});

    const onTextChange = e =>{
        const copy = {...formData};
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/home/add', formData);
        history.push('/my-bookmarks');
    }

    return(
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
            <h3>Add Bookmark</h3>
            <form onSubmit={onFormSubmit}>
               <input type="text" name="title" placeholder="title" onChange={onTextChange} value={formData.title} className="form-control"/> <br/>
               <input type="text" name="url" placeholder="url" onChange={onTextChange} value={formData.url} className="form-control"/> <br/>
               <button className="btn btn-ptimary">Add</button> 
                </form>    
            </div>
        </div>
    )
}


export default AddBookmark;