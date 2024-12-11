import React, { useState, useEffect } from 'react';
import './MainContent.css';

function MainContent() {
  const [aleoAddress, setAleoAddress] = useState('');
  const [date, setDate] = useState<any>('');
  const [sentMessages, setSentMessages] = useState<any[]>([]);
  const [publicKey, setPublicKey] = useState('');
  const [connected, setConnected] = useState(false);

  

  return (
    <div className={`main-container`}>
      

      <div className="card-box pd-20 height-100-p mb-30">
        <div className="row align-items-center">
          <div className="col-md-4">
            <img src="vendors/images/banner-img.png" alt="" />
          </div>
          <div className="col-md-8">
            <h4 className="font-20 weight-500 mb-10 text-capitalize">
                <p className="welcome-to">
                  ZUMP.FUN
                </p>
            </h4>
          </div>
        </div>
      </div>

      <div className="card-box pb-10">
        <div className="h5 pd-20 mb-0"><i className="icon-copy dw dw-microphone-11"></i> My Zumps</div>
        <table className="data-table table nowrap">
          <thead>
            <tr>
              <th className="table-plus">Addr</th>
              <th>Symbol</th>
              <th>Supply</th>
              <th className="datatable-nosort">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sentMessages.map((msg, index) => (
              <tr key={index}>
                <td className="table-plus">
                  <div className="name-avatar d-flex align-items-center">
                    <div className="avatar mr-2 flex-shrink-0">
                      <img src="/assets/anon2.jpeg" alt="Avatar" />
                    </div>
                    <div className="txt"><div className="weight-600">{publicKey || 'N/A'}</div></div>
                  </div>
                </td>
                <td>{new Date(msg.date * 1000).toLocaleString()}</td>
                <td><span className="badge badge-pill" data-bgcolor="#e7ebf5" data-color="#265ed7">sent|view</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
}

export default MainContent;
