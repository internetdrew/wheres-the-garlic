'use client';

import { useRef, useState } from 'react';
import { addItem } from '@/app/actions/items';
import { useHousehold } from '@/app/hooks/useHousehold';
import DuplicateItemDialog from './DuplicateItemDialog';
import { Household } from '@/utils/supabase/queries';
import NewItemForm from './NewItemForm';

type Item = Household['items'][number];

interface ItemFormDialogProps {
  householdId: string;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}

const ItemFormDialog = ({ householdId, dialogRef }: ItemFormDialogProps) => {
  const { mutateHousehold } = useHousehold(householdId);
  const duplicateDialogRef = useRef<HTMLDialogElement>(null);
  const [duplicateItem, setDuplicateItem] = useState<Item | null>(null);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);

  const handleClose = () => {
    dialogRef.current?.close();
    setDuplicateItem(null);
    setPendingFormData(null);
  };

  const handleDuplicateFound = (formData: FormData, item: Item) => {
    setPendingFormData(formData);
    setDuplicateItem(item);
    duplicateDialogRef.current?.showModal();
  };

  const handleDuplicateConfirm = async () => {
    if (pendingFormData) {
      const result = await addItem(householdId, pendingFormData);
      if (result?.success) {
        dialogRef.current?.close();
        mutateHousehold();
      }
    }
    duplicateDialogRef.current?.close();
    setPendingFormData(null);
    setDuplicateItem(null);
  };

  const handleDuplicateCancel = () => {
    duplicateDialogRef.current?.close();
    setPendingFormData(null);
    setDuplicateItem(null);
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className='mx-auto my-auto max-w-sm rounded-xl backdrop:bg-black/50 backdrop:opacity-50'
      >
        <NewItemForm
          householdId={householdId}
          onClose={handleClose}
          onDuplicateFound={handleDuplicateFound}
        />
        <DuplicateItemDialog
          dialogRef={duplicateDialogRef}
          duplicateItem={duplicateItem}
          onConfirm={handleDuplicateConfirm}
          onCancel={handleDuplicateCancel}
        />
      </dialog>
    </>
  );
};

export default ItemFormDialog;
