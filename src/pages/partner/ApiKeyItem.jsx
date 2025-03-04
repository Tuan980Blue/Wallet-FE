import React, {useState} from 'react';
import {FaCheck, FaRegEye, FaRegEyeSlash} from 'react-icons/fa';
import {Button, CopyButton} from '@mantine/core';
import {FaRegCopy} from 'react-icons/fa6';

const ApiKeyItem = ({apiKey}) => {
  const [isShow, setIsShow] = useState(false);

  return (
      <div className={'w-full'}>
        <div className={'flex justify-between items-center gap-3 overflow-hidden'}>
          <p className={'text-ellipsis whitespace-nowrap overflow-hidden max-w-96'}>{isShow
                                                                                     ? apiKey.id
                                                                                     : apiKey.id.toString().replaceAll(
                  /./g, '●')}</p>
          <div className={'flex gap-3'}>
            <div onClick={() => {
              setIsShow(!isShow);
            }}>
              {isShow ? (<FaRegEyeSlash/>) : (<FaRegEye/>)}
            </div>
            <CopyButton value={apiKey.id}>
              {({copied, copy}) => (
                  <div onClick={copy}>
                    {!copied ? (<FaRegCopy/>) : <FaCheck />}
                  </div>
              )}
            </CopyButton>
          </div>
        </div>
      </div>
  );
};

export default ApiKeyItem;