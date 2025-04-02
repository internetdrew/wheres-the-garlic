'use client';

import { useState } from 'react';
import PageHeader from './PageHeader';
import ItemList from './ItemList';

const HouseholdContent = ({ householdId }: { householdId: string }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <PageHeader householdId={householdId} onSearch={setSearchQuery} />
      <ItemList householdId={householdId} searchQuery={searchQuery} />
    </>
  );
};

export default HouseholdContent;
