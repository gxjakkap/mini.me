import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Dispatch, SetStateAction } from "react"

type SetFormStatus = Dispatch<SetStateAction<"success" | "failed" | "pending" | "loading" | "captcha">>

export const ContactErrorModal = ({setFormStatus, type}: {setFormStatus: SetFormStatus, type: "failed" | "captcha"}) => {
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
                        <ExclamationCircleIcon className="w-12 mx-auto" />
                        <h2 className="text-xl text-center">Error!</h2>
                        <p className="text-center">
                            {(type === "failed") ? "Request failed! Please try again." : "User failed a captcha test! Please try again."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}