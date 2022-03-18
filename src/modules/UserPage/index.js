import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc } from "firebase/firestore"; 
import './styles.css';

function UserPage(props) {
  const { isAdmin } = props;

  return (
    <div className="user-page">
    </div>
  );
}

export default UserPage;
