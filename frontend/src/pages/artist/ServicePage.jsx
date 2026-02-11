import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";
import { fetchAPI } from "../../app/functions";
import { sBaseUrl } from "../../app/url";
import { handleChange } from "../../app/functions";
import { userServiceSchema } from "../../app/schemas";
import CheckInputComp from "../../components/CheckInputComp";

function ServicePage() {
    const gc = useContext(GlobalContext);
    const [serviceTypes, setServiceTypes] = useState([]);

    const [serviceData, setServiceData] = useState({
        serviceType: "",
        title: "",
        description: "",
        webpage: "",
        facebook: "",
        tiktok: "",
        youtube: "",
        instagram: "",
        x_twitter: "",
        linkedin: ""
    });

    const [serviceErrors, setServiceErrors] = useState({
        serviceType: "",
        title: "",
        description: "",
        webpage: "",
        facebook: "",
        tiktok: "",
        youtube: "",
        instagram: "",
        x_twitter: "",
        linkedin: ""
    });

    const getServices = async () => {
        try {
            const response = await fetchAPI(`${sBaseUrl}/service_types`);
            setServiceTypes(response.data);
        } catch (err) {
            gc.setMessages(err.message || "Hiba történt, próbálkozzon később!", "error");
        }
    };

    const createService = async () => {
        try {
            const response = await fetchAPI(`${sBaseUrl}/service`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                    'authorization': `Bearer ${gc.token}`
                },
                body: JSON.stringify(serviceData)
            });

            gc.setMessages(response.message);
        } catch (err) {
            console.log(err.message);
            gc.setMessages(err.message || "Hiba történt, próbálkozzon később!", "error");
        }
    };

    useEffect(() => {
        getServices();
    }, []);

    return (
        <div className="my-xl text-center">
            <form className="row">
                <div className="col-md-6 p-md">
                    <div className="box-light p-md">
                        <div className="font-weight-600 mb-xs">
                            Szolgáltatás típusa
                        </div>

                        <b className="color-error">{serviceErrors.serviceType ? serviceErrors.serviceType : ""}</b>

                        <select onChange={e => handleChange(e, setServiceData, setServiceErrors, userServiceSchema)}
                            value={serviceData.serviceType} className="input-xs input-primary wp-80" name="serviceType">
                            <option value="-">Válassz típust!</option>
                            {
                                serviceTypes.map((service, i) =>
                                    <option key={i} value={service.typeID}>
                                        {service.typeName}
                                    </option>
                                )
                            }
                        </select>

                        <CheckInputComp
                            data={serviceData}
                            setData={setServiceData}
                            schema={userServiceSchema}
                            title="Hirdetés címe"
                            name="title"
                        />

                        <div className="font-weight-600 mb-xs">
                            Leírás
                        </div>
                        <b className="color-error">{serviceErrors.description ? serviceErrors.description : ""}</b>

                        <textarea
                            className="input-xs input-primary wp-80 minh-350"
                            onChange={e => handleChange(e, setServiceData, setServiceErrors, userServiceSchema)}
                            value={setServiceData.description} name="description"></textarea>
                    </div>
                </div>

                <div className="col-md-6 p-md">
                    <div className="box-light p-md">
                        <CheckInputComp
                            data={serviceData}
                            setData={setServiceData}
                            schema={userServiceSchema}
                            title="Weboldal"
                            name="webpage"
                        />

                        <CheckInputComp
                            data={serviceData}
                            setData={setServiceData}
                            schema={userServiceSchema}
                            title="Facebook"
                            name="facebook"
                        />

                         <CheckInputComp
                            data={serviceData}
                            setData={setServiceData}
                            schema={userServiceSchema}
                            title="TikTok"
                            name="tiktok"
                        />

                        <CheckInputComp
                            data={serviceData}
                            setData={setServiceData}
                            schema={userServiceSchema}
                            title="YouTube"
                            name="youtube"
                        />

                        <CheckInputComp
                            data={serviceData}
                            setData={setServiceData}
                            schema={userServiceSchema}
                            title="Instagram"
                            name="instagram"
                        />

                        <CheckInputComp
                            data={serviceData}
                            setData={setServiceData}
                            schema={userServiceSchema}
                            title="X/Twitter"
                            name="x_twitter"
                        />

                        <CheckInputComp
                            data={serviceData}
                            setData={setServiceData}
                            schema={userServiceSchema}
                            title="LinkedIn"
                            name="linkedin"
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