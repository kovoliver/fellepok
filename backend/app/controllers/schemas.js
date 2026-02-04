import Joi from "joi";

const firmTypes = ["magánszemély", "bt", "kft", "kkt", "zrt", "nyrt", "szövetkezet", "egyéni vállalkozás"];

export const regSchema = Joi.object({
    email:Joi.string().email().empty("").required().messages({
        "string.email":"Az email cím nem megfelelő formátumú!",
        "string.empty":"Az email mező nem lehet üres!",
        "any.required":"Az email mező kötelező!"
    }),
    pass:Joi.string().min(6).empty("").required().messages({
        "string.min":"A jelszónak minimum hat karakteresnek kell lennie!",
        "string.empty":"A jelszó mező nem lehet üres!",
        "any.required":"A jelszó mező kötelező!"
    }),
    passAgain:Joi.string().valid(Joi.ref("pass")).required()
    .messages({
        "any.only": "A két jelszó nem egyezik meg!",
        "string.empty": "Kérjük ismételje meg a jelszót.",
        "any.required": "Kérjük ismételje meg a jelszót."
    }),
    role:Joi.string().valid('ARTIST', 'CUSTOMER').empty("").required()
    .messages({
        "any.required":"A regisztráció típusa mező kötelező!",
        "any.valid":"A regisztráció típusa mező a következő értékeket veheti fel: fellépő, megrendelő"
    })
});

export const profileSchema = Joi.object({
    title:Joi.string().allow("Dr.", "Prof.").required().empty("").messages({
        "any.required":"A megszólítás mezőt kötelező beküldeni!",
        "string.empty":"A megszólítás mezőt kötelező kitölteni!",
        "string.base":"A megszólításnak karakterláncnak kell lennie!",
        "string.title":"A megszólítás nem megfelelő formátumú!",
        "string.allow":"A következő értékek megengedette: Dr., Prof., üres"
    }),
    firstName:Joi.string().required().min(3).empty("").messages({
        "string.empty":"A keresztnév mező nem maradhat üresen!",
        "string.base":"A keresztnévnek karakterláncnak kell lennie!",
        "strings.firstName":"A keresztnév mező formátuma nem megfelelő!",
        "string.min":"A keresztnév mezőnek legalább 3 karakteresnek kell lennie!",
        "any.required":"A keresztnév mezőt kötelező kitölteni."
    }),
    lastName:Joi.string().required().min(3).empty("").messages({
        "string.base":"A vezetéknévnek karakterláncnak kell lennie!",
        "strings.lastName":"A vezetéknévnek mező formátuma nem megfelelő!",
        "string.min":"A vezetéknévnek mezőnek legalább 3 karakteresnek kell lennie!",
        "any.required":"A vezetéknévnek mezőt kötelező kitölteni."
    }),
    firmType:Joi.string().valid(...firmTypes).empty("").allow(null).messages({
        "string.base":"A cég típusának karakterláncnak kell lennie!",
        "string.firmType":"A cég típusa nem megfelelő!",
        "string.allow":"A cégtípus a következő értékeket veheti fel: " + firmTypes.join(", "),
        "string.empty":"A cég típusa mező nem maradhat üres!"
    }),
    firmName:Joi.string().min(3).empty("").allow(null).messages({
        "string.base":"A cégnévnek karakterláncnak kell lennie!",
        "string.firmName":"A cégnév mező értéke nem megfelelő!",
        "string.min":"A cégnévnek legalább 3 karakteresnek kell lennie!",
        "string.empty":"A cégnév mező nem maradhat üres!"
    }),
    taxNumber:Joi.string().regex(/^[\d]{8}\-[\d]\-[\d]{2}$/).allow(null).messages({
        "string.base":"Az adószámnak karakterláncnak kell lennie!",
        "string.regex":"Az adószám formátuma nem megfelelő!"
    }),
    zip:Joi.number().min(1000).max(9999).required().messages({
        "number.base":"Az irányítószámnak számnak kell lennie!",
        "number.min":"Az irányítószám minimum 1000!",
        "number.max":"Az irányítószám maximum 9999!",
        "number.zip":"Az irányítószámnak számnak kell lennie!",
        "any.required":"Az irányítószám mezőt kötelező kitölteni!"
    }),
    settlement:Joi.string().min(3).empty("").required().messages({
        "string.base":"A településnek karakterláncnak kell lennie!",
        "string.emtpy":"A település mező nem maradhat üres!",
        "any.required":"A település mező kötelező!",
        "string.min":"A település nevének legalább 3 karakteresnek kell lennie!"
    }),
    street:Joi.string().min(3).empty("").required().messages({
        "string.base":"Az utca mezőnek karakterláncnak kell lennie!",
        "string.emtpy":"Az utca mező nem maradhat üres!",
        "any.required":"Az utca mező kötelező!",
        "string.min":"Az utca nevének legalább 3 karakteresnek kell lennie!"
    }),
    houseNumber:Joi.string().empty("").required().messages({
        "string.base":"A házszám mezőnek karakterláncnak kell lennie!",
        "string.emtpy":"A házszám mező nem maradhat üres!",
        "any.required":"A házszám mező kitöltése kötelező!"
    }),
    floorNumber:Joi.string().min(1).allow(null).messages({
        "string.base":"Az emelet mezőnek karakterláncnak kell lennie!",
        "string.min":"Az emelet mező nem maradhat üres!"
    }),
    doorNumber:Joi.string().min(1).allow(null).messages({
        "string.base":"Az ajtó mezőnek karakterláncnak kell lennie!",
        "string.min":"Az ajtó mező nem maradhat üres!"
    })
});

//(http|https):\/\/[\w\-\_]{0,255}\.[\w]{2,6}

export const userServiceSchema = Joi.object({
    serviceType:Joi.string().empty("").required().messages({
        "string.base":"A szolgáltatás típusának karakterláncnak kell lennie!",
        "string.empty":"A szolgáltatás elnevezése nem maradhat üres!",
        "any.required":"A szolgáltatás típusa kötelező mező!"
    }),
    title:Joi.string().min(10).max(100).required().messages({
        "string.base":"A hirdetés címének karakterláncnak kell lennie!",
        "string.min":"A hirdetés címe minimum 10 karakteres kell, hogy legyen!",
        "string.max":"A hirdetés címe nem lehet hosszabb, mint 100 karakter!",
        "any.required":"A szolgáltatás típusa kötelező mező!"
    }),
    description:Joi.string().min(50).max(5000).required().messages({
        "string.base":"A hirdetés leírásának karakterláncnak kell lennie!",
        "string.min":"A hirdetés leírása minimum 50 karakteres kell, hogy legyen!",
        "string.max":"A hirdetés leírása nem lehet hosszabb, mint 5000 karakter!",
        "any.required":"A hirdetés leírása típusa kötelező mező!"
    }),
});

// const { error, value } = regSchema.schema.validate({
//     email:"email@email.hu",
//     pass:"asdfasdfasdf",
//     passAgain:"asdfasdfasdf",
//     role:"kiscica"
// }, {abortEarly:false});

// console.log(error);
