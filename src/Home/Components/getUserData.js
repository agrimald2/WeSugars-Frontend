import { Country, State } from "country-state-city";

export default function getUserData(response) {
    let data;
    
    data = response.data[0].fields;
    data.country = data.country.slice(0, -2);
    data.country = data.country.slice(2);
    data.city = State.getStateByCodeAndCountry(data.city, data.country).name;
    data.country = Country.getCountryByCode(data.country).name;
    data.nationality = data.nationality.slice(0, -2);
    data.nationality = data.nationality.slice(2);
    data.nationality = Country.getCountryByCode(data.nationality).name;
    data.preferred_nationality = data.preferred_nationality.slice(0, -2);
    data.preferred_nationality = data.preferred_nationality.slice(2);
    data.preferred_nationality = Country.getCountryByCode(data.preferred_nationality).name;
    
    var r = document.querySelector(':root');
    if(data.body_type == null) 
    {
    data.type = "Sugar";
    data.for = "Baby";
    r.style.setProperty('--main-color', 'crimson');
    }
    else 
    {
    data.type = "Baby"
    data.for = "Sugar"
    r.style.setProperty('--main-color', 'darkmagenta');
    }
    switch(data.gender) 
    {
    case "M":
    case "FTM":
        data.myArticle = "un";
        break;
    case "F":
    case "MTF":
        data.myArticle = "una";
        break;
    case "O":
        data.myArticle = "une";
        break;
    }
    switch(data.preferred_gender)
    {
    case "M":
    case "FTM":
        data.otherArticle = "un";
        break;
    case "F":
    case "MTF":
        data.otherArticle = "una";
        break;
    case "O":
        data.otherArticle = "une";
        break;
    }
    return data;
}
