import "./css/Notes.css"; 
const Posit = ({titulo,texto}) => {
    return (
        <section className="section-note">
          <div className="wrap-note">
            <h3> {titulo}</h3>
            <div className="note-text">{texto}</div>
          </div>
        </section>
      );
    };
    export default Posit;
