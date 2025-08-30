export default function StartScreen({ onStart }) {
  return (
    <div className="button-container" id="start-container">
      <div className="title-container">
        <h5>Thiago Arrieta</h5>
        <label>El lugar que te hará destacar</label>
      </div>
      <button type="button" id="start" onClick={onStart}>
        <span className="logo--cut"></span>
      </button>
      <label>Tu estilo, nuestra pasión. ¡Reserva tu cita ya!</label>
    </div>
  );
}
