import { useDispatch } from "react-redux";
import { setArenaData } from "../Redux/arenaData";
import { movementSpeed, booleanOperator } from '../Components/FormComponents/sweetAlert'
import { useFormik } from 'formik';
import Container from "../Components/Layout/Container";
import { useNavigate } from "react-router-dom";
import { InputRange } from "../Components/FormComponents/InputRange";

export default function BotsInfo() {
  let width = window.innerWidth;
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
    speed: 500,
    tileNum: 3,
    operator: 'AND',
  },
  onSubmit: values => {
    console.log("Submit Arena ", values)
    const arenaData = {
      ...values,
      speed: Number(values.speed),
      tileNum: Number(values.tileNum),
    }
    dispatch(setArenaData(arenaData))
    navigate('/createBot')
  }
  });

  return (
    <div className="createArena">
      <Container>
      <h2>Board Controls</h2>
        <div className="arena-input-form">
          <form onSubmit={formik.handleSubmit}>
            <InputRange 
              name="speed" 
              label="Movement Speed" 
              sweetAlert={movementSpeed}
              formikValue={formik.values.speed}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              min={500}
              max={3500}
              step={500}
              output={`${4 - formik.values.speed/1000}sec`}
            />
            <InputRange 
              name="tileNum"
              label="Arena Size" 
              sweetAlert={movementSpeed}
              formikValue={formik.values.tileNum}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              min={3}
              max={width <= 768 && width > 428? 5 : width <= 428 ? 4 : 8}
              step={1}
              output={`${formik.values.tileNum}x${formik.values.tileNum}`}
            />
            <div>
              <label htmlFor="operator">
                <span className="question-space">Boolean operator</span>
                <button
                  className="question-button"
                  onClick={(e) => {
                    e.preventDefault();
                    sweetAlertMixin.fire(booleanOperator);
                  }}
                >
                  ?
                </button>
                <select
                  id="operator"
                  name="operator"
                  value={formik.values.operator}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                  <option value="NOR">NOR</option>
                  <option value="XOR">XOR</option>
                </select>
              </label>
            </div>
            <button type="submit">Next</button>
          </form>
        </div>
      </Container>
    </div>
  )
}