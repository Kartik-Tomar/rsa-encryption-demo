import './input.css';
const Input = (props) => {
    const { type, value, onChange, isDisabled, id, label, keyText, rows } = props;
    return (
        <div className="form-group">
            <label htmlFor={id}>
                <span className="key-text" >{keyText}</span>
                {label}
            </label>
            {type === "textarea" ?
                (<textarea className="form-control" type={"text"} value={value} onChange={onChange} disabled={isDisabled} id={id} rows={rows} />) :
                (<input className="form-control" type={type} value={value} onChange={onChange} disabled={isDisabled} id={id} />)
            }
        </div>
    )
}

export default Input