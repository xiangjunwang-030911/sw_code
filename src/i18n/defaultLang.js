import languageList from './languageList'
import storage from 'good-storage';

const navLang = navigator.language;  

let defaultLang = null
if(window.defaultLangID){
  defaultLang = languageList.find( item => item.languageid === window.defaultLangID) 
}

const localLang = languageList.find( item => item.localLang === navLang) 

// console.log('localLang',localLang,navLang);
const lang =  storage.get('language',null) || defaultLang || localLang || languageList[1];
// const lang = languageList[1]
storage.set('language',lang)

export default lang