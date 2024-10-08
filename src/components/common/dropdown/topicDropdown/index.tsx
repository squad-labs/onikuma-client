import React, { useRef, useState } from 'react';
import styles from '@/components/common/dropdown/topicDropdown/TopicDropdown.module.scss';
import classNames from 'classnames/bind';
import BaseText from '@/widgets/text/baseText';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/QUERY_KEY';
import { getTopicList } from '@/shared/api/Topics';
import { TopicListItem } from '@/shared/types/data/topic';
import useOnClickOutside from '@/shared/hooks/useOnClick';
import { useRouter } from 'next/navigation';
import { getStaticSrc } from '@/shared/utils/etc';
import Image from 'next/image';
import { ICON_SRC_PATH } from '@/shared/constants/PATH';

type Props = {
  value: {
    id: string;
    name: string;
  };
};

const cn = classNames.bind(styles);

const TopicDropdown = ({ value }: Props) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: [QUERY_KEY, value.id],
    queryFn: () => getTopicList(),
  });

  useOnClickOutside({
    ref: dropdownRef,
    handler: () => setOpen(false),
    mouseEvent: 'click',
  });

  const handleOnClick = (topicId: string) => {
    router.push(`/d/${topicId}`);
  };

  return (
    <div className={cn('dropdown-container')}>
      <button
        ref={dropdownRef}
        className={cn('dropdown-header')}
        onClick={() => setOpen(!open)}
      >
        <BaseText
          text={value.name}
          size={'medium'}
          weight={'regular'}
          color={'LIGHT'}
          classNames={['text-start']}
        />
        <Image
          src={getStaticSrc('icon', ICON_SRC_PATH.SRC.ARROW_DOWN)}
          alt="dropdown"
          width={24}
          height={24}
          priority
          quality={100}
          className={cn('icon')}
        />
      </button>
      {open && (
        <div className={cn('dropdown-list')}>
          {data?.map((item: TopicListItem) => {
            return (
              <button
                key={item._id}
                className={cn('list-item', {
                  able: item._id === value.id,
                  disable: item._id !== value.id,
                })}
                onClick={() => handleOnClick(item._id)}
              >
                <span className={cn('item-text')}>{item.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopicDropdown;
