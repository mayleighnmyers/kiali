import * as React from 'react';
import { ObjectCheck, ValidationTypes } from '../../types/IstioObjects';
import { Validation } from './Validation';
import { highestSeverity } from '../../types/ServiceInfo';
import { Stack, StackItem } from '@patternfly/react-core';
import { useKialiTheme } from 'utils/ThemeUtils';
import { Theme } from 'types/Common';

type ValidationStackProps = {
  checks?: ObjectCheck[];
};

export const ValidationStack: React.FC<ValidationStackProps> = (props: ValidationStackProps) => {
  const darkTheme = useKialiTheme() === Theme.DARK;

  const textColor = darkTheme ? '#151515' : '#ffffff';

  const validationList = (): React.ReactNode[] => {
    return (props.checks ?? []).map((check, index) => {
      return (
        <StackItem key={`validation-check-item-${index}`} style={{ color: textColor }}>
          <Validation
            key={`validation-check-${index}`}
            severity={check.severity}
            message={`${check.code ? `${check.code} ` : ''}${check.message}`}
            textColor={textColor}
          />
        </StackItem>
      );
    });
  };

  const severity = highestSeverity(props.checks ?? []);
  const isValid = severity === ValidationTypes.Correct;

  if (!isValid) {
    return (
      <Stack>
        <StackItem style={{ fontWeight: 'bold', color: textColor }}>Istio validations</StackItem>
        {validationList()}
      </Stack>
    );
  } else {
    return null;
  }
};
