// In this component it is a form container that is is type of Controlled Component 
// this component cosistes of various functional component 
// this is a Parent Component that as 5 child component.

// Also this component calls the API from http service to mongoDB,


import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';

import DataGridComponent from '../components/DataGridComponent';
import CheckboxOrRadioGroup from '../components/CheckboxOrRadioGroup';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import HttpService from '../services/httpservice';

class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			StudentId:'',
			StudentName:'',
			StudentEmail:'',
			CourseSelection: [],
			SelectedCourse: [],
			UniversityOptions: [],
			UniversitySelection: '',
			YearOptions: [],
			YearSelection: '',
			description: '',
			ImageUrl:'',
			students:[],
			column :['StudentId', 'StudentName','StudentEmail','DateOfBirth',
			'Course','University','Year','Description','Image'],
			startDate: new Date(),
			dob: '',
			isSidValid: true,
			isSnameValid:true,
			isEmailValid:true,
			isCourseValid:true,
			isUniValid:true,
			isYearValid:true,
			isFileValid:true,
			isFormValid:true,
		};

		this.serv = new HttpService();
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		
	}


	handleInputChange=(event)=>{
		this.setState({[event.target.name]: event.target.value});
	}


	handleDateChange=(date)=>{
		this.setState({startDate: date});
		// this below Logic is to store date in dd/mm/yyyy in data base 
		//  as Date() method by default store in differnt manner
		var dob = new Date(date);
		var d = dob.getDate();
		var m = dob.getMonth() + 1;
		var y = dob.getFullYear();
		var res = `${m}/${d}/${y}`;
		console.log(this.state.startDate);
		this.setState({dob:res});
		
		
	  };

	  // this is stored in array only because it has ceckbox and if any other parameters are set 
	  //as per the need of any user so that it can store multiple values to it .
	handleCourseSelection=(e)=>{
		const newSelection = e.target.value;
		let newSelectionArray;
		if(this.state.SelectedCourse.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.SelectedCourse.filter(s => s !== newSelection)
		} else {
			newSelectionArray = [...this.state.SelectedCourse, newSelection];
		}
		this.setState({ SelectedCourse: newSelectionArray }, () => console.log('Course', this.state.SelectedCourse));
	}

	UploadFile = (event)=>{
        const fileTypes = ['image/png', 'image/jpeg'];
         let file = event.target.files;
        let errMessage = [];
        if(fileTypes.every(extension=> file[0].type !==extension)){
            errMessage.push(`The file ${file.type} extension is not supported`);
        } else {
            this.setState({ ImageUrl: file[0]});
        }
     };

	handleClearForm=(e)=>{
		//e.preventDefault();
		this.setState({
			StudentId:'',
			StudentName: '',
			StudentEmail:'',
			startDate: new Date(),
			SelectedCourse: [],
			UniversitySelection: '',
			YearSelection: [],
			description: '',
			ImageUrl:''
		});
	}

	Validation=(e)=>{
		
		if(this.state.StudentId===''){
			this.setState({isSidValid:false});
		}else if(this.state.StudentName===''){
			this.setState({isSnameValid:false});
		}else if(this.state.StudentEmail===''){
			this.setState({isEmailValid:false});
		}else if(this.state.UniversitySelection===''){
			this.setState({isUniValid:false});
		}else if(this.state.CourseSelection.length===0){
			this.setState({isCourseValid:false});
		}else if(this.state.YearSelection===''){
			this.setState({isYearValid:false});
		}else if(this.state.ImageUrl===''){
			this.setState({isFileValid:false});
		}else{
			this.handleFormSubmit(e);
		}
		
	}
	handleFormSubmit=(e)=>{
		const formData = new FormData();
		formData.append('StudentId', this.state.StudentId);
		formData.append('StudentName', this.state.StudentName);
		formData.append('StudentEmail', this.state.StudentEmail);
		formData.append('DateOfBirth', this.state.dob);
		formData.append('SelectedCourse', this.state.SelectedCourse);
		formData.append('UniversitySelection', this.state.UniversitySelection);
		formData.append('YearSelection', this.state.YearSelection);
		formData.append('description', this.state.description);
		formData.append('file', this.state.ImageUrl);
		

		console.log('Send this in a POST request:', formData);
		this.serv.postStudent(formData)	
        .then((response)=>{
			this.setState({status:`upload success ${response.data.data}`});
			console.log(response.data.data);
		    this.loadData();
        }).catch((error)=>{
            console.log(`Error Occured ${error}`);
        });
		this.handleClearForm(e);
	}

	loadData=()=>{
		this.serv.getStudents()
		.then((response) => {
		  this.setState({students: response.data.data});
	   },(error) => {
		 console.log(`Error Occured ${error}`);
	   });
	  }
	componentWillMount() {
		fetch('./fake_db.json')
			.then(res => res.json())
			.then(data => {
				console.log(data);
				
				this.setState({
					StudentId: data.StudentId,
					StudentName: data.StudentName,
					CourseSelection: data.CourseSelection,
					SelectedCourse: data.SelectedCourse,
					UniversityOptions: data.UniversityOptions,
					UniversitySelection: data.UniversitySelection,
					YearOptions: data.YearOptions,
					YearSelection: data.YearSelection,
					description: data.description
				});
			});
			this.loadData();
	}
	componentDidMount(){
		this.loadData();
	  }
	render() {
		return (
			<div className="container">
			<form className="container" id="myform" encType="multipart/form-data" onSubmit={this.Validation.bind(this)}>
				<h5>Engineering Application Form</h5>
				<SingleInput
					inputType={'text'}
					title={'Student Id'}
					name={'StudentId'}
					controlFunc={this.handleInputChange.bind(this)}
					content={this.state.StudentId}
					placeholder={'Enter Student Id'} />
				<div hidden={this.state.isSidValid} className="alert alert-danger">field is required</div>
				<SingleInput
					inputType={'text'}
					title={'Student Name'}
					name={'StudentName'}
					controlFunc={this.handleInputChange.bind(this)}
					content={this.state.StudentName}
					placeholder={'Enter Student Name'} />
				<div hidden={this.state.isSnameValid} className="alert alert-danger">field is required</div>
				<SingleInput
					inputType={'email'}
					title={'Student Email'}
					name={'StudentEmail'}
					controlFunc={this.handleInputChange.bind(this)}
					content={this.state.StudentEmail}
					placeholder={'Enter Student Email Id'} />
				<div hidden={this.state.isEmailValid} className="alert alert-danger">field is required</div>
				<DatePicker
					title= 'Date Of Birth'
					name={'DateOfBirth'}
        			selected={this.state.startDate}
        			onChange={this.handleDateChange.bind(this)}
					maxDate={this.state.startDate}
					showYearDropdown
					scrollableMonthYearDropdown/>
				<br/>
				<br/>
				<Select
					name={'UniversitySelection'}
					placeholder={'Choose University'}
					controlFunc={this.handleInputChange.bind(this)}
					options={this.state.UniversityOptions}
					selectedOption={this.state.UniversitySelection} />
				<div hidden={this.state.isUniValid} className="alert alert-danger">field is required</div>
				<CheckboxOrRadioGroup
					title={'Choose a Course'}
					name={'SelectedCourse'}
					type={'checkbox'}
					controlFunc={this.handleCourseSelection.bind(this)}
					options={this.state.CourseSelection}
					selectedOptions={this.state.SelectedCourse} />
				<div hidden={this.state.isCourseValid} className="alert alert-danger">field is required</div>
				<CheckboxOrRadioGroup
					title={'Choose Year Of Course'}
					name={'YearSelection'}
					controlFunc={this.handleInputChange.bind(this)}
					type={'radio'}
					options={this.state.YearOptions}
					selectedOptions={this.state.YearSelection} />
				<div hidden={this.state.isYearValid} className="alert alert-danger">field is required</div>
				<TextArea
					title={'If You have any Achievements And Rewards Please let us Know '}
					rows={5}
					resize={false}
					content={this.state.description}
					name={'description'}
					controlFunc={this.handleInputChange.bind(this)}
					placeholder={'Please be Short and Sweet in your descriptions'} />
				<SingleInput
					inputType={'file'}
					title={'Image Url'}
					name={'file'}
					controlFunc={this.UploadFile.bind(this)}/>
				<div hidden={this.state.isFileValid} className="alert alert-danger">field is required</div>
                 
				<input
					type="submit"
					className="btn btn-primary float-right"
					value="Submit"/>
				<button
					className="btn btn-link float-left"
					onClick={this.handleClearForm.bind(this)}>Clear form</button>

			</form>
			<br/>
			<br/>
			<br/>
			<br/>
				<DataGridComponent dataSource={this.state.students}/>
            	
			</div>
			
		);
	}
}

export default FormContainer;
