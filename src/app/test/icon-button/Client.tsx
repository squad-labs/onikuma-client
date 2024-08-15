'use client';
import React from 'react';
import styles from '@/app/test/icon-button/page.module.scss';
import className from 'classnames/bind';
import IconButton from '@/widgets/button/iconButton';

const cn = className.bind(styles);

const TestClientPage = () => {
  return (
    <div className={cn('container')}>
      <h2>Icon Button</h2>
      <section className={cn('element-container')}>
        <IconButton
          name="Button"
          height="small"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <IconButton
          name="Button"
          height="small"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <IconButton
          name="Button"
          height="small"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <IconButton
          name="Button"
          height="small"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <IconButton
          name="Button"
          height="small"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <IconButton
          name="Button"
          height="small"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <IconButton
          name="Button"
          height="medium"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <IconButton
          name="Button"
          height="medium"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <IconButton
          name="Button"
          height="medium"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <IconButton
          name="Button"
          height="medium"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <IconButton
          name="Button"
          height="medium"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <IconButton
          name="Button"
          height="medium"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <IconButton
          name="Button"
          height="large"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <IconButton
          name="Button"
          height="large"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <IconButton
          name="Button"
          height="large"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <IconButton
          name="Button"
          height="large"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <IconButton
          name="Button"
          height="large"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <IconButton
          name="Button"
          height="large"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <IconButton
          name="Button"
          shape="rectangle"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
          text="Enabled"
        />
        <IconButton
          name="Button"
          shape="rectangle"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
          text="Enabled"
        />
        <IconButton
          name="Button"
          shape="rectangle"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
          text="Enabled"
        />
      </section>
    </div>
  );
};

export default TestClientPage;
