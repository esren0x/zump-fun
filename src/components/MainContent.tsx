import React, { useState, useEffect } from 'react';
import './MainContent.css';
import aleoLogo from '../assets/aleo.svg'
import sidebarIcon from '../assets/sidebar.svg';

function MainContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [aleoAddress, setAleoAddress] = useState('');
  const [coBind, setCoBind] = useState('');
  const [placeMessage, setPlaceMessage] = useState('');
  const [date, setDate] = useState<any>('');
  const [sentMessages, setSentMessages] = useState<any[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<any[]>([]);
  const [publicKey, setPublicKey] = useState('');
  const [connected, setConnected] = useState(false);

  const matrix = [
    ['1', ' ', '.', ',', '!'],
    ['2', 'a', 'b', 'c'],
    ['3', 'd', 'e', 'f'],
    ['4', 'g', 'h', 'i'],
    ['5', 'j', 'k', 'l'],
    ['6', 'm', 'n', 'o'],
    ['7', 'p', 'q', 'r', 's'],
    ['8', 't', 'u', 'v'],
    ['9', 'w', 'x', 'y', 'z'],
    ['0', '-', '_', '@', '*', '+'],
  ];


  const handleStartRecording = () => {
    setRecordedText('Sample recorded text');
    convertToBigInt('Sample recorded text');
  };

  const convertToBigInt = (txt: string) => {
    let message = '';
    for (let i = 0; i < txt.length; i++) {
      for (let x = 0; x < matrix.length; x++) {
        if (matrix[x].indexOf(txt[i]) !== -1) {
          message += x + '' + matrix[x].indexOf(txt[i]);
        }
      }
    }
    setPlaceMessage(message);
  };

  const handleSend = () => {
    if (aleoAddress.trim() === '') {
      alert('Please enter something.');
    } else if (!aleoAddress.startsWith('aleo1') || aleoAddress.length !== 63) {
      alert('Not an Aleo address');
    } else {
      const currentDate = Math.floor(Date.now() / 1000);
      setDate(currentDate);
      alert('Input is valid!');

      setSentMessages([
        ...sentMessages,
        {
          addr: aleoAddress,
          msg: placeMessage,
          date: currentDate,
        },
      ]);
    }
  };

  useEffect(() => {
    setPublicKey('YourPublicKeyHere');
    setConnected(true);

    setReceivedMessages([
      {
        addr: 'test1',
        msg: '89775582',
        date: '10 months ago',
      },
    ]);
  }, []);

  return (
    <div className={`main-container ${isSidebarOpen ? 'shifted' : ''}`}>
      

      <div className="card-box pd-20 height-100-p mb-30">
        <div className="row align-items-center">
          <div className="col-md-4">
            <img src="vendors/images/banner-img.png" alt="" />
          </div>
          <div className="col-md-8">
            <h4 className="font-20 weight-500 mb-10 text-capitalize">
                <p className="welcome-to">
                Welcome To
                </p>
               <div className="weight-600 font-30 text-blue">Aleo-Voice</div>
            </h4>
            <p className="welcome-text">
              <strong>
              The Aleo voice text program is designed for sending voice messages (or any form of data represented as u128) between two users on the Aleo blockchain. The program ensures that only the sender and the receiver have access to the content of the message through encryption and hashing techniques.
<br />
<br />
So instead of sending tokens, user A can send voice privatized data to user B with a generated encrypt key which can be decrypted
<br />
<br />
Secure Messaging: The program can be used to securely send messages between users on the Aleo blockchain, ensuring that only the sender and receiver can access the content of the message.
<br />
<br />
Confidential Communication: By using hashing and encryption, the program ensures that messages are private and only visible to the intended recipient.
<br />
<br />
Data Integrity: The program checks the integrity of the users involved in the communication by hashing and combining their addresses, ensuring that the message is securely bound to both the sender and receiver.
<br />
<br />
Thank you!!! ;)
              </strong>
            </p>
          </div>
        </div>
      </div>

      <div className="row pb-10">
        <div className="col-xl-12 col-lg-12 col-md-12 mb-20">
          <div className="card-box height-100-p widget-style3">
            <div className="d-flex flex-wrap">
              <div className="widget-data">
                <div className="weight-700 font-24 text-dark">
                  <img src={aleoLogo} alt="Aleo Logo" width="60" height="40" /> - Test My Message
                </div>
                <div className="font-14 text-secondary weight-500">
                  communicate with friends with privacy. 1st Aleo messaging private application!
                </div>
                <br />
                <button className="btn btn-outline-primary" onClick={handleStartRecording}>
                  Start Recording
                </button>
                <br />
                <br />
                <div id="output">{recordedText && `Recording ended. Text: ${recordedText}`}</div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Recipient Aleo Address"
                  value={aleoAddress}
                  onChange={(e) => setAleoAddress(e.target.value)}
                />
                <button className="form-control" onClick={handleSend} >Send a Message!! </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-box pb-10">
        <div className="h5 pd-20 mb-0"><i className="icon-copy dw dw-microphone-11"></i> Sent Message(s)</div>
        <table className="data-table table nowrap">
          <thead>
            <tr>
              <th className="table-plus">Addr</th>
              <th>Msg</th>
              <th>Date</th>
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
                <td>{msg.msg}</td>
                <td>{new Date(msg.date * 1000).toLocaleString()}</td>
                <td><span className="badge badge-pill" data-bgcolor="#e7ebf5" data-color="#265ed7">sent|view</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-box pb-10">
        <div className="h5 pd-20 mb-0"><i className="icon-copy dw dw-microphone-11"></i> Received Message(s)</div>
        <table className="data-table table nowrap">
          <thead>
            <tr>
              <th className="table-plus">Addr</th>
              <th>Msg</th>
              <th>Date</th>
              <th className="datatable-nosort">Actions</th>
            </tr>
          </thead>
          <tbody>
            {receivedMessages.map((msg, index) => (
              <tr key={index}>
                <td className="table-plus">
                  <div className="name-avatar d-flex align-items-center">
                    <div className="avatar mr-2 flex-shrink-0">
                      <img src="/assets/anon2.jpeg" alt="Avatar" />
                    </div>
                    <div className="txt"><div className="weight-600">{msg.addr}</div></div>
                  </div>
                </td>
                <td>{msg.msg}</td>
                <td>{msg.date}</td>
                <td><span className="badge badge-pill" data-bgcolor="#e7ebf5" data-color="#265ed7">received|view</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainContent;
