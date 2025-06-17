
import React, { useState } from 'react';
import { Layout, Steps, Button, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/LoginModal';
import StepContent from '../components/StepContent';
import {
  StyledHeader,
  LogoContainer,
  MainContent,
  ContentContainer,
  StepsContainer
} from '../components/StyledComponents';

const { Step } = Steps;

const Index: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const steps = [
    {
      title: 'Instructions',
      description: 'Read the guidelines',
    },
    {
      title: 'Download CSV',
      description: 'Get the template file',
    },
    {
      title: 'Upload CSV',
      description: 'Submit your data',
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: user?.name || 'Profile',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ];

  const handleStepClick = (step: number) => {
    if (step === 0 || isAuthenticated) {
      setCurrentStep(step);
    }
  };

  const handleSignInClick = () => {
    setLoginModalOpen(true);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <StyledHeader>
        <LogoContainer>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#1890ff',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            marginRight: '12px'
          }}>
            ONDC
          </div>
          ONDC Data Portal
        </LogoContainer>
        
        <div>
          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>{user?.name}</span>
              </Space>
            </Dropdown>
          ) : (
            <Button type="primary" onClick={handleSignInClick}>
              Sign In
            </Button>
          )}
        </div>
      </StyledHeader>

      <MainContent>
        <ContentContainer>
          <StepsContainer>
            <Steps 
              current={currentStep} 
              size="default"
              onChange={handleStepClick}
            >
              {steps.map((step, index) => (
                <Step 
                  key={index}
                  title={step.title} 
                  description={step.description}
                  disabled={index > 0 && !isAuthenticated}
                />
              ))}
            </Steps>
            
            <StepContent 
              currentStep={currentStep}
              onSignInClick={handleSignInClick}
            />
          </StepsContainer>
        </ContentContainer>
      </MainContent>

      <LoginModal
        open={loginModalOpen}
        onCancel={() => setLoginModalOpen(false)}
      />
    </Layout>
  );
};

export default Index;
