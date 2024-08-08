'use client';
import React from 'react';
import styles from '@/app/test/text-input/page.module.scss';
import className from 'classnames/bind';
import TextInput from '@/widgets/inputs/textInput';
import BlackCircleIcon from '@/assets/images/black-circle.svg';
import RedCircleIcon from '@/assets/images/red-circle.svg';

const cn = className.bind(styles);

const TestClientPage = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };
  return (
    <div className={cn('container')}>
      <h2>Text Input</h2>
      <section className={cn('element-container')}>
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="This is a protip"
          shape="default"
          state="default"
        ></TextInput>
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="Helper text"
          error={true}
          shape="default"
          state="error"
          children=""
        />
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="This is a protip"
          shape="default"
          state="success"
          children=""
        />
      </section>
      <section className={cn('element-container')}>
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="This is a protip"
          shape="pill"
          state="default"
        ></TextInput>
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="Helper text"
          error={true}
          shape="pill"
          state="error"
          children=""
        />
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="This is a protip"
          shape="pill"
          state="success"
          children=""
        />
      </section>
      <section className={cn('element-container')}>
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="This is a protip"
          shape="default"
          state="default"
        >
          <BlackCircleIcon viewBox="0 0 16 16" />
        </TextInput>
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="Helper text"
          error={true}
          shape="default"
          state="error"
        >
          <RedCircleIcon viewBox="0 0 16 16" />
        </TextInput>
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="This is a protip"
          shape="default"
          state="success"
        >
          <BlackCircleIcon viewBox="0 0 16 16" />
        </TextInput>
      </section>
      <section className={cn('element-container')}>
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="This is a protip"
          shape="pill"
          state="default"
        >
          <BlackCircleIcon viewBox="0 0 16 16" />
        </TextInput>
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="Helper text"
          error={true}
          shape="pill"
          state="error"
        >
          <RedCircleIcon viewBox="0 0 16 16" />
        </TextInput>
        <TextInput
          name="Title"
          value={value}
          onChange={handleChange}
          placeholder="Text"
          helperText="This is a protip"
          shape="pill"
          state="default"
        >
          <BlackCircleIcon viewBox="0 0 16 16" />
        </TextInput>
      </section>
      <section className={cn('element-container')}>
        <TextInput
          name="Title"
          type="number"
          value={value}
          onChange={handleChange}
          placeholder="number"
          helperText="This is a protip"
          shape="pill"
          state="default"
          showButtons={true}
          allowsNegative={false}
        ></TextInput>
        <TextInput
          name="Title"
          type="number"
          value={value}
          onChange={handleChange}
          placeholder="number"
          helperText="Helper text"
          error={true}
          shape="pill"
          state="error"
          showButtons={true}
          allowsNegative={false}
        ></TextInput>
        <TextInput
          name="Title"
          type="number"
          value={value}
          onChange={handleChange}
          placeholder="number"
          helperText="This is a protip"
          shape="pill"
          state="default"
          showButtons={true}
          allowsNegative={false}
        ></TextInput>
      </section>
      <section className={cn('element-container')}>
        <TextInput
          name="Title"
          type="number"
          value={value}
          onChange={handleChange}
          placeholder="number"
          helperText="This is a protip"
          shape="default"
          state="default"
          showButtons={true}
          allowsNegative={false}
        ></TextInput>
        <TextInput
          name="Title"
          type="number"
          value={value}
          onChange={handleChange}
          placeholder="number"
          helperText="Helper text"
          error={true}
          shape="default"
          state="error"
          showButtons={true}
          allowsNegative={false}
        ></TextInput>
        <TextInput
          name="Title"
          type="number"
          value={value}
          onChange={handleChange}
          placeholder="number"
          helperText="This is a protip"
          shape="default"
          state="default"
          showButtons={true}
          allowsNegative={false}
        ></TextInput>
      </section>
    </div>
  );
};

export default TestClientPage;
