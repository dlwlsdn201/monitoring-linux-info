import React, { ReactNode } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { MdOutlineUpdate } from 'react-icons/md';

interface Props {
  title: string;
  subTitle?: string;
  status?: {
    value: string | ReactNode;
    unit?: string;
  };
  timestamp?: string;
  bodyContent?: ReactNode | undefined;
}

const MODULE_CardUI = ({ title, status, timestamp, bodyContent }: Props) => {
  return (
    <Card className="col-span-4 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <div className="flex flex-col">
          <span className="text-lg mb-1">{title}</span>
          <span className="text-3xl font-bold">
            {status?.value} {status?.unit ?? ''}
          </span>
          <div className="flex flex-row flex-nowrap items-center gap-1 text-gray-500 text-sm">
            <span>
              <MdOutlineUpdate />
            </span>
            <span>{timestamp}</span>
          </div>
        </div>
      </CardHeader>
      <CardBody>{bodyContent}</CardBody>
    </Card>
  );
};

export default MODULE_CardUI;
