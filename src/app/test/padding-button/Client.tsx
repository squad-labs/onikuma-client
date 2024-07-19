'use client';
import React from 'react';
import styles from '@/app/test/base-button/page.module.scss';
import className from 'classnames/bind';
import PaddingButton from '@/widgets/button/paddingButton';

const cn = className.bind(styles);

const TestClientPage = () => {
  return (
    <div className={cn('container')}>
      <h2>Padding Button</h2>
      <section className={cn('element-container')}>
        <PaddingButton
          name="Button"
          height={'large'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <PaddingButton
          name="Button"
          height={'medium'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <PaddingButton
          name="Button"
          height={'small'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <PaddingButton
          name="Button"
          disabled
          height={'large'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <PaddingButton
          name="Button"
          disabled
          height={'medium'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <PaddingButton
          name="Button"
          disabled
          height={'small'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
      </section>
      <section className={cn('element-container')}>
        <PaddingButton
          name="Button"
          height={'large'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <PaddingButton
          name="Button"
          height={'medium'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <PaddingButton
          name="Button"
          height={'small'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <PaddingButton
          name="Button"
          disabled
          height={'large'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <PaddingButton
          name="Button"
          disabled
          height={'medium'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <PaddingButton
          name="Button"
          disabled
          height={'small'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
      </section>
      <section className={cn('element-container')}>
        <PaddingButton
          name="Button"
          height={'large'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <PaddingButton
          name="Button"
          height={'medium'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <PaddingButton
          name="Button"
          height={'small'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <PaddingButton
          name="Button"
          disabled
          height={'large'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <PaddingButton
          name="Button"
          disabled
          height={'medium'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <PaddingButton
          name="Button"
          disabled
          height={'small'}
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
      </section>
    </div>
  );
};

export default TestClientPage;
