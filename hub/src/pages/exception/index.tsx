import React from 'react';
import { useIntl, Link, useParams } from 'umi';
import Exception from './Exception';

export default props => {
  const { formatMessage } = useIntl();
  const { code } = useParams() as { code?: number };
  return (
    <Exception
      type={code ?? 404}
      desc={formatMessage({ id: 'exception-403.description.403' })}
      linkElement={Link}
      backText={formatMessage({ id: 'exception-403.exception.back' })}
      {...props}
    />
  );
};
