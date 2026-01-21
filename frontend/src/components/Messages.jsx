import { useContext } from "react";
import { GlobalContext } from "../App";

export default function Messages() {
    const gc = useContext(GlobalContext);

    const dismiss = (index)=> {
        gc.setMessages(
            gc.messages.messages.filter((_, i)=> i !== index),
            gc.messages.msgCls,
            gc.messages.maxWdith
        );
    };

    return(
        <div style={{maxWidth:500}} className="margin-auto mt-md">
            {
                gc.messages.messages.map((m,i)=>
                    <div className={`box-${gc.messages.msgCls} p-1 mb-1 rounded-md flex justify-between items-center`}>
                        <div>{m}</div>
                        <div onClick={()=>dismiss(i)} key={i} className="dismiss">&times;</div>
                    </div>
                )
            }
        </div>
    );
}