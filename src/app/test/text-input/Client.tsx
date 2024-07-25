'use client';
import React from 'react';
import styles from '@/app/test/text-input/page.module.scss';
import className from 'classnames/bind';
import TextInput from '@/widgets/inputs/textInput';

const cn = className.bind(styles);

const TestClientPage = () => {

    const [value, setValue] = React.useState('');

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
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
            children=""
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="Helper text"
            error={true}
            shape="default"
            state="error"
            icon={<i className="icon-class"></i>}
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
            children=""
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="Helper text"
            error={true}
            shape="pill"
            state="error"
            icon={<i className="icon-class"></i>}
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
            children=""
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="Helper text"
            error={true}
            shape="default"
            state="error"
            icon={<i className="icon-class"></i>}
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
            children=""
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="Helper text"
            error={true}
            shape="pill"
            state="error"
            icon={<i className="icon-class"></i>}
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
    </div>
  );
};

export default TestClientPage;
