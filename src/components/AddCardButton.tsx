import { Button } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa';

const AddCardButton = () => {
  return (
    <Button className="text-taskText" variant="light" startContent={<FaPlus />}>
      Add a card
    </Button>
  );
};

export default AddCardButton;
