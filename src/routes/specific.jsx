import { Eventspecific } from "../components/specificevent"
import { useParams } from "react-router-dom";

export function SpecificEvent() {
    let { id } = useParams();
    return (
        <div>
      <Eventspecific id={id} />
      </div>
    )
  }