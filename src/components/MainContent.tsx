import React, { useState, useEffect } from 'react';
import './MainContent.css';
import './MakeFun.css';
import MakeFun from './MakeFun';

function MainContent() {
  const [aleoAddress, setAleoAddress] = useState('');
  const [date, setDate] = useState<any>('');
  const [sentMessages, setSentMessages] = useState<any[]>([]);
  const [publicKey, setPublicKey] = useState('');
  const [connected, setConnected] = useState(false);

  

  return (
      <div className={`main-container`}>
          <img src="src/assets/aleo.png" alt="Moving and Spinning Image" className="moving-image"/>


          <div className="row align-items-center">
              <img src="vendors/images/banner-img.png" alt=""/>
              <div className="col-md-8">
                  <p className="welcome-to">
                      <img src="src/assets/Lion_8bit_04.png" width={100}/>
                      ZUMP.FUN
                      <img src="src/assets/Lion_8bit_04.png" width={100}/>
                  </p>
              </div>
          </div>
          <div><img src="src/assets/runningLion.gif" width={500}/></div>
          <div className="make-fun-container">
              <MakeFun/>
          </div>
      </div>
  );
}

export default MainContent;
