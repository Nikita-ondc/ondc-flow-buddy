
import React, { useState } from 'react';
import { Button, Upload, Progress, message, Typography } from 'antd';
import { DownloadOutlined, UploadOutlined, FileTextOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { StepCard, InstructionList, UploadSection } from './StyledComponents';

const { Title, Paragraph } = Typography;

interface StepContentProps {
  currentStep: number;
  onSignInClick: () => void;
}

const StepContent: React.FC<StepContentProps> = ({ currentStep, onSignInClick }) => {
  const { isAuthenticated } = useAuth();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleDownloadCSV = () => {
    const csvContent = `Name,Email,Phone,Department
John Doe,john.doe@example.com,+1-234-567-8901,Engineering
Jane Smith,jane.smith@example.com,+1-234-567-8902,Marketing
Bob Johnson,bob.johnson@example.com,+1-234-567-8903,Sales
Alice Brown,alice.brown@example.com,+1-234-567-8904,HR`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'sample-data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    message.success('CSV file downloaded successfully!');
  };

  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.csv',
    beforeUpload: (file) => {
      if (!isAuthenticated) {
        message.error('Please sign in to upload files');
        return false;
      }

      const isCsv = file.type === 'text/csv' || file.name.endsWith('.csv');
      if (!isCsv) {
        message.error('You can only upload CSV files!');
        return false;
      }

      // Simulate upload progress
      setUploading(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            message.success('File uploaded successfully!');
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return false; // Prevent actual upload
    },
    onRemove: () => {
      setUploadProgress(0);
      setUploading(false);
    },
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepCard title="Instructions" extra={<FileTextOutlined />}>
            <Paragraph>
              Welcome to the ONDC Data Processing Tool. Follow these simple steps to get started:
            </Paragraph>
            <InstructionList>
              <li>Sign in with your credentials to access all features</li>
              <li>Download the sample CSV template from Step 2</li>
              <li>Prepare your data according to the template format</li>
              <li>Upload your CSV file in Step 3 for processing</li>
              <li>Review and validate your uploaded data</li>
            </InstructionList>
            {!isAuthenticated && (
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Button type="primary" size="large" onClick={onSignInClick}>
                  Sign In to Continue
                </Button>
              </div>
            )}
          </StepCard>
        );

      case 1:
        return (
          <StepCard title="Download CSV Template" extra={<DownloadOutlined />}>
            {isAuthenticated ? (
              <>
                <Paragraph>
                  Download the CSV template to understand the required data format. 
                  This template includes sample data and column headers.
                </Paragraph>
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<DownloadOutlined />}
                    onClick={handleDownloadCSV}
                  >
                    Download Sample CSV
                  </Button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Title level={4}>Authentication Required</Title>
                <Paragraph>Please sign in to download the CSV template.</Paragraph>
                <Button type="primary" onClick={onSignInClick}>
                  Sign In
                </Button>
              </div>
            )}
          </StepCard>
        );

      case 2:
        return (
          <StepCard title="Upload Your CSV File" extra={<UploadOutlined />}>
            {isAuthenticated ? (
              <>
                <Paragraph>
                  Upload your prepared CSV file. Make sure it follows the format from the downloaded template.
                </Paragraph>
                <UploadSection>
                  <Upload.Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag CSV file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Only CSV files are supported. Maximum file size: 10MB
                    </p>
                  </Upload.Dragger>
                </UploadSection>
                {uploading && (
                  <div style={{ marginTop: '24px' }}>
                    <Progress 
                      percent={uploadProgress} 
                      status={uploadProgress === 100 ? "success" : "active"}
                    />
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Title level={4}>Authentication Required</Title>
                <Paragraph>Please sign in to upload CSV files.</Paragraph>
                <Button type="primary" onClick={onSignInClick}>
                  Sign In
                </Button>
              </div>
            )}
          </StepCard>
        );

      default:
        return null;
    }
  };

  return renderStepContent();
};

export default StepContent;
