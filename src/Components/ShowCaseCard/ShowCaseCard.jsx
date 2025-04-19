import React from 'react';
import { Card } from 'antd';
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

import ShowCase1 from '../../assets/ShowCase1.jpg'

const ShowCaseCard = () => (
  <div>
    <img
      src={ShowCase1}
      alt=""
    />
  </div>
);
export default ShowCaseCard;