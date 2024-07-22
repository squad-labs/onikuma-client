'use client';
import React from 'react';
import styles from '@/app/test/base-button/page.module.scss';
import className from 'classnames/bind';
import BaseButton from '@/widgets/button/baseButton';

const cn = className.bind(styles);

const TestClientPage = () => {
  return (
    <div className={cn('container')}>
      <h2>Base Button</h2>
      <section className={cn('element-container')}>
        <BaseButton
          shape={'shape-1'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <BaseButton
          shape={'shape-2'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <BaseButton
          shape={'shape-3'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <BaseButton
          shape={'shape-4'}
          name="Button"
          fontSize={'large'}
          fontWeight={'bold'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <BaseButton
          shape={'shape-5'}
          name="Button"
          fontSize={'large'}
          fontWeight={'bold'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <BaseButton
          shape={'shape-6'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
      </section>
      <section className={cn('element-container')}>
        <BaseButton
          disabled
          shape={'shape-1'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <BaseButton
          disabled
          shape={'shape-2'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <BaseButton
          disabled
          shape={'shape-3'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <BaseButton
          disabled
          shape={'shape-4'}
          name="Button"
          fontSize={'large'}
          fontWeight={'bold'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <BaseButton
          disabled
          shape={'shape-5'}
          name="Button"
          fontSize={'large'}
          fontWeight={'bold'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
        <BaseButton
          disabled
          shape={'shape-6'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-red']}
        />
      </section>
      <section className={cn('element-container')}>
        <BaseButton
          shape={'shape-1'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <BaseButton
          shape={'shape-2'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <BaseButton
          shape={'shape-3'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <BaseButton
          shape={'shape-4'}
          name="Button"
          fontSize={'large'}
          fontWeight={'bold'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <BaseButton
          shape={'shape-5'}
          name="Button"
          fontSize={'large'}
          fontWeight={'bold'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <BaseButton
          shape={'shape-6'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
      </section>
      <section className={cn('element-container')}>
        <BaseButton
          disabled
          shape={'shape-1'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <BaseButton
          disabled
          shape={'shape-2'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <BaseButton
          disabled
          shape={'shape-3'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <BaseButton
          disabled
          shape={'shape-4'}
          name="Button"
          fontSize={'large'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <BaseButton
          disabled
          shape={'shape-5'}
          name="Button"
          fontSize={'large'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
        <BaseButton
          disabled
          shape={'shape-6'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-blue']}
        />
      </section>
      <section className={cn('element-container')}>
        <BaseButton
          shape={'shape-1'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <BaseButton
          shape={'shape-2'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <BaseButton
          shape={'shape-3'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <BaseButton
          shape={'shape-4'}
          name="Button"
          fontSize={'large'}
          fontWeight={'bold'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <BaseButton
          shape={'shape-5'}
          name="Button"
          fontSize={'large'}
          fontWeight={'bold'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <BaseButton
          shape={'shape-6'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
      </section>
      <section className={cn('element-container')}>
        <BaseButton
          disabled
          shape={'shape-1'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <BaseButton
          disabled
          shape={'shape-2'}
          name="Button"
          fontSize={'medium'}
          fontWeight={'regular'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <BaseButton
          disabled
          shape={'shape-3'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <BaseButton
          disabled
          shape={'shape-4'}
          name="Button"
          fontSize={'large'}
          fontWeight={'bold'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <BaseButton
          disabled
          shape={'shape-5'}
          name="Button"
          fontSize={'large'}
          fontWeight={'bold'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
        <BaseButton
          disabled
          shape={'shape-6'}
          name="Button"
          fontSize={'small'}
          fontWeight={'light'}
          onClick={() => console.log('Button Clicked')}
          classNames={['button-gray']}
        />
      </section>
    </div>
  );
};

export default TestClientPage;
