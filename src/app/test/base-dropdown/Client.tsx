'use client';
import React from 'react';
import styles from '@/app/test/base-dropdown/page.module.scss';
import className from 'classnames/bind'; 
import BaseDropdown from '@/widgets/dropdown/baseDropdown';

const cn = className.bind(styles);

const TestClientPage = () => {
  return (
    <div className={cn('container')}>
      <h2>Base Dropdown</h2>
      <section className={cn('element-container')}>
        <BaseDropdown
          label = "tricedesign.eth"
          labelIcon = "/icons/dropdown-head-icon.svg"
          options = {["View my data", "Disconnect"]}
          onSelect={(selectedOption) => console.log(`Selected: ${selectedOption}`)}
          optionIcons={["/icons/human-icon.svg", "/icons/leave-icon.svg"]}
          urls={[]}
          buttonImage="/icons/chevron-dropdown-icon.svg"
        />
      </section>
    </div>
  );
};

export default TestClientPage;
