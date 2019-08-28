import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  subTitle?: string;
  bgImg?: string;
  profileImg?: string;
  icon?: string;
}

const ActiveRecruitItem: React.FC<Props> = (props) => {
  const { title, subTitle, profileImg, bgImg} = props;

  return (
    <Li>
      <A>
        <Header>
          <BackgroundImage src={bgImg} alt={'Background image'}/>
        </Header>
        <Footer>
          <ProfileImage src={profileImg} alt={'Profile image'}/>
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </Footer>
      </A>
    </Li>
  );
};

const Li = styled.li`
  width: calc(20% - 20px);
  float: left;
  margin: 0 10px;
  position: relative;
`;

const A = styled.a`
  color: inherit;
  text-decoration: inherit;
  cursor: pointer;
`;

const Header = styled.header`
  display: block;
  height: 147px;
  z-index: 1px;
  border-radius: 3px 3px 0 0;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  height: calc(100% + 1px);
  border-radius: 3px 3px 0 0;
  background-color: #f2f2f2;
  background-repeat: no-repeat;
  transition: all .5s ease-in-out;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
  
  &:hover {
    transform: scale(1.06);
  }
`;

const Footer = styled.footer`
  position: relative;
  padding: 34px 16px 0;
  height: 124px;
  border: 1px solid #e1e2e3;
  border-top: none;
  border-radius: 0 0 3px 3px;
`;

const ProfileImage = styled.img`
  position: absolute;
  top: -18px;
  left: 15px;
  width: 36px;
  height: 36px;
  background-color: #f2f2f2;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
`;

const Title = styled.h4`
  position: relative;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: #333;
  line-height: 1.2;
  margin: 4px 0;
  overflow: hidden;
  max-height: 58px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const SubTitle = styled.h5`
  color: #999;
  margin-top: 6px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.2px;
  line-height: 1.1;
`;

export default ActiveRecruitItem;
