import { useParams } from "react-router-dom";

export default function UserForId(){
    const { id } = useParams();
    
    return (
        <div>
            {id}
        </div>
    )
}