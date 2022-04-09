import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface GlobalPortalProps {
  children: ReactNode;
}

function GlobalPortal({ children }: GlobalPortalProps) {
  const element = typeof window !== 'undefined' && document.querySelector('#global-portal');
  return element && children ? createPortal(children, element) : null;
}

export default GlobalPortal;
