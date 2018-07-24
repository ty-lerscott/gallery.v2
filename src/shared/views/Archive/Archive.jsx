import React from 'react';
import uuid from 'uuid/v4';

import { Helmet } from 'react-helmet';
import styled, { css } from 'styled-components';

import { ViewWrapper } from '../index';
import { Consumer } from '../../context/Context.jsx';
import { Variables, ObjectUtil } from '../../utils';
import Thumbnail from './Thumbnail.jsx';


class Archive extends React.Component{
  constructor(props){
    super(props);
    const { state, actions } = this.props;

    this.state = state.archive ? {
      ...state.archive,
      render: false
    } : actions.ArchiveActions.stateManager.initState()
  }

  async componentWillReceiveProps(nextProps){
    const parentState = await nextProps.getParentState('archive');
    const stateChanged = ObjectUtil.compare(this.state, parentState).changed;
    if (stateChanged) {
      this.setState({
        ...this.state,
        ...parentState
      });
    }
  }

  async componentDidMount() {
    const {
      actions,
      stateUpdater
    } = this.props;
    const {ArchiveActions, GlobalActions} = actions;

    if(this.state.gallery.length === 0){
      const gallery = await ArchiveActions.gallery.getThumbnails();

      this.setState({
        ...this.state,
        gallery
      })

      await stateUpdater('archive', {
        ...this.state,
        gallery
      });
    }

    await GlobalActions.page.render(this.props, 'archive');
  }



  async componentWillUnmount() {
    await this.props.actions.GlobalActions.page.hide(this.props, 'archive');
  }

  async onThumbnailClick(albumName) {
    await this.props.stateUpdater('gallery', {
      albumName,
      render: false
    });
  }

  generateThumbnails() {
    const { gallery } = this.state;
    return (gallery.length) ? gallery.slice(0, gallery.length - (gallery.length%3)).map(item => {
      return (
        <Thumbnail
          key={uuid()}
          onClick={() => this.onThumbnailClick(item.url)}
          albumName={item.albumName}
          photoName={item.photoName}
          url={item.url}>
        </Thumbnail>
      )
    }) : null;
  }

  render(){
    const {
      location
    } = this.props;

    return (
      <ViewWrapper page="archive"
          render={this.state.render}>
        <Helmet title="Archive - Chicago Wedding & Portrait Photographer" />
        <GridWrapper>
          {this.generateThumbnails()}
        </GridWrapper>
      </ViewWrapper>
    )
  }
}

export default props => (
  <Consumer>
    {context => {
      return <Archive {...props} {...context} />
    }}
  </Consumer>
)

const GridWrapper = styled.div`
  display:grid;
  grid-gap: 10px;
  grid-template-columns: auto auto auto;
  width:100%;
  height:100%;

  @media only screen and (max-width:800px){
    grid-template-columns: auto auto;
  }

  @media only screen and (max-width:500px){
    grid-template-columns: auto;
  }
`
