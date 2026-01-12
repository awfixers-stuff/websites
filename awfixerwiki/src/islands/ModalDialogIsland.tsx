import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import {
  OverlayContainer,
  useModal,
  useOverlay,
  usePreventScroll,
} from "@react-aria/overlays";
import React, { PropsWithChildren, useRef } from "react";
import { VisuallyHidden } from "react-aria";

export interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalDialogIsland: React.FC<PropsWithChildren<Props>> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      isDismissable: true,
    },
    ref,
  );

  const { modalProps } = useModal({
    ...overlayProps,
  });

  usePreventScroll();

  return (
    <FocusScope containFocus restoreFocus autoFocus>
      <VisuallyHidden>
        <OverlayContainer>
          <div
            {...modalProps}
            ref={ref}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <span aria-hidden="true" className="h-6 w-6">×</span>
                </button>
              </div>
              <div className="p-4">{children}</div>
            </div>
          </div>
        </OverlayContainer>
      </div>
      </VisuallyHidden>
    </FocusScope>
  );
};

export default ModalDialogIsland;