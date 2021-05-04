import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import TextEditor from './textEditor';
//import RichTextEditor from 'react-rte';


class Form extends Component {

  
    state = { 
        data: {},
        errors: {},
        
     }

     setText = (text) => {
         const data = {...this.state.data};
         data.content = text;
         this.setState({data});
     }
     onEditorChange = (value) => {
	//	setValue(value)
		// if (fieldOnChange) {
		// 	// Send the changes up to the parent component as an HTML string.
		// 	// This is here to demonstrate using `.toString()` but in a real app it
		// 	// would be better to avoid generating a string on each change.
		// 	let html = value.toString('html')
		// 	//fieldOnChange(html)
		// }
	};

     validate = () => {
        const options = {abortEarly: false};
        const result  = Joi.validate(this.state.data, this.schema, options);
        
        if (!result.error) return null;
        const errors = {};
        for (let item  of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name] : value};
        const schema = {[name] : this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error? error.details[0].message: null;
    }

    handleSubmit = e => {
        e.preventDefault()
        const errors = this.validate();
        console.log(errors);
        this.setState({ errors: errors || {} });
        if (errors) return;
        this.doSubmit();
    }
    handleChange = ({currentTarget : input}) => {
        console.log(input);
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});
    }

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.useState({
            base64TextString: btoa(binaryString)
        })
    }
    
    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
      }

    handleFileUploadChange = async (e) => {
            console.log("HERE");
            e.preventDefault();
            const reader = new FileReader();
            const file = e.target.files[0];
            console.log("reader", reader);
            
            console.log("file", file)

            if (reader !== undefined && file !== undefined) {
                reader.onloadend = () => {
                    console.log("File", file);
                //   setFile(file)
                //   setSize(file.size);
                //   setName(file.name)
                //   setImagePreview(reader.result)
                }
                reader.readAsDataURL(file);
            }

    
            const base64 = await this.convertBase64(file)
           
                const errors = {...this.state.errors};
                // const errorMessage = this.validateProperty(input);
                // if (errorMessage) errors[input.name] = errorMessage;
                // else delete errors[input.name];

                const data = {...this.state.data};
                data['image'] = base64;
                this.setState({data, errors});
    }
    

    handleTextEditorChange = ({currentTarget : input}) => {
        console.log(this.state.textEditorContent);
        //const errors = {...this.state.errors};
        // const errorMessage = this.validateProperty(input);
        // if (errorMessage) errors[input.name] = errorMessage;
        // else delete errors[input.name];

        //const data = {...this.state.data};
        //data[input.name] = input.value;
      //  this.setState({textEditorContent:this.props});
    }

    setEditorState = () => {
        console.log("Now");
    }

    renderButton(label){
        return <button type="submit" className="btn btn-primary">{label}</button>;
    }

    renderInput(name, label, type = 'text'){
        const { data, errors } = this.state;
        return <Input type={type} name={name} value={data[name]} label={label} onChange={this.handleChange} error={errors[name]} />
    }

    
    renderUploadImage(name, label){
        const { data, errors } = this.state;
        console.log(data);
        return <Input accept=".jpeg, .png, .jpg" preview_src={data['image']} type="file" name={name} value={data[name]} label={label} onChange={this.handleFileUploadChange} error={errors[name]}  />
    }

    

    renderTextEditor(name){
        const { data, errors } = this.state;
        return <TextEditor text={data.content || ""} setText={this.setText} />;
    }
}
 
export default Form;