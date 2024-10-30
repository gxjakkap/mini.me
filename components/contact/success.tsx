import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Dispatch, SetStateAction } from "react"

type SetFormStatus = Dispatch<SetStateAction<"success" | "failed" | "pending" | "loading" | "captcha">>

export const ContactSuccessModal = ({setFormStatus}: {setFormStatus: SetFormStatus}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg bg-[#f2f2f2df]">
                <div className="relative z-10 flex h-full flex-col p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <button
                            onClick={() => setFormStatus("pending")}
                            className="text-[#e0e0e0]"
                            aria-label="Close modal"
                        >
                            <XMarkIcon className="w-6" />
                        </button>
                    </div>
                    <div className="flex flex-col grow">
                        <CheckCircleIcon className="w-12 mx-auto" />
                        <h2 className="text-xl text-center">Success!</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}