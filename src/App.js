import React , {useState,useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
import Routes from './Routes';
import Routes_ from './Routes_WebBanHang';
import ScrollToTop from './utils/ScrollToTop';
import './assets/base.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import host from './hosting/host'
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  fab,
  faFacebook,
  faTwitter,
  faVuejs,
  faReact,
  faHtml5,
  faGoogle,
  faInstagram,
  faPinterest,
  faYoutube,
  faDiscord,
  faSlack,
  faDribbble,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import {
  far,
  faSquare,
  faLifeRing,
  faCheckCircle,
  faTimesCircle,
  faDotCircle,
  faThumbsUp,
  faComments,
  faFolderOpen,
  faTrashAlt,
  faFileImage,
  faFileArchive,
  faCommentDots,
  faFolder,
  faKeyboard,
  faCalendarAlt,
  faEnvelope,
  faAddressCard,
  faMap,
  faObjectGroup,
  faImages,
  faUser,
  faLightbulb,
  faGem,
  faClock,
  faUserCircle,
  faQuestionCircle,
  faBuilding,
  faBell,
  faFileExcel,
  faFileAudio,
  faFileVideo,
  faFileWord,
  faFilePdf,
  faFileCode,
  faFileAlt,
  faEye,
  faChartBar
} from '@fortawesome/free-regular-svg-icons';
import {
  fas,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faSmile,
  faHeart,
  faBatteryEmpty,
  faBatteryFull,
  faChevronRight,
  faSitemap,
  faPrint,
  faMapMarkedAlt,
  faTachometerAlt,
  faAlignCenter,
  faExternalLinkAlt,
  faShareSquare,
  faInfoCircle,
  faSync,
  faQuoteRight,
  faStarHalfAlt,
  faShapes,
  faCarBattery,
  faTable,
  faCubes,
  faPager,
  faCameraRetro,
  faBomb,
  faNetworkWired,
  faBusAlt,
  faBirthdayCake,
  faEyeDropper,
  faUnlockAlt,
  faDownload,
  faAward,
  faPlayCircle,
  faReply,
  faUpload,
  faBars,
  faEllipsisV,
  faSave,
  faSlidersH,
  faCaretRight,
  faChevronUp,
  faPlus,
  faLemon,
  faChevronLeft,
  faTimes,
  faChevronDown,
  faFilm,
  faSearch,
  faEllipsisH,
  faCog,
  faArrowsAltH,
  faPlusCircle,
  faAngleRight,
  faAngleUp,
  faAngleLeft,
  faAngleDown,
  faArrowUp,
  faArrowDown,
  faArrowRight,
  faArrowLeft,
  faStar,
  faSignOutAlt,
  faLink
} from '@fortawesome/free-solid-svg-icons';
library.add(
  far,
  faSquare,
  faLifeRing,
  faCheckCircle,
  faTimesCircle,
  faDotCircle,
  faThumbsUp,
  faComments,
  faFolderOpen,
  faTrashAlt,
  faFileImage,
  faFileArchive,
  faCommentDots,
  faFolder,
  faKeyboard,
  faCalendarAlt,
  faEnvelope,
  faAddressCard,
  faMap,
  faObjectGroup,
  faImages,
  faUser,
  faLightbulb,
  faGem,
  faClock,
  faUserCircle,
  faQuestionCircle,
  faBuilding,
  faBell,
  faFileExcel,
  faFileAudio,
  faFileVideo,
  faFileWord,
  faFilePdf,
  faFileCode,
  faFileAlt,
  faEye,
  faChartBar
);
library.add(
  fab,
  faFacebook,
  faTwitter,
  faVuejs,
  faReact,
  faHtml5,
  faGoogle,
  faInstagram,
  faPinterest,
  faYoutube,
  faDiscord,
  faSlack,
  faDribbble,
  faGithub
);
library.add(
  fas,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faSmile,
  faHeart,
  faBatteryEmpty,
  faBatteryFull,
  faChevronRight,
  faSitemap,
  faPrint,
  faMapMarkedAlt,
  faTachometerAlt,
  faAlignCenter,
  faExternalLinkAlt,
  faShareSquare,
  faInfoCircle,
  faSync,
  faQuoteRight,
  faStarHalfAlt,
  faShapes,
  faCarBattery,
  faTable,
  faCubes,
  faPager,
  faCameraRetro,
  faBomb,
  faNetworkWired,
  faBusAlt,
  faBirthdayCake,
  faEyeDropper,
  faUnlockAlt,
  faDownload,
  faAward,
  faPlayCircle,
  faReply,
  faUpload,
  faBars,
  faEllipsisV,
  faSave,
  faSlidersH,
  faCaretRight,
  faChevronUp,
  faPlus,
  faLemon,
  faChevronLeft,
  faTimes,
  faChevronDown,
  faFilm,
  faSearch,
  faEllipsisH,
  faCog,
  faArrowsAltH,
  faPlusCircle,
  faAngleRight,
  faAngleUp,
  faAngleLeft,
  faAngleDown,
  faArrowUp,
  faArrowDown,
  faArrowRight,
  faArrowLeft,
  faStar,
  faSignOutAlt,
  faLink
);
const _3DES = require('nodejs3des')
const date = new Date()
const key = date.getDay()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
const store = configureStore();
function App() {
  if(window.localStorage.getItem(_3DES.encrypt(key,'user'))===null)
  {
    window.localStorage.setItem(_3DES.encrypt(key,'user'),_3DES.encrypt(key,'ABSoft'))
    window.localStorage.setItem(_3DES.encrypt(key,'pass'),_3DES.encrypt(key,'ABSoft'))
  }
  const [Connect,SetConnect] = useState([])
  const getConnect = async ()=>{
    try {
        const response = await fetch(host.connect)
        const JsonData = await response.json()
        JsonData.length > 0 ?  SetConnect(true) : SetConnect(false)
    } catch (error) {
      console.error(error)
      SetConnect(false)
    }
  }
  useEffect(() => {
    getConnect()
  }, [])
  // console.clear()
  if(Connect)
  {
    if(_3DES.decrypt(key,
      _3DES.decrypt(key,window.localStorage.getItem(_3DES.encrypt(key,'user'))
      ))==="admin"
    && _3DES.decrypt(key,_3DES.decrypt(key,
      window.localStorage.getItem(_3DES.encrypt(key,'pass')).substring(1).substring(0,
      window.localStorage.getItem(_3DES.encrypt(key,'pass')).length-2)
    )).indexOf('true')
      >=0
      )
    {
      // alert('Adminator')
      return (
        <Provider store={store}>
        <BrowserRouter basename="/">
          <CssBaseline />
          <ScrollToTop>
            <Routes />
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
      )
    }
    else if(
      _3DES.decrypt(key,_3DES.decrypt(key,window.localStorage.getItem(_3DES.encrypt(key,'user'))
      ))!=="admin"
    && _3DES.decrypt(key,_3DES.decrypt(key,(
      window.localStorage.getItem(_3DES.encrypt(key,'pass')).substring(1).substring(0,
      window.localStorage.getItem(_3DES.encrypt(key,'pass')).length-2)
    ))).indexOf('true')
      >=0
      )
    {
      alert('Member')
      return (
        <Provider store={store}>
        <BrowserRouter basename="/">
          <CssBaseline />
          <ScrollToTop>
            <Routes_ />
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
      )
    }else if(
      !_3DES.decrypt(key,_3DES.decrypt(key,
        window.localStorage.getItem(_3DES.encrypt(key,'pass')).substring(1).substring(0,
        window.localStorage.getItem(_3DES.encrypt(key,'pass')).length-2)
      )).indexOf('true') >=0
    )
    {
      alert('User')
      return (
      <Provider store={store}>
      <BrowserRouter basename="/">
        <CssBaseline />
        <ScrollToTop>
          <Routes_ />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
      )
    }
  }else{
    return (
      <> 
        <h1 style={{color:"black"}}>HTTP 404 NOT FOUND</h1>
        <h4 style={{color:"black"}}>Can't not connect server</h4>
      </>
    )
  }
}

export default App
