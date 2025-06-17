
import styled from 'styled-components';
import { Layout, Card } from 'antd';

export const StyledHeader = styled(Layout.Header)`
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
`;

export const LogoImage = styled.img`
  height: 40px;
  margin-right: 12px;
`;

export const MainContent = styled(Layout.Content)`
  margin-top: 64px;
  padding: 40px 24px;
  min-height: calc(100vh - 64px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const StepsContainer = styled.div`
  margin: 40px 0;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

export const StepCard = styled(Card)`
  margin-top: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  .ant-card-body {
    padding: 32px;
  }
`;

export const InstructionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0;
  
  li {
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    
    &:last-child {
      border-bottom: none;
    }
    
    &::before {
      content: '✓';
      color: #52c41a;
      font-weight: bold;
      margin-right: 12px;
      width: 20px;
      text-align: center;
    }
  }
`;

export const UploadSection = styled.div`
  text-align: center;
  padding: 40px;
  background: #fafafa;
  border-radius: 8px;
  border: 2px dashed #d9d9d9;
  margin: 24px 0;
  
  &:hover {
    border-color: #1890ff;
    background: #f0f8ff;
  }
`;
