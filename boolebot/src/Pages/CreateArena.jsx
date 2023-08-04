import { useDispatch } from "react-redux";
import { setArenaData } from "../Redux/arenaData";
import { movementSpeed, booleanOperator, arenaSize } from '../Components/Forms/sweetAlert'
import { useFormik } from 'formik';
import Container from "../Components/Layout/Container";
import { Link } from "react-router-dom";

export default function BotsInfo() {
  let width = window.innerWidth;
  const dispatch = useDispatch()
  
  const formik = useFormik({
    initialValues: {
    speed: 500,
    tileNum: 3,
    operator: 'AND',
  },
    onSubmit: values => {
      console.log("Submit ", values)
      const arenaData = {
        ...values,
        speed: Number(values.speed),
        tileNum: Number(values.tileNum),
      }
      dispatch(setArenaData(arenaData))
    }
  });

  return (
    <div className="createArena">
      <Container>
      <h2>Board Controls</h2>
        <div className="arena-input-form">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="speed">
                <span className="question-space">Movement Speed</span>
                <button
                  className="question-button"
                  onClick={(e) => { 
                    e.preventDefault()
                    sweetAlertMixin.fire(movementSpeed);
                  }}
                >
                  ?
                </button>
                <input
                  id="speed"
                  name="speed"
                  type="range"
                  value={formik.values.speed}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  min={500}
                  max={3500}
                  step={500}
                  required
                />
                <span>{`${4 - formik.values.speed/1000}sec`}</span>
              </label>
            </div>
            <div>
              <label htmlFor="tileNum">
                <span className="question-space">Arena Size</span>
                <button
                  className="question-button"
                  onClick={(e) => {
                    e.preventDefault();
                    sweetAlertMixin.fire(arenaSize);
                  }}
                >
                  ?
                </button>
                <input
                  id="tileNum"
                  name="tileNum"
                  type="range"
                  value={formik.values.tileNum}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  min={3}
                  max={width <= 768 && width > 428? 5 : width <= 428 ? 4 : 8}
                  step={1}
                  required
                />
                <span>{` ${formik.values.tileNum}x${formik.values.tileNum}`}</span>    
              </label>
            </div>
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
            <Link to="/createBot" className="next_btn">
              <button type="submit">Next</button>
            </Link>
          </form>
        </div>
      </Container>
    </div>
  )
}