import { Tooltip } from '@nextui-org/react';

interface CustomTooltipProps {
  content: string;
  placement: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}

const CustomTooltip = ({
  content,
  placement,
  children,
}: CustomTooltipProps) => {
  return (
    <Tooltip
      content={content}
      size="sm"
      radius="sm"
      placement={placement}
      className="bg-tooltip"
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
