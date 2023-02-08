import { FC } from 'react';

import { useStore } from '@nanostores/react';

import { MainHeader } from '@cmp/MainHeader';
import { MutationReportPage } from '@cmp/mutationReport/MutationReportPage';
import { UploadForm } from '@cmp/UploadForm';
import { useMutationReportStores } from '@state/context';

type Props = unknown;

export const App: FC<Props> = () => {
  const { reportStore } = useMutationReportStores();
  const report = useStore(reportStore);

  return (
    <>
      <MainHeader />
      {report ? <MutationReportPage /> : <UploadForm />}
    </>
  );
};
