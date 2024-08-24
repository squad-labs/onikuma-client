import React from 'react';
import styles from '@/widgets/bedge/baseBedge/BaseBedge.module.scss';
import classNames from 'classnames/bind';
import { BaseTagProps } from '@/shared/types/ui/Tag';

const cn = classNames.bind(styles);

const BaseBedge = ({
  title = '',
  padding,
  size,
  weight,
  color,
  role = 'tag',
  label = 'tag',
  classNames = [],
  children = undefined,
}: BaseTagProps) => {
  return (
    <div
      aria-label={label}
      role={role}
      className={cn(
        'tag-container',
        `tag-primary-${color.primary}`,
        `tag-secondary-${color.secondary}`,
        `tag-padding-${padding}`,
        ...classNames,
      )}
    >
      {children ? (
        children
      ) : (
        <span
          className={cn(
            'text',
            size && `text-${size}`,
            weight && `text-${weight}`,
          )}
        >
          {title}
        </span>
      )}
    </div>
  );
};

export default BaseBedge;
