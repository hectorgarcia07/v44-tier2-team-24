import sweetAlertMixin from "../SweetAlertConfig";

export function InputDropDown({ name, label, sweetAlert, formikValue, formik, optionLabel, optionMap}) {
    const optionSelection = optionMap.map( (option, index) => {
        return(
            <option key={`${index}`} value={option.key}>{option.value}</option>
        )
    } )

    return (
        <label htmlFor={name}>
            <span className="question-space">{label}</span>
            <button
                className="question-button"
                onClick={(e) => {
                    e.preventDefault();
                    sweetAlertMixin.fire(sweetAlert);
                }}
                >
                    ?
            </button>
            <select
                id={name}
                name={name}
                value={formikValue}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                required
            >
                <option value="" disabled>
                    {optionLabel}
                </option>

                {optionSelection}
            </select>
        </label>
    )
}