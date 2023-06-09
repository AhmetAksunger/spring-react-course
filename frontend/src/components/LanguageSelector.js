import { changeLanguage } from '../api/apiCalls';
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = (props) => {

    const {i18n} = useTranslation();

    const onChangeLanguage = (language) =>{
        i18n.changeLanguage(language)
        changeLanguage(language)
    }

    return (
        <div className='container mt-3'>
            <img
                src="https://flagcdn.com/h24/tr.png"
                srcset="https://flagcdn.com/h48/tr.png 2x"
                height="24"
                alt="Turkey"
                onClick={() => onChangeLanguage("tr")}
                style={{cursor: "pointer"}}
            />

            <img
                src="https://flagcdn.com/h24/us.png"
                srcset="https://flagcdn.com/h48/us.png 2x"
                height="24"
                alt="United States" onClick={ () => onChangeLanguage("en")}
                style={{cursor:"pointer"}}
            />
        </div>
    );
};

export default LanguageSelector;