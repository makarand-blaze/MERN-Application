import React from 'react';
import PropTypes from 'prop-types'

const CheckboxOrRadioGroup = (props) => (
	<div class="col-sm-offset-2 col-sm-10">
		<label className="form-label">{props.title}</label>
		<div className="checkbox-group">
			{props.options.map(option => {
				return (
					<label key={option} className="form-label capitalize">
						<input
							className="checkbox"
							name={props.name}
							onChange={props.controlFunc}
							value={option}
							checked={props.selectedOptions.indexOf(option) > -1}
							type={props.type}/> {option} 
					</label>
				);
			})}
		</div>
	</div>
);

CheckboxOrRadioGroup.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array,
	controlFunc: PropTypes.func.isRequired
};

export default CheckboxOrRadioGroup;
