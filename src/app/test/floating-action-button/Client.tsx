'use client';
import React from 'react';
import styles from '@/app/test/floating-action-button/page.module.scss';
import className from 'classnames/bind';
import FloatingActionButton from '@/widgets/button/floatingActionButton';

const cn = className.bind(styles);

const TestClientPage = () => {
  return (
    <div className={cn('container')}>
      <h2>Floating Action Button</h2>
      <section className={cn('element-container')}>
        <FloatingActionButton
          name="Button"
          height="small"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <FloatingActionButton
          name="Button"
          height="small"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <FloatingActionButton
          name="Button"
          height="small"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <FloatingActionButton
          name="Button"
          height="small"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <FloatingActionButton
          name="Button"
          height="small"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <FloatingActionButton
          name="Button"
          height="small"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <FloatingActionButton
          name="Button"
          height="medium"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <FloatingActionButton
          name="Button"
          height="medium"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <FloatingActionButton
          name="Button"
          height="medium"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <FloatingActionButton
          name="Button"
          height="medium"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <FloatingActionButton
          name="Button"
          height="medium"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <FloatingActionButton
          name="Button"
          height="medium"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <FloatingActionButton
          name="Button"
          height="large"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <FloatingActionButton
          name="Button"
          height="large"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <FloatingActionButton
          name="Button"
          height="large"
          shape="square"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <FloatingActionButton
          name="Button"
          height="large"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
        />
        <FloatingActionButton
          name="Button"
          height="large"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
        />
        <FloatingActionButton
          name="Button"
          height="large"
          shape="round"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
          disabled={false}
        />
      </section>
      <section className={cn('element-container')}>
        <FloatingActionButton
          name="Button"
          shape="rectangle"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={true}
          text="Enabled"
        />
        <FloatingActionButton
          name="Button"
          shape="rectangle"
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
          disabled={false}
          text="Enabled"
        />
        <FloatingActionButton
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
