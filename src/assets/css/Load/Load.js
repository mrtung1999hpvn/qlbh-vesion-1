import React, { useState } from 'react';
import IMG from '../../images/Spinner-1s-200px.gif';
import './Load.css';
function Load() {
  const [loading, setLoading] = useState(false);
  return [
    loading ? (
      <>
        <div className="text-center">
          <h4>Đang tải dữ liệu . . .</h4>
        </div>
        <div className="fp-container">
          <img src={IMG} className="fp-loader" alt="loading" />
        </div>
      </>
    ) : null,
    () => setLoading(true),
    () => setLoading(false)
  ];
}

export default Load;
