
export function InputRange({name, label, sweetAlert, formikValue, handleChange, handleBlur, min, max, step, output}) {
    return (
        <div>
            <label htmlFor={name}>
                <span className={"question-space"}>{label}</span>
                <button
                  className={"question-button"}
                  onClick={(e) => { 
                    e.preventDefault()
                    sweetAlertMixin.fire(sweetAlert);
                  }}
                >
                  ?
                </button>
                <input
                  id={name}
                  name={name}
                  type="range"
                  value={formikValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min={min}
                  max={max}
                  step={step}
                  required
                />
                <span>{output}</span>
              </label>
        </div>
    )
}