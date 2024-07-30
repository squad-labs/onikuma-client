'use client';
import React from 'react';
import styles from '@/app/test/otp-input/page.module.scss';
import className from 'classnames/bind';
import OTPInput from '@/widgets/inputs/otpInput';

const cn = className.bind(styles);

const TestClientPage = () => {
  const [otpValues, setOtpValues] = React.useState<string[]>(
    new Array(5).fill(''),
  );

  const handleOtpChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  return (
    <div className={cn('container')}>
      <h2>OTP Input</h2>
      <section className={cn('element-container')}>
        <OTPInput
          name="OTP"
          values={otpValues}
          change={handleOtpChange}
          shape="pill"
          helperText="This is a protip"
        />
      </section>
      <section className={cn('element-container')}>
      <OTPInput
          name="OTP"
          values={otpValues}
          change={handleOtpChange}
          shape="default"
          helperText="This is a protip"
        />
      </section>
    </div>
  );
};

export default TestClientPage;
