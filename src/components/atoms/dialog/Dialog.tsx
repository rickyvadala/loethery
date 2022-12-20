import React, { Fragment } from 'react'
import { Dialog as HeadlessUIDialog, Transition } from '@headlessui/react'

export type DialogType = {
    isOpen: boolean,
    setIsOpen: Function,
    timeout?: number
    title?: string,
    message?: Array<any>,
    closeOnBlur?: boolean
}

export const Dialog: React.FC<DialogType>  = ({ isOpen, setIsOpen, timeout, title = 'Please', message, closeOnBlur }) => {
    timeout && setTimeout(() => setIsOpen(false), timeout)
    const onClose = () => closeOnBlur && setIsOpen(false)

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <HeadlessUIDialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                            <HeadlessUIDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <HeadlessUIDialog.Title
                                    as="h3"
                                    className="text-xl font-medium leading-6 text-gray-900"
                                >
                                    {title}
                                </HeadlessUIDialog.Title>
                                <div className="mt-2">
                                    <p className="text-md text-gray-500">
                                        {message}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-md font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </HeadlessUIDialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </HeadlessUIDialog>
        </Transition>
    )
}

