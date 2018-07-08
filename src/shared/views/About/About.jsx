import React from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

import {
  ViewWrapper
} from '../index';

import {
  Consumer
} from '../../context/Context.jsx';

import { Variables, ObjectUtil } from '../../utils';

class About extends React.Component {
  constructor(props){
    super(props);

    const { state, actions } = this.props;

    console.log('mounting with this state');

    this.state = state.about ? {
      ...state.about,
      render: false
    } : actions.AboutActions.stateManager.initState()
  }

  async componentWillReceiveProps(nextProps){
    const parentState  = await nextProps.getParentState('about');
    const stateChanged = ObjectUtil.compare(this.state, parentState).changed;
    if(stateChanged) {
      this.setState({
        ...this.state,
        ...parentState
      });
    }
  }

  async componentDidMount(){
    await this.props.actions.AboutActions.page.render(this.props);
  }



  async componentWillUnmount(){
    await this.props.actions.AboutActions.page.hide(this.props);
  }


  render(){
    const {
      location
    } = this.props;

    return (
      <ViewWrapper page="about">
        <Helmet title="About - Chicago Wedding & Portrait Photographer" />
        <InnerWrapper
          render={this.state.render}>
          <LeftContent>
            <img src={`${Variables.origin}/api/images/portrait`} alt="self portrait" />
          </LeftContent>

          <RightContent>
            <h1>Hey!</h1>
            <p>
              I am a portrait &amp; wedding photographer who recently moved from NYC and now am based in the Chicago area and I do get to travel to some great places to capture beautiful memories.
              The people that I have had the chance to photograph along the way has really made this whole hobby of mine worthwhile. To be able to look back on your
              life by the moments captured in pictures, is the most rewarding souvenir of a life well spent. If you are looking to hold onto a special moment in your life,
              reach out and give me a call.
            </p>
            <p>
              <span className="sensative">607.882.0531</span><span className="abra"> | </span><span className="sensative">tyler.scott.14@gmail.com</span>
            </p>
          </RightContent>
        </InnerWrapper>
        <BackgroundWrapper
          render={this.state.render}/>
      </ViewWrapper>
    )
  }
}

export default props => (
  <Consumer>
    {context => {
      return <About {...props} {...context} />
    }}
  </Consumer>
)
const PageContainer = styled.div``;

const InnerWrapper = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  width: calc(100% + 20px);
  height:100%;
  overflow: auto;
  padding-right:20px;
  position:relative;
  z-index:10;
  transition: opacity 1s ease-in;
  ${props => css`
      opacity: ${props.render ? 1 : 0};
    `
  }

  @media only screen and (max-width:920px){
    flex-direction: column;
  }
`

const PositionedContent = styled.div`
  width: calc(50vw - 20px);
  height:33vh;
  max-width:535px;
`;


const LeftContent = PositionedContent.extend`
  height:50vh;
  display:flex;
  justify-content:center;

  img{
    height:100%;
    max-height:100%;
    max-width:100%;
  }

  @media only screen and (max-width:920px){
    max-width:none;
    width:50vw;
    height:50vw;
    margin:45px 0 20px 0;

    img{
      width:100%;
      height:auto;
      max-height:none;
    }
  }

  @media only screen and (max-width:468px){
    width:70vw;
    height:70vw;
    margin: 25px 0 20px 0;
  }
`;

const RightContent = PositionedContent.extend`
  h1{
    font-family:'Permanent Marker',cursive;
    font-size:50px;
    margin:0 0 20px 0;
    letter-spacing:2px;
    color:$textBlack;
  }

  p{
    font-size:16px;
    color:${Variables.textBlack};
    padding:0 0 20px 0;
    line-height:20px;
    word-spacing:1px;

    &:nth-of-type(odd){
      margin-bottom:20px;
    }

    .sensative{
      font-size:14px;
      color:${Variables.textBlack};
    }
  }

  @media only screen and (max-width:920px){
    max-width:none;
    width:50vw;

    p{
      padding:0;

      span{
        display:block;
        &:not(.sensative){
          display:none;
        }
      }

      &:first-of-type{ text-align:left; }
      &:last-of-type{ text-align:center; margin-bottom:40px;}
    }
  }

  @media only screen and (max-width:468px){
    width:70vw;
  }
`;

const BackgroundWrapper = styled.div`
  background-image:url(${Variables.ABOUT_BACKGROUND});
  background-repeat:no-repeat;
  background-size:cover;
  user-select: none;
  pointer-events: none;
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index:0;
  transition: opacity 1s ease-in;
  ${props => css`
      opacity: ${props.render ? 0.25 : 0};
    `
  }
`
