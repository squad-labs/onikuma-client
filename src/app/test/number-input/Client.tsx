'use client';
import React, { useState, useCallback } from 'react';
import styles from '@/app/test/number-input/page.module.scss';
import className from 'classnames/bind';
import NumberInput from '@/widgets/inputs/numberInput';

const cn = className.bind(styles);

const TestClientPage = () => {
  const [value, setValue] = useState<number | ''>('');

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue =
        event.target.value === '' ? '' : Number(event.target.value);
      setValue(newValue);
    },
    [],
  );

  const handleClick = useCallback((newValue: number | '') => {
    setValue(newValue);
  }, []);

  return (
    <div className={cn('container')}>
      <h2>Number Input</h2>
      <section className={cn('element-container')}>
        <NumberInput
          label="Title"
          value={value}
          onChange={handleChange}
          onClick={handleClick}
          shape="pill"
          state="default"
          placeholder="number"
          helperText="This is a protip"
        />
        <NumberInput
          label="Title"
          value={value}
          onChange={handleChange}
          onClick={handleClick}
          shape="pill"
          state="error"
          placeholder="number"
          helperText="Helper Text"
        />
        <NumberInput
          label="Title"
          value={value}
          onChange={handleChange}
          onClick={handleClick}
          shape="pill"
          state="success"
          placeholder="number"
          helperText="This is a protip"
        />
      </section>
      <section className={cn('element-container')}>
        <NumberInput
          label="Title"
          value={value}
          onChange={handleChange}
          onClick={handleClick}
          shape="default"
          state="default"
          placeholder="number"
          helperText="This is a protip"
        />
        <NumberInput
          label="Title"
          value={value}
          onChange={handleChange}
          onClick={handleClick}
          shape="default"
          state="error"
          placeholder="number"
          helperText="Helper Text"
        />
        <NumberInput
          label="Title"
          value={value}
          onChange={handleChange}
          onClick={handleClick}
          shape="default"
          state="success"
          placeholder="number"
          helperText="This is a protip"
        />
      </section>
    </div>
  );
};

export default TestClientPage;
