import React from 'react';
import PropTypes from 'prop-types'

const SingleInput = (props) => (
	<div className="form-group">
		<label class="control-label col-sm-2" className="form-label" htmlFor="ImageUrl">{props.title}</label>
		<input
			className="form-control"
			name={props.name}
			type={props.inputType}
			value={props.content}
			onChange={props.controlFunc}
			placeholder={props.placeholder} />
	</div>
);

SingleInput.propTypes = {
	inputType: PropTypes.oneOf(['text','number','file','email']).isRequired,
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	controlFunc: PropTypes.func.isRequired,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	placeholder: PropTypes.string,
};

export default SingleInput;