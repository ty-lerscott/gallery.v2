import React from 'react';
import {
  Header,
  Footer
} from '../components';

import styled, { css } from 'styled-components';

export default class ViewWrapper extends React.Component {
  render(){
    return(
      <React.Fragment>
        <Header hideMenu={this.props.hideMenu} />
        <Page
          render={this.props.render}>
          <PageContainer className={this.props.page}>
            {this.props.children}
          </PageContainer>
        </Page>
        <Footer />
      </React.Fragment>
    )
  }
}

const Page = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  user-select: ${props => (/homepage/.test(props.page)) ? 'none' : 'initial' };
  transition: opacity 500ms ease;
  opacity: ${props => props.render ? 1 : 0};
`;

const PageContainer = styled.div`
  height: inherit;
  width: inherit;
  position:relative;

  &.archive, &.gallery{
    overflow-y: auto;
    padding-right:20px;
    margin-right:20px;
  }
`;
