import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";
import { fetchAPI } from "../../app/functions";
import { sBaseUrl } from "../../app/url";

function ServicePage() {
    const gc = useContext(GlobalContext);
    const [serviceTypes, setServiceTypes] = useState([]);

    const serviceData = {
        serviceType:"",
        title:"",
        description:"",
        webpage:"",
        facebook:"",
        tiktok:"",
        youtube:"",
        instagram:"",
        x_twitter:"",
        linkedin:""
    };

    const getServices = async ()=> {
        try {
            const response = await fetchAPI(`${sBaseUrl}/service_types`);
            setServiceTypes(response.data);
        } catch (err) {
            gc.setMessages(err.message || "Hiba történt, próbálkozzon később!", "error");
        }
    };

    const createService = async ()=> {
        try {
            const response = await fetchAPI(`${sBaseUrl}/service`, {
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-type":"application/json",
                    'authorization': `Bearer ${gc.token}`
                },
                body:JSON.stringify(serviceData)
            });

            gc.setMessages(response.message);
        }  catch (err) {
            gc.setMessages(err.message || "Hiba történt, próbálkozzon később!", "error");
        }
    };

    useEffect(()=> {
        getServices();
    }, []);

    return(
        <div className="my-xl text-center">
            <form className="row">
                <div className="col-md-6 p-md">
                    <div className="box-light p-md">
                        <h3>Szolgáltatás típusa</h3>
                        <select className="input-xs input-primary wp-80" name="serviceType">
                            <option value="-">Válassz típust!</option>
                            {
                                serviceTypes.map((service, i)=>
                                    <option key={i} value={service.typeID}>
                                        {service.typeName}
                                    </option>
                                )
                            }
                        </select>

                        <h3>Hirdetés címe</h3>
                        <input 
                            className="input-xs input-primary wp-80" 
                            type="text" name="title"
                        />

                        <h3>Leírás</h3>
                        <textarea 
                            className="input-xs input-primary wp-80 minh-350" 
                            name="description"></textarea>
                    </div>
                </div>

                <div className="col-md-6 p-md">
                    <div className="box-light p-md">
                        <h3>Weboldal</h3>
                        <input 
                            className="input-xs input-primary wp-80" 
                            type="text" name="webpage"
                        />

                        <h3>Facebook</h3>
                        <input 
                            className="input-xs input-primary wp-80" 
                            type="text" name="facebook"
                        />

                        <h3>TikTok</h3>
                        <input 
                            className="input-xs input-primary wp-80" 
                            type="text" name="tiktok"
                        />

                        <h3>YouTube</h3>
                        <input 
                            className="input-xs input-primary wp-80" 
                            type="text" name="youtube"
                        />

                        <h3>Instagram</h3>
                        <input 
                            className="input-xs input-primary wp-80" 
                            type="text" name="instagram"
                        />

                        <h3>X/Twitter</h3>
                        <input 
                            className="input-xs input-primary wp-80" 
                            type="text" name="x_twitter"
                        />

                        <h3>LinkedIn</h3>
                        <input 
                            className="input-xs input-primary wp-80" 
                            type="text" name="linkedin"
                        />
                    </div>
                </div>
            </form>

            <button onClick={createService} 
            className="input-sm btn-primary">
                Mentés!
            </button>
        </div>
    );
}

export default ServicePage;