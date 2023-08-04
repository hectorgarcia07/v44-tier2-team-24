export default function IconPalette({ formik, iconPalette }) {

  const iconEl = iconPalette.map((icon, i) => {
    return (
      <label htmlFor={`bot${i}`} key={i} className="iconContainer" >
        <input
          type="radio"
          value={`${i}`}
          id={`bot${i}`}
          name="botIcon"
          readOnly
          checked={formik.values.botIcon === `${i}`}
          disabled={icon.isSelected}
          onChange={() => formik.setFieldValue('botIcon', `${i}`, true)}
          onBlur={formik.onBlur}
        />
        <img src={icon.url} alt={`bot icon ${i}`} />
      </label>
    );
  });

  return (
    <div style={{ display: "flex", alignItems:"flex-start", gap: "10px", width: "400px" }}>{iconEl}</div>
  );
}
