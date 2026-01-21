import { useEffect, useState } from "react";
import { passSchema, profileSchema } from "../../app/schemas";
import { handleChange, validateForm } from "../../app/functions";
import { useContext } from "react";
import { GlobalContext } from "../../App";
import { fetchAPI } from "../../app/functions";
import { sBaseUrl } from "../../app/url";

export default function Profile() {
    const [profileData, setProfileData] = useState({
        title: "",
        firstName: "",
        lastName: "",
        firmType: "",
        firmName: "",
        taxNumber: "",
        zip: "",
        settlement: "",
        district: "",
        street: "",
        houseNumber: "",
        floorNumber: 0,
        doorNumber: 0
    });

    const [passData, setPassData] = useState({
        currentPass: "",
        newPass: "",
        newPassAgain: ""
    });

    const [passErrors, setPassErrors] = useState({
        currentPass: "",
        newPass: "",
        newPassAgain: ""
    });

    const [errors, setErrors] = useState({});
    const gc = useContext(GlobalContext);

    const getProfile = async () => {
        try {
            const response = await fetchAPI(`${sBaseUrl}/profile`, {
                method: "GET",
                headers: { 'authorization': `Bearer ${gc.token}` },
                credentials: "include"
            }, gc);

            delete response.data.email;

            setProfileData(response.data);
        } catch (err) {
            gc.setMessages(err.message || "Hiba történt, próbálkozzon később!", "error");
        }
    };

    const saveProfile = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchAPI(`${sBaseUrl}/profile`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    'Content-type': "application/json",
                    'authorization': `Bearer ${gc.token}`
                },
                body: JSON.stringify(profileData)
            }, gc);

            gc.setMessages(response.message);
        } catch (err) {
            gc.setMessages(err.message || "Hiba történt, próbálkozzon később!", "error");
        }
    };

    const changePass = async (e)=> {
        e.preventDefault();

        try {
            const response = await fetchAPI(`${sBaseUrl}/change-pass`, {
                method:"PATCH",
                credentials: "include",
                headers: {
                    'Content-type': "application/json",
                    'authorization': `Bearer ${gc.token}`
                },
                body:JSON.stringify(passData)
            }, gc);

            gc.setMessages(response.message);
        } catch(err) {
            gc.setMessages(err.message || "Hiba történt, próbálkozzon később!", "error");
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="my-xl">
            <form className="mx-auto mb-lg box-light p-md">
                <h2 className="text-center">Profil adatok</h2>
                <div className="row">
                    <div className="col-lg-6 col-md-6 p-md">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Megszólítás
                                </div>
                                <b className="color-error">{errors.title ? errors.title : ""}</b>

                                <select onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.title} name="title"
                                    className="input-xs input-primary wp-100">
                                    <option value={null}>-</option>
                                    <option value="Dr.">Dr.</option>
                                    <option value="Prof.">Prof.</option>
                                </select>
                            </div>

                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Vezetéknév
                                </div>
                                <b className="color-error">{errors.lastName ? errors.lastName : ""}</b>
                                <input
                                    onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.lastName} type="text" name="lastName"
                                    className="input-xs input-primary wp-100"
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Keresztnév
                                </div>
                                <b className="color-error">{errors.firstName ? errors.firstName : ""}</b>

                                <input
                                    onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.firstName} type="text" name="firstName"
                                    className="input-xs input-primary wp-100"
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Cég típus
                                </div>
                                <b className="color-error">{errors.firmType ? errors.firmType : ""}</b>

                                <select onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.firmType} name="firmType" className="input-xs input-primary wp-100">
                                    <option value={null}>magánszemély</option>
                                    <option value="egyéni vállalkozás">egyéni vállalkozás</option>
                                    <option value="bt">bt</option>
                                    <option value="kft">kft</option>
                                    <option value="kkt">kkt</option>
                                    <option value="zrt">zrt</option>
                                    <option value="nyrt">nyrt</option>
                                    <option value="szövetkezet">szövetkezet</option>
                                </select>
                            </div>

                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Cégnév
                                </div>
                                <b className="color-error">{errors.firmName ? errors.firmName : ""}</b>

                                <input
                                    onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.firmName} type="text" name="firmName"
                                    className="input-xs input-primary wp-100"
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Adószám
                                </div>
                                <b className="color-error">{errors.taxNumber ? errors.taxNumber : ""}</b>

                                <input
                                    onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.taxNumber} type="text" name="taxNumber"
                                    className="input-xs input-primary wp-100"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-6 col-md-6 p-md">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Irányítószám
                                </div>
                                <b className="color-error">{errors.zip ? errors.zip : ""}</b>

                                <input
                                    onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.zip} type="text" name="zip"
                                    className="input-xs input-primary wp-100"
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Település
                                </div>
                                <b className="color-error">{errors.settlement ? errors.settlement : ""}</b>

                                <input
                                    onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.settlement} type="text" name="settlement"
                                    className="input-xs input-primary wp-100"
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Utca
                                </div>
                                <b className="color-error">{errors.street ? errors.street : ""}</b>

                                <input
                                    onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.street} type="text" name="street"
                                    className="input-xs input-primary wp-100"
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Házszám
                                </div>
                                <b className="color-error">{errors.houseNumber ? errors.houseNumber : ""}</b>

                                <input
                                    onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.houseNumber} type="text" name="houseNumber"
                                    className="input-xs input-primary wp-100"
                                />

                            </div>

                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Emelet
                                </div>
                                <b className="color-error">{errors.floorNumber ? errors.floorNumber : ""}</b>

                                <input
                                    onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.floorNumber} type="text" name="floorNumber"
                                    className="input-xs input-primary wp-100"
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 p-xs">
                                <div className="font-weight-600 mb-xs">
                                    Ajtó
                                </div>
                                <b className="color-error">{errors.floorNumber ? errors.floorNumber : ""}</b>

                                <input
                                    onChange={e => handleChange(e, setProfileData, setErrors, profileSchema)}
                                    value={profileData.doorNumber} type="text" name="doorNumber"
                                    className="input-xs input-primary wp-100"
                                />
                            </div>

                        </div>
                    </div>
                </div>

                <button
                    onClick={saveProfile}
                    className="btn-primary input-xs d-block margin-auto">
                    Adatok mentése
                </button>
            </form>

            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 pr-md">
                    <form className="mb-lg box-light p-md">
                        <h2 className="text-center">Jelszó módosítása</h2>

                        <div className="font-weight-600 mb-xs">
                            Jelenlegi jelszó
                        </div>
                        <b className="color-error">{passErrors.currentPass ? passErrors.currentPass : ""}</b>

                        <input
                            type="password" name="currentPass"
                            onChange={e => handleChange(e, setPassData)}
                            value={passData.currentPass}
                            className="input-xs input-primary wp-100"
                        />

                        <div className="font-weight-600 mb-xs">
                            Új jelszó
                        </div>
                        <b className="color-error">{passErrors.newPass ? passErrors.newPass : ""}</b>

                        <input
                            type="password" name="newPass"
                            onChange={e => handleChange(e, setPassData, setPassErrors, passSchema)}
                            value={passData.newPass}
                            className="input-xs input-primary wp-100"
                        />

                        <div className="font-weight-600 mb-xs">
                            Új jelszó újra
                        </div>

                        <b className="color-error">
                            {passData.newPass !== passData.newPassAgain && passData.newPassAgain !== ""
                                ? "A két jelszó nem egyezik!" : ""}
                        </b>

                        <input
                            type="password" name="newPassAgain"
                            onChange={e=>handleChange(e, setPassData)}
                            value={passData.newPassAgain} 
                            className="input-xs input-primary wp-100"
                        />

                        <button onClick={changePass}
                        className="input-sm btn-primary d-block mt-md margin-auto">
                            Módosítás
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};