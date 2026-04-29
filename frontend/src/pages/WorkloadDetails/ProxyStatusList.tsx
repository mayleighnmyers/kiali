import * as React from 'react';
import { isProxyStatusComponentSynced, isProxyStatusSynced, ProxyStatus } from '../../types/Health';
import { Stack, StackItem } from '@patternfly/react-core';
import { useKialiTheme } from 'utils/ThemeUtils';
import { Theme } from 'types/Common';

type Props = {
  status?: ProxyStatus;
};

export const ProxyStatusList: React.FC<Props> = (props: Props) => {
  const darkTheme = useKialiTheme() === Theme.DARK;

  const textColor = darkTheme ? '#151515' : '#ffffff';

  const statusList = (): React.ReactNode[] => {
    if (!props.status) {
      return [];
    }

    return [
      { c: 'CDS', s: props.status.CDS },
      { c: 'EDS', s: props.status.EDS },
      { c: 'LDS', s: props.status.LDS },
      { c: 'RDS', s: props.status.RDS }
    ].map((value: { c: string; s: string }, i: number) => {
      if (!isProxyStatusComponentSynced(value.s)) {
        const status = value.s ? value.s : '-';
        return (
          <StackItem key={`proxy-status-${i}`} style={{ fontSize: '70%', color: textColor }}>
            {`${value.c}: ${status}`}
          </StackItem>
        );
      } else {
        return null;
      }
    });
  };

  if (props.status && !isProxyStatusSynced(props.status)) {
    return (
      <Stack>
        <StackItem style={{ fontSize: '1.1rem', fontWeight: 'bold', color: textColor }}>Istio Proxy Status</StackItem>
        {statusList()}
      </Stack>
    );
  } else {
    return null;
  }
};
