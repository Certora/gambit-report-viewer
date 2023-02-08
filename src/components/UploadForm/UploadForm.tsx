import { FC, useState } from 'react';

import { FileUploaderDropContainer } from 'carbon-components-react';

import { useMutationReportStores } from '@state/context';
import { mutantResultsScheme } from '@state/transformReport';

import { _par, _root } from './UploadForm.css';

type Props = unknown;

export const UploadForm: FC<Props> = () => {
  const { reportStore } = useMutationReportStores();

  const [error, setError] = useState<void | string>();

  const onChange = (_: any, { addedFiles }: { addedFiles: File[] }) => {
    setError();
    const file = addedFiles?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      if (!event.target) return setError('Unknown error');

      try {
        reportStore.set(
          mutantResultsScheme.parse(
            JSON.parse(event.target.result as unknown as string),
          ),
        );
      } catch (error) {
        setError('Report is in an incorrect format.');
      }
    });
    reader.addEventListener('error', () => setError('Unknown error'));
    reader.readAsText(file);
  };

  return (
    <div className={_root}>
      <p className={_par.bold}>Choose Gambit report</p>
      <p className={_par.usual}>Supported file type is .json.</p>
      <FileUploaderDropContainer
        labelText="Drag and drop gambit report here or click to choose file"
        accept={['application/json']}
        onAddFiles={onChange}
      />
      <p className={_par[error ? 'err' : 'errHidden']}>{error ?? 'hidden'}</p>
    </div>
  );
};
