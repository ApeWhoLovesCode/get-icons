import { Component } from 'react';
import './index.css';
import {
  AccountBookTwoTone,EditOneFace,MedicalOneFace,PlayLinear,TickLinear
} from '../com-icons/index';

export default class PickerDemo extends Component<{}> {
  render() {
    return (
      <div className="demo-icon">
        <span className="icon-item"><AccountBookTwoTone /></span>
        <span className="icon-item"><EditOneFace /></span>
        <span className="icon-item"><MedicalOneFace /></span>
        <span className="icon-item"><PlayLinear /></span>
        <span className="icon-item"><TickLinear /></span>
      </div>
    );
  }
}