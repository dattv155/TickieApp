import React, {RefObject} from 'react';
import type {NavigationContainerRef} from '@react-navigation/native';

export const navigationContainerRef: RefObject<NavigationContainerRef> = React.createRef<NavigationContainerRef>();
