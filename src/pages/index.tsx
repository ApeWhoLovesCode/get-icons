/* eslint-disable react/forbid-elements */
import { Component } from 'react';
import {AccountBookTwoTone, MedicalOneFace} from '../com-icons/index'
import './index.css';

interface _State {
}

export default class PickerDemo extends Component<{}, _State> {
  componentDidMount() {
  }

  render() {
    return (
      <div className="demo-icon">
        <span className="icon-item">
          <AccountBookTwoTone rotate={30} spin twoToneColor={['#ffa000','#64b532']} style={{fontSize: '50px'}} />
        </span>
        <span className="icon-item">
          <MedicalOneFace style={{color: 'skyblue', fontSize: '50px'}} />
        </span>
      </div>
    );
  }
}

