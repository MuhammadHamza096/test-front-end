import NotFoundImage from "../../assets/notfound.webp";
import "./style.css";
const NotFound = () => {
  return (
    <section>
      <div>
        <img src={NotFoundImage} />
      </div>
    </section>
  );
};
export default NotFound;
