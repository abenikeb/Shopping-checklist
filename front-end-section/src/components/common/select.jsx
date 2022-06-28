import React from 'react'

const Select = ({ name, errors, options, label, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className="form-control">
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
        )
      </select>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  )
}

export default Select
