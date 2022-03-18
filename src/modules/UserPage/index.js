import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc } from "firebase/firestore"; 
import './styles.css';
import { useConvertNumberSystems } from '../../utils';

function UserPage(props) {
  const { isAdmin } = props;
  const [start, end] = useConvertNumberSystems({});
  console.log('!!',start,end);
  return (
    <div className="user-page">
      test
    </div>
  );
}

export default UserPage;
