import { Component } from 'react';
import './index.css';
import {
  AllLinear,BottomLinear,CloseLinear,CommentLinear,CustomerServiceLinear,DateLinear,FemaleLinear,FireLinear,FullScreenLinear,InvisibleLinear,LeftLinear,LikeLinear,MessageLinear,MoreLinear,PlayLinear,RightLinear,SearchLinear,SelectLinear,StarLinear,TickLinear,TopLinear,CameraSurface,CloseSurface,DataSurface,DiagnosisSheetSurface,DietSurface,DoctorTeamSurface,EditSurface,EyeSurface,FilterSurface,HomePageSurface,HospitalSurface,LearningCenterSurface,MemberSurface,MessageSurface,MySurface,PhoneSurface,PlaySurface,PositioningSurface,PromptSurface,RecordSurface,TeamSurface,TimeSurface
} from '../com-icons/index';
import WxIcon, { IconEnum } from "../components/WxIcon";

export default class PickerDemo extends Component<{}> {
  render() {
    return (
      <div className="demo-icon">
        <span className="icon-item"><AllLinear /><span className="icon-name">AllLinear</span></span>
        <span className="icon-item"><BottomLinear /><span className="icon-name">BottomLinear</span></span>
        <span className="icon-item"><CloseLinear /><span className="icon-name">CloseLinear</span></span>
        <span className="icon-item"><CommentLinear /><span className="icon-name">CommentLinear</span></span>
        <span className="icon-item"><CustomerServiceLinear /><span className="icon-name">CustomerServiceLinear</span></span>
        <span className="icon-item"><DateLinear /><span className="icon-name">DateLinear</span></span>
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
        <span className="icon-item"><SelectLinear /><span className="icon-name">SelectLinear</span></span>
        <span className="icon-item"><StarLinear /><span className="icon-name">StarLinear</span></span>
        <span className="icon-item"><TickLinear /><span className="icon-name">TickLinear</span></span>
        <span className="icon-item"><TopLinear /><span className="icon-name">TopLinear</span></span>
        <span className="icon-item"><CameraSurface /><span className="icon-name">CameraSurface</span></span>
        <span className="icon-item"><CloseSurface /><span className="icon-name">CloseSurface</span></span>
        <span className="icon-item"><DataSurface /><span className="icon-name">DataSurface</span></span>
        <span className="icon-item"><DiagnosisSheetSurface /><span className="icon-name">DiagnosisSheetSurface</span></span>
        <span className="icon-item"><DietSurface /><span className="icon-name">DietSurface</span></span>
        <span className="icon-item"><DoctorTeamSurface /><span className="icon-name">DoctorTeamSurface</span></span>
        <span className="icon-item"><EditSurface /><span className="icon-name">EditSurface</span></span>
        <span className="icon-item"><EyeSurface /><span className="icon-name">EyeSurface</span></span>
        <span className="icon-item"><FilterSurface /><span className="icon-name">FilterSurface</span></span>
        <span className="icon-item"><HomePageSurface /><span className="icon-name">HomePageSurface</span></span>
        <span className="icon-item"><HospitalSurface /><span className="icon-name">HospitalSurface</span></span>
        <span className="icon-item"><LearningCenterSurface /><span className="icon-name">LearningCenterSurface</span></span>
        <span className="icon-item"><MemberSurface /><span className="icon-name">MemberSurface</span></span>
        <span className="icon-item"><MessageSurface /><span className="icon-name">MessageSurface</span></span>
        <span className="icon-item"><MySurface /><span className="icon-name">MySurface</span></span>
        <span className="icon-item"><PhoneSurface /><span className="icon-name">PhoneSurface</span></span>
        <span className="icon-item"><PlaySurface /><span className="icon-name">PlaySurface</span></span>
        <span className="icon-item"><PositioningSurface /><span className="icon-name">PositioningSurface</span></span>
        <span className="icon-item"><PromptSurface /><span className="icon-name">PromptSurface</span></span>
        <span className="icon-item"><RecordSurface /><span className="icon-name">RecordSurface</span></span>
        <span className="icon-item"><TeamSurface /><span className="icon-name">TeamSurface</span></span>
        <span className="icon-item"><TimeSurface /><span className="icon-name">TimeSurface</span></span>
        <WxIcon name={IconEnum.alllinear} color="blue" size={80} />
      </div>
    );
  }
}