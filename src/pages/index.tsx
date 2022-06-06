import { Component } from 'react';
import './index.css';
import {
  AddLinear,AllLinear,CloseLinear,CommentLinear,CustomerServiceLinear,DateLinear,DownLinear,FemaleLinear,FireLinear,FullScreenLinear,InvisibleLinear,LeftLinear,LikeLinear,MessageLinear,MoreLinear,PlayLinear,RightLinear,SearchLinear,StarLinear,TickLinear,UpLinear,CameraFaceted,CloseFaceted,DataFaceted,DiagnosisSheetFaceted,DietFaceted,DoctorTeamFaceted,EditFaceted,EyesFaceted,FilterFaceted,HomePageFaceted,HospitalFaceted,LearningCenterFaceted,MembersFaceted,MessageFaceted,MyFaceted,PhoneFaceted,PlayFaceted,PositioningFaceted,PromptFaceted,RecordFaceted,TeamFaceted,TimeFaceted
} from '../com-icons/index';
import WxIcon from "../components/WxIcon";

export default class PickerDemo extends Component<{}> {
  render() {
    return (
      <div className="demo-icon">
        <span className="icon-item"><AddLinear /><span className="icon-name">AddLinear</span></span>
        <span className="icon-item"><AllLinear /><span className="icon-name">AllLinear</span></span>
        <span className="icon-item"><CloseLinear /><span className="icon-name">CloseLinear</span></span>
        <span className="icon-item"><CommentLinear /><span className="icon-name">CommentLinear</span></span>
        <span className="icon-item"><CustomerServiceLinear /><span className="icon-name">CustomerServiceLinear</span></span>
        <span className="icon-item"><DateLinear /><span className="icon-name">DateLinear</span></span>
        <span className="icon-item"><DownLinear /><span className="icon-name">DownLinear</span></span>
        <span className="icon-item"><FemaleLinear /><span className="icon-name">FemaleLinear</span></span>
        <span className="icon-item"><FireLinear /><span className="icon-name">FireLinear</span></span>
        <span className="icon-item"><FullScreenLinear /><span className="icon-name">FullScreenLinear</span></span>
        <span className="icon-item"><InvisibleLinear /><span className="icon-name">InvisibleLinear</span></span>
        <span className="icon-item"><LeftLinear /><span className="icon-name">LeftLinear</span></span>
        <span className="icon-item"><LikeLinear /><span className="icon-name">LikeLinear</span></span>
        <span className="icon-item"><MessageLinear /><span className="icon-name">MessageLinear</span></span>
        <span className="icon-item"><MoreLinear /><span className="icon-name">MoreLinear</span></span>
        <span className="icon-item"><PlayLinear /><span className="icon-name">PlayLinear</span></span>
        <span className="icon-item"><RightLinear /><span className="icon-name">RightLinear</span></span>
        <span className="icon-item"><SearchLinear /><span className="icon-name">SearchLinear</span></span>
        <span className="icon-item"><StarLinear /><span className="icon-name">StarLinear</span></span>
        <span className="icon-item"><TickLinear /><span className="icon-name">TickLinear</span></span>
        <span className="icon-item"><UpLinear /><span className="icon-name">UpLinear</span></span>
        <span className="icon-item"><CameraFaceted /><span className="icon-name">CameraFaceted</span></span>
        <span className="icon-item"><CloseFaceted /><span className="icon-name">CloseFaceted</span></span>
        <span className="icon-item"><DataFaceted /><span className="icon-name">DataFaceted</span></span>
        <span className="icon-item"><DiagnosisSheetFaceted /><span className="icon-name">DiagnosisSheetFaceted</span></span>
        <span className="icon-item"><DietFaceted /><span className="icon-name">DietFaceted</span></span>
        <span className="icon-item"><DoctorTeamFaceted /><span className="icon-name">DoctorTeamFaceted</span></span>
        <span className="icon-item"><EditFaceted /><span className="icon-name">EditFaceted</span></span>
        <span className="icon-item"><EyesFaceted /><span className="icon-name">EyesFaceted</span></span>
        <span className="icon-item"><FilterFaceted /><span className="icon-name">FilterFaceted</span></span>
        <span className="icon-item"><HomePageFaceted /><span className="icon-name">HomePageFaceted</span></span>
        <span className="icon-item"><HospitalFaceted /><span className="icon-name">HospitalFaceted</span></span>
        <span className="icon-item"><LearningCenterFaceted /><span className="icon-name">LearningCenterFaceted</span></span>
        <span className="icon-item"><MembersFaceted /><span className="icon-name">MembersFaceted</span></span>
        <span className="icon-item"><MessageFaceted /><span className="icon-name">MessageFaceted</span></span>
        <span className="icon-item"><MyFaceted /><span className="icon-name">MyFaceted</span></span>
        <span className="icon-item"><PhoneFaceted /><span className="icon-name">PhoneFaceted</span></span>
        <span className="icon-item"><PlayFaceted /><span className="icon-name">PlayFaceted</span></span>
        <span className="icon-item"><PositioningFaceted /><span className="icon-name">PositioningFaceted</span></span>
        <span className="icon-item"><PromptFaceted /><span className="icon-name">PromptFaceted</span></span>
        <span className="icon-item"><RecordFaceted /><span className="icon-name">RecordFaceted</span></span>
        <span className="icon-item"><TeamFaceted /><span className="icon-name">TeamFaceted</span></span>
        <span className="icon-item"><TimeFaceted /><span className="icon-name">TimeFaceted</span></span>
        <WxIcon name="addlinear" color={['blue','rgb(76, 176, 255)']} size={80} />
      </div>
    );
  }
}