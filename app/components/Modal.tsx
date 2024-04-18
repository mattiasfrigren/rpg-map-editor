import { Transition, Dialog } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
type Props = {
  show: boolean;
  title: string;
  badge: string;
  onClose: (value: boolean) => void;
  description?: string;
  validationLink?: string;
};

//TODO REWRITE TO USE WITH TILE!!
export function Modal({
  show,
  title,
  badge,
  onClose,
  description,
  validationLink,
}: Props) {
  const [animations, setAnimations] = useState<Array<JSX.Element>>([]);
  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        const key = Date.now().toString();
        setAnimations((prev) => [...prev, SkillAnimation(key)]);
        setTimeout(() => {
          document.getElementById(key)?.remove();
        }, 5000);
      }, 1000);
      return () => clearInterval(interval);
    }
    return () => setAnimations([]);
  }, [show]);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-fieldItem-background px-6 pb-6 text-left align-middle shadow-xl transition-all"
                id="mainModal"
              >
                {animations}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-deep-purple pt-6 pb-5"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <div className="-animate-bounce-and-spin-y-8 text-center">
                    <img
                      className=" inline h-36"
                      src="https://images.credly.com/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png"
                      alt="Certificate Badge"
                    />
                  </div>
                  <p className="text-sm text-deep-purple text-left">
                    {description}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => onClose(false)}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function SkillAnimation(key: string) {
  return (
    <StarIcon
      key={key}
      id={key}
      className={`skill w-8 h-8`}
      style={{ left: Math.floor(Math.random() * 424) + "px" }}
    />
  );
}
