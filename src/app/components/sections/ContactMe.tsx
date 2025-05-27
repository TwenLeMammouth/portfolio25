
"use client"

import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'; 
import { PageInfo } from '@/app/types/typings';

import DotGridBackground from '../background/DotGridBackground';
import { useInView } from 'react-intersection-observer';
import DownloadCVButtons from '../DownloadCVButtons';
import MagicButton from '../MagicButton';

type Inputs = {
    name: string,
    email: string,
    subject: string,
    message: string,
};

type Props = {
    pageInfo: PageInfo;
}

export default function ContactMe({ pageInfo }: Props) {
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
    const [hasBeenInView, setHasBeenInView] = React.useState(false)

    useEffect(() => {
        if (inView && !hasBeenInView) {
            setHasBeenInView(true)
        }
    }, [inView, hasBeenInView])

    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = formData => {
        window.location.href = `mailto:vgroslier@gmail.com?subject=${formData.subject}&body= Hi, my name is ${formData.name}. ${formData.message} (${formData.email})`
    };

    if (!pageInfo) return null

    return (
        <div
            ref={ref}
            className="relative w-full min-h-[100dvh] px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center gap-10 sm:gap-12 overflow-hidden"
            >
            {hasBeenInView && <DotGridBackground paused={!inView} />}

            {/* Titre */}
            <h4 className="text-xl sm:text-4xl font-semibold text-center text-white z-20 leading-snug sm:leading-tight ">
                Let's get in touch and make something{" "}
                <span className="underline decoration-[#12DD88]/60">amazing</span>.
            </h4>

            {/* Contenu */}
            <div className="flex flex-col gap-4 sm:gap-12 w-full max-w-3xl z-20">
                
                {/* Contact Infos */}
                <div className="space-y-3 sm:space-y-6 text-white text-sm sm:text-base">
                    <div className="flex gap-4 items-center">
                        <FaPhoneAlt className="contactIcon" aria-label="Phone icon"/>
                        <span>{pageInfo.phoneNumber}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <FaEnvelope className="contactIcon" aria-label="Envelope icon"/>
                        <span>{pageInfo.email}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <FaMapMarkerAlt className="contactIcon" aria-label="MapMarker icon"/>
                        <span>{pageInfo.address}</span>
                    </div>

                    <DownloadCVButtons
                        cvfrUrl={pageInfo.cvfrUrl}
                        cvenUrl={pageInfo.cvenUrl}
                    />
                </div>

                {/* Formulaire */}
                <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-2 sm:space-y-4 w-full"
                >
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <input
                    className="contactInput flex-1"
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Name"
                    />
                    <input
                    className="contactInput flex-1"
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    />
                </div>
                <input
                    className="contactInput"
                    type="text"
                    {...register("subject", { required: true })}
                    placeholder="Subject"
                />
                <textarea
                    className="contactInput min-h-[80px] md:min-h-[120px]"
                    {...register("message", { required: true })}
                    placeholder="Message"
                    aria-multiline="true"
                />
                <MagicButton text="Send Message" type="submit" />
                </form>
            </div>
            </div>

    )
}
