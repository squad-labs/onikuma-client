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
            color="default"
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="Helper text"
            error={true}
            shape="rounded"
            color="error"
            icon={<i className="icon-class"></i>}
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="This is a protip"
            shape="pill"
            color="success"
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
            color="default"
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="Helper text"
            error={true}
            shape="rounded"
            color="error"
            icon={<i className="icon-class"></i>}
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="This is a protip"
            shape="pill"
            color="success"
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
            color="default"
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="Helper text"
            error={true}
            shape="rounded"
            color="error"
            icon={<i className="icon-class"></i>}
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="This is a protip"
            shape="pill"
            color="success"
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
            color="default"
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="Helper text"
            error={true}
            shape="rounded"
            color="error"
            icon={<i className="icon-class"></i>}
        />
        <TextInput
            name="Title"
            value={value}
            onChange={handleChange}
            placeholder="Text"
            helperText="This is a protip"
            shape="pill"
            color="success"
        />
      </section>
    </div>
  );
};

export default TestClientPage;
